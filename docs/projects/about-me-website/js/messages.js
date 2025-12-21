const MESSAGE_KEY = "messageHistory";
const NAME_KEY = "savedName";
const MAX_CHARS = 50;

function getMessages() {
  const stored = localStorage.getItem(MESSAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveMessages(messages) {
  localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages));
}

export function setupMessages() {
  const form = document.getElementById("messageForm");
  const nameInput = document.getElementById("userName");
  const messageInput = document.getElementById("userMessage");
  const list = document.getElementById("messageList");
  const clearBtn = document.getElementById("clearHistoryBtn");
  const charCount = document.getElementById("charCount");
  const charWarning = document.getElementById("charWarning");

  let messages = getMessages();

  // Load saved name
  const savedName = localStorage.getItem(NAME_KEY);
  if (savedName) nameInput.value = savedName;

  // Render messages
  function render() {
    list.innerHTML = "";
    messages.forEach(m => {
      const li = document.createElement("li");
      li.textContent = `${m.name}: ${m.text}`;
      list.appendChild(li);
    });
  }

  render();

  // Save name live
  nameInput.addEventListener("input", () => {
    localStorage.setItem(NAME_KEY, nameInput.value);
  });

  // Character counter
  messageInput.maxLength = MAX_CHARS;
  messageInput.addEventListener("input", () => {
    const remaining = MAX_CHARS - messageInput.value.length;
    charCount.textContent = `${remaining} characters remaining`;
    charWarning.textContent =
      remaining <= 0 ? "Character limit reached!" : "";
  });

  // Submit message (THIS IS THE KEY FIX)
  form.addEventListener("submit", e => {
    e.preventDefault(); // prevents page refresh

    const name = nameInput.value.trim();
    const text = messageInput.value.trim();
    if (!name || !text) return;

    messages.push({ name, text });
    saveMessages(messages);
    render();

    messageInput.value = "";
    charCount.textContent = `${MAX_CHARS} characters remaining`;
    charWarning.textContent = "";
  });

  // Clear history
  clearBtn.addEventListener("click", () => {
    messages = [];
    saveMessages(messages);
    render();
  });
}
