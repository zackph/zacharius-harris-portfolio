// js/messages.js
// =====================================================
// MESSAGES MODULE
// - Saves message history to localStorage
// - Loads history on page load
// - Saves the user's name
// - Character counter (50 max)
// =====================================================

const STORAGE_KEY_MESSAGES = "messageHistory";
const STORAGE_KEY_NAME = "savedName";
const MAX_CHARS = 50;

/**
 * Safely load message history from localStorage.
 * Returns an array like: [{ name: "...", text: "...", time: 123456789 }]
 */
function loadStoredMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Save messages array back to localStorage */
function saveStoredMessages(messages) {
  localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
}

/** Render message list to the page */
function renderMessages(listEl, messages) {
  listEl.innerHTML = "";

  messages.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = `${msg.name}: ${msg.text}`;
    listEl.appendChild(li);
  });
}

/** Update character counter UI */
function updateCharUI(messageInput, charCountEl, charWarningEl) {
  const remaining = MAX_CHARS - messageInput.value.length;
  charCountEl.textContent = `${remaining} characters remaining`;

  // Show warning only when 0 or less remaining
  charWarningEl.textContent = remaining <= 0 ? "Character limit reached!" : "";
}

/**
 * Public: sets up the whole Messages feature
 * Make sure your HTML IDs match the ones below.
 */
export function setupMessages() {
  // --- REQUIRED ELEMENTS (IDs MUST MATCH index.html) ---
  const form = document.getElementById("messageForm");
  const nameInput = document.getElementById("userName");
  const messageInput = document.getElementById("userMessage");
  const listEl = document.getElementById("messageList");
  const clearBtn = document.getElementById("clearHistoryBtn");
  const charCountEl = document.getElementById("charCount");
  const charWarningEl = document.getElementById("charWarning");

  // If any are missing, stop cleanly (prevents crashes)
  if (
    !form ||
    !nameInput ||
    !messageInput ||
    !listEl ||
    !clearBtn ||
    !charCountEl ||
    !charWarningEl
  ) {
    console.warn("Messages module: missing one or more required HTML elements.");
    return;
  }

  // --- LOAD SAVED NAME ---
  const savedName = localStorage.getItem(STORAGE_KEY_NAME);
  if (savedName) nameInput.value = savedName;

  // Save name whenever user types
  nameInput.addEventListener("input", () => {
    localStorage.setItem(STORAGE_KEY_NAME, nameInput.value.trim());
  });

  // --- LOAD + RENDER MESSAGE HISTORY ---
  let messages = loadStoredMessages();
  renderMessages(listEl, messages);

  // --- CHARACTER COUNTER SETUP ---
  messageInput.maxLength = MAX_CHARS; // hard limit
  updateCharUI(messageInput, charCountEl, charWarningEl);

  messageInput.addEventListener("input", () => {
    updateCharUI(messageInput, charCountEl, charWarningEl);
  });

  // --- FORM SUBMIT (THIS IS THE BIG ONE) ---
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // ✅ prevents page refresh!

    const name = nameInput.value.trim();
    const text = messageInput.value.trim();

    if (!name || !text) return;

    // Add message to array
    messages.push({
      name,
      text,
      time: Date.now(),
    });

    // Save + re-render
    saveStoredMessages(messages);
    renderMessages(listEl, messages);

    // Clear message box (keep name)
    messageInput.value = "";
    updateCharUI(messageInput, charCountEl, charWarningEl);
  });

  // --- CLEAR HISTORY ---
  clearBtn.addEventListener("click", () => {
    messages = [];
    localStorage.removeItem(STORAGE_KEY_MESSAGES);
    renderMessages(listEl, messages);
  });
}
