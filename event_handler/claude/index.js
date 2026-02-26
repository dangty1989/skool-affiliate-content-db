const path = require('path');
const { render_md } = require('../utils/render-md');

const DEFAULT_MODEL = 'claude-sonnet-4-20250514';

// Web search tool definition (Anthropic built-in)
const WEB_SEARCH_TOOL = {
  type: 'web_search_20250305',
  name: 'web_search',
  max_uses: 5,
};

/**
 * Get Anthropic API key from environment
 * @returns {string} API key
 */
function getApiKey() {
  if (process.env.ANTHROPIC_API_KEY) {
    return process.env.ANTHROPIC_API_KEY;
  }
  throw new Error('ANTHROPIC_API_KEY environment variable is required');
}

/**
 * Call Claude API
 * @param {Array} messages - Conversation messages
 * @param {Array} tools - Tool definitions
 * @returns {Promise<Object>} API response
 */
async function callClaude(messages, tools) {
  const apiKey = getApiKey();
  const model = process.env.EVENT_HANDLER_MODEL || DEFAULT_MODEL;
  const systemPrompt = render_md(path.join(__dirname, '..', '..', 'operating_system', 'CHATBOT.md'));

  // Combine user tools with web search
  const allTools = [WEB_SEARCH_TOOL, ...tools];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'web-search-2025-03-05',
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system: systemPrompt,
      messages,
      tools: allTools,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} ${error}`);
  }

  return response.json();
}

/**
 * Process a conversation turn with Claude, handling tool calls
 * @param {string} userMessage - User's message
 * @param {Array} history - Conversation history
 * @param {Array} toolDefinitions - Available tools
 * @param {Object} toolExecutors - Tool executor functions
 * @returns {Promise<{response: string, history: Array}>}
 */
async function chat(userMessage, history, toolDefinitions, toolExecutors) {
  // Add user message to history
  const messages = [...history, { role: 'user', content: userMessage }];

  let response = await callClaude(messages, toolDefinitions);
  let assistantContent = response.content;

  // Add assistant response to history
  messages.push({ role: 'assistant', content: assistantContent });

  // Handle tool use loop
  while (response.stop_reason === 'tool_use') {
    const toolResults = [];

    for (const block of assistantContent) {
      if (block.type === 'tool_use') {
        // Skip web_search - it's a server-side tool executed by Anthropic
        if (block.name === 'web_search') {
          continue;
        }

        const executor = toolExecutors[block.name];
        let result;

        if (executor) {
          try {
            result = await executor(block.input);
          } catch (err) {
            result = { error: err.message };
          }
        } else {
          result = { error: `Unknown tool: ${block.name}` };
        }

        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }
    }

    // If no client-side tools to execute, we're done
    if (toolResults.length === 0) {
      break;
    }

    // Add tool results to messages
    messages.push({ role: 'user', content: toolResults });

    // Get next response from Claude
    response = await callClaude(messages, toolDefinitions);
    assistantContent = response.content;

    // Add new assistant response to history
    messages.push({ role: 'assistant', content: assistantContent });
  }

  // Extract text response
  const textBlocks = assistantContent.filter((block) => block.type === 'text');
  const responseText = textBlocks.map((block) => block.text).join('\n');

  return {
    response: responseText,
    history: messages,
  };
}

module.exports = {
  chat,
  getApiKey,
};
