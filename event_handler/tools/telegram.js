const { Bot } = require('grammy');
const { hydrateReply } = require('@grammyjs/parse-mode');

const MAX_LENGTH = 4096;

let bot = null;
let currentToken = null;

/**
 * Get or create bot instance
 * @param {string} token - Bot token from @BotFather
 * @returns {Bot} grammY Bot instance
 */
function getBot(token) {
  if (!bot || currentToken !== token) {
    bot = new Bot(token);
    bot.use(hydrateReply);
    currentToken = token;
  }
  return bot;
}

/**
 * Set webhook for a Telegram bot
 * @param {string} botToken - Bot token from @BotFather
 * @param {string} webhookUrl - HTTPS URL to receive updates
 * @param {string} [secretToken] - Optional secret token for verification
 * @returns {Promise<boolean>} - Success status
 */
async function setWebhook(botToken, webhookUrl, secretToken) {
  const b = getBot(botToken);
  const options = {};
  if (secretToken) {
    options.secret_token = secretToken;
  }
  return b.api.setWebhook(webhookUrl, options);
}

/**
 * Smart split text into chunks that fit Telegram's limit
 * Prefers splitting at paragraph > newline > sentence > space
 * @param {string} text - Text to split
 * @param {number} maxLength - Maximum chunk length
 * @returns {string[]} Array of chunks
 */
function smartSplit(text, maxLength = MAX_LENGTH) {
  if (text.length <= maxLength) return [text];

  const chunks = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining);
      break;
    }

    const chunk = remaining.slice(0, maxLength);
    let splitAt = -1;

    // Try to split at natural boundaries (prefer earlier ones)
    for (const delim of ['\n\n', '\n', '. ', ' ']) {
      const idx = chunk.lastIndexOf(delim);
      if (idx > maxLength * 0.3) {
        splitAt = idx + delim.length;
        break;
      }
    }

    if (splitAt === -1) splitAt = maxLength;

    chunks.push(remaining.slice(0, splitAt).trimEnd());
    remaining = remaining.slice(splitAt).trimStart();
  }

  return chunks;
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Send a message to a Telegram chat with HTML formatting
 * Automatically splits long messages
 * @param {string} botToken - Bot token from @BotFather
 * @param {number|string} chatId - Chat ID to send message to
 * @param {string} text - Message text (HTML formatted)
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.disablePreview] - Disable link previews
 * @returns {Promise<Object>} - Last message sent
 */
async function sendMessage(botToken, chatId, text, options = {}) {
  const b = getBot(botToken);
  // Strip HTML comments — Telegram's HTML parser doesn't support them
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  const chunks = smartSplit(text, MAX_LENGTH);

  let lastMessage;
  for (const chunk of chunks) {
    lastMessage = await b.api.sendMessage(chatId, chunk, {
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: options.disablePreview ?? false },
    });
  }

  return lastMessage;
}

/**
 * Format a job notification message
 * @param {Object} params - Notification parameters
 * @param {string} params.jobId - Full job ID
 * @param {boolean} params.success - Whether job succeeded
 * @param {string} params.summary - Job summary text
 * @param {string} params.prUrl - PR URL
 * @returns {string} Formatted HTML message
 */
function formatJobNotification({ jobId, success, summary, prUrl }) {
  const emoji = success ? '✅' : '⚠️';
  const status = success ? 'complete' : 'had issues';
  const shortId = jobId.slice(0, 8);

  return `${emoji} <b>Job ${shortId}</b> ${status}

${escapeHtml(summary)}

<a href="${prUrl}">View PR</a>`;
}

/**
 * Download a file from Telegram servers
 * @param {string} botToken - Bot token from @BotFather
 * @param {string} fileId - Telegram file_id
 * @returns {Promise<{buffer: Buffer, filename: string}>}
 */
async function downloadFile(botToken, fileId) {
  // Get file path from Telegram
  const fileInfoRes = await fetch(
    `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
  );
  const fileInfo = await fileInfoRes.json();
  if (!fileInfo.ok) {
    throw new Error(`Telegram API error: ${fileInfo.description}`);
  }

  const filePath = fileInfo.result.file_path;

  // Download file
  const fileRes = await fetch(
    `https://api.telegram.org/file/bot${botToken}/${filePath}`
  );
  const buffer = Buffer.from(await fileRes.arrayBuffer());
  const filename = filePath.split('/').pop();

  return { buffer, filename };
}

/**
 * React to a message with an emoji
 * @param {string} botToken - Bot token from @BotFather
 * @param {number|string} chatId - Chat ID
 * @param {number} messageId - Message ID to react to
 * @param {string} [emoji='👍'] - Emoji to react with
 */
async function reactToMessage(botToken, chatId, messageId, emoji = '👍') {
  const b = getBot(botToken);
  await b.api.setMessageReaction(chatId, messageId, [{ type: 'emoji', emoji }]);
}

/**
 * Start a repeating typing indicator for a chat.
 * Returns a stop function. The indicator naturally expires after 5s,
 * so we re-send with random gaps (5.5–8s) to look human.
 * @param {string} botToken - Bot token from @BotFather
 * @param {number|string} chatId - Chat ID
 * @returns {Function} Call to stop the typing indicator
 */
function startTypingIndicator(botToken, chatId) {
  const b = getBot(botToken);
  let timeout;
  let stopped = false;

  function scheduleNext() {
    if (stopped) return;
    const delay = 5500 + Math.random() * 2500;
    timeout = setTimeout(() => {
      if (stopped) return;
      b.api.sendChatAction(chatId, 'typing').catch(() => {});
      scheduleNext();
    }, delay);
  }

  b.api.sendChatAction(chatId, 'typing').catch(() => {});
  scheduleNext();

  return () => {
    stopped = true;
    clearTimeout(timeout);
  };
}

module.exports = {
  getBot,
  setWebhook,
  sendMessage,
  smartSplit,
  escapeHtml,
  formatJobNotification,
  downloadFile,
  reactToMessage,
  startTypingIndicator,
};
