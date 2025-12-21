// js/messages.js
// Handles:
// - Save name to localStorage
// - Save message history to localStorage
// - Character counter UI
// - Render message list on load

const NAME_KEY = "aboutme_saved_name";
const HISTORY_KEY = "aboutme_message_history";
const MAX_CHARS = 50;

/**
 * Safely read JSON from localStorage.
 */
function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed to parse localStorage key: ${key}`, err);
    return fallback;
  }
}

/**
 * Safely write JSON to localStorage.
 */
function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to write localStorage key: ${key}`, err);
  }
}

/**
 * Renders one <li> into the message list.
 */
function addMessageToList(messageListEl, name, text, timestamp) {
  const li = document.createElement("li");

  const time = new Date(timestamp).toLocaleString();
  li.textContent = `${name}: ${text} (${time})`;

  messageListEl.prepend(li); // newest on top
}

/**
 * Initializes the messages feature.
 */
export function setupMessages() {
  // Grab elements
  const form = document.getElementById("messageForm");
  const nameInput = document.getElementById("userName");
  const messageInput = document.getElementById("userMessage");
  const messageList = document.getElementById("messageList");
  const charWarning = document.getElementById("charWarning");
  const charCount = document.getElementById("charCount");
  const clearBtn = document.getElementById("clearHistoryBtn");

  // If ANY are missing, stop and tell you in the console.
  const required = { form, nameInput, messageInput, messageList, charWarning, charCount, clearBtn };
  for (const [key, el] of Object.entries(required)) {
    if (!el) {
      console.error(`messages.js: Missing element with id for "${key}". Check index.html IDs.`);
      return;
    }
  }

  // Load saved name
  const savedName = localStorage.getItem(NAME_KEY);
  if (savedName) nameInput.value = savedName;

  // Load saved history + render it
  const history = readJson(HISTORY_KEY, []);
  history.forEach((msg) => {
    addMessageToList(messageList, msg.name, msg.text, msg.timestamp);
  });

  // Character counter UI
  function updateCharUI() {
    const remaining = MAX_CHARS - messageInput.value.length;
    charCount.textContent = `${remaining} characters remaining`;

    if (remaining < 0) {
      charWarning.textContent = "Message too long!";
    } else if (remaining <= 10) {
      charWarning.textContent = "Almost at the limit!";
    } else {
      charWarning.textContent = "";
    }
  }

  messageInput.addEventListener("input", updateCharUI);
  updateCharUI();

  // Save name while you type (so it always persists)
  nameInput.addEventListener("input", () => {
    localStorage.setItem(NAME_KEY, nameInput.value.trim());
  });

  // Submit handler (THIS prevents refresh!)
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // critical

    const name = nameInput.value.trim() || "Anonymous";
    const text = messageInput.value.trim();

    // Basic validation
    if (!text) return;
    if (text.length > MAX_CHARS) return;

    // Build message object
    const newMsg = {
      name,
      text,
      timestamp: Date.now(),
    };

    // Save to localStorage
    const current = readJson(HISTORY_KEY, []);
    current.push(newMsg);
    writeJson(HISTORY_KEY, current);

    // Update UI
    addMessageToList(messageList, newMsg.name, newMsg.text, newMsg.timestamp);

    // Clear message box
    messageInput.value = "";
    updateCharUI();
  });

  // Clear history
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(HISTORY_KEY);
    messageList.innerHTML = "";
  });

  console.log("Messages module loaded ✅");
}
