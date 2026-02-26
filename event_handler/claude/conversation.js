/**
 * In-memory conversation history management per Telegram chat.
 * - Keyed by chat_id
 * - 30-minute TTL per conversation
 * - Max 20 messages per conversation
 */

const MAX_MESSAGES = 20;
const TTL_MS = 30 * 60 * 1000; // 30 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// Map<chatId, { messages: Array, lastAccess: number }>
const conversations = new Map();

/**
 * Get conversation history for a chat
 * @param {string} chatId - Telegram chat ID
 * @returns {Array} - Message history array
 */
function getHistory(chatId) {
  const entry = conversations.get(chatId);
  if (!entry) return [];

  // Check if expired
  if (Date.now() - entry.lastAccess > TTL_MS) {
    conversations.delete(chatId);
    return [];
  }

  entry.lastAccess = Date.now();
  return entry.messages;
}

/**
 * Update conversation history for a chat
 * @param {string} chatId - Telegram chat ID
 * @param {Array} messages - New message history
 */
function updateHistory(chatId, messages) {
  // Trim to max messages (keep most recent)
  const trimmed = messages.slice(-MAX_MESSAGES);

  conversations.set(chatId, {
    messages: trimmed,
    lastAccess: Date.now(),
  });
}

/**
 * Clear conversation history for a chat
 * @param {string} chatId - Telegram chat ID
 */
function clearHistory(chatId) {
  conversations.delete(chatId);
}

/**
 * Clean up expired conversations
 */
function cleanupExpired() {
  const now = Date.now();
  for (const [chatId, entry] of conversations) {
    if (now - entry.lastAccess > TTL_MS) {
      conversations.delete(chatId);
    }
  }
}

// Start cleanup interval
setInterval(cleanupExpired, CLEANUP_INTERVAL_MS);

module.exports = {
  getHistory,
  updateHistory,
  clearHistory,
};
