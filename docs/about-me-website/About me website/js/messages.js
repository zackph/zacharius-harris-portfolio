// js/messages.js
// =====================================================
// MESSAGES MODULE
// - Character counter
// - Save/load name
// - Save/load message history (localStorage)
// =====================================================

const MAX_CHARS = 50;
const SAVED_NAME_KEY = "savedName";
const MESSAGE_HISTORY_KEY = "messageHistory";

export function loadSavedName(userNameInput) {
  const saved = localStorage.getItem(SAVED_NAME_KEY);
  if (saved) userNameInput.value = saved;
}

export function updateCharUI(userMessageInput, charCountEl, charWarningEl) {
  const used = userMessageInput.value.length;
  const remaining = MAX_CHARS - used;

  charCountEl.textContent = `${remaining} characters remaining`;

  if (remaining < 0) {
    charWarningEl.textContent = `Too long! Remove ${Math.abs(remaining)} character(s).`;
  } else {
    charWarningEl.textContent = "";
  }
}

export function loadMessageHistory(messageListEl) {
  const stored = localStorage.getItem(MESSAGE_HISTORY_KEY);
  if (!stored) return;

  const messages = JSON.parse(stored);

  messages.forEach((msg) => {
    addMessageToList(messageListEl, msg.name, msg.text);
  });
}

export function handleMessageSubmit(e, els) {
  e.preventDefault();

  const {
    userNameInput,
    userMessageInput,
    messageListEl,
    charWarningEl,
    charCountEl
  } = els;

  const name = userNameInput.value.trim();
  const text = userMessageInput.value.trim();

  if (!name || !text) return;

  if (text.length > MAX_CHARS) {
    charWarningEl.textContent = "Message is too long to submit.";
    return;
  }

  localStorage.setItem(SAVED_NAME_KEY, name);

  const stored = localStorage.getItem(MESSAGE_HISTORY_KEY);
  const messages = stored ? JSON.parse(stored) : [];

  messages.push({ name, text });
  localStorage.setItem(MESSAGE_HISTORY_KEY, JSON.stringify(messages));

  addMessageToList(messageListEl, name, text);

  userMessageInput.value = "";
  updateCharUI(userMessageInput, charCountEl, charWarningEl);
}

export function clearMessageHistory(messageListEl) {
  localStorage.removeItem(MESSAGE_HISTORY_KEY);
  messageListEl.innerHTML = "";
}

function addMessageToList(messageListEl, name, text) {
  const li = document.createElement("li");
  li.textContent = `${name}: ${text}`;
  messageListEl.appendChild(li);
  li.classList.add("new-message");
}
