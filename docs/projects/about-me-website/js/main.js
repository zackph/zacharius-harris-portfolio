import { loadTheme, toggleTheme } from "./theme.js";
import { setupQuotes } from "./quotes.js";
import { setupMessages } from "./messages.js";

const body = document.body;
const themeBtn = document.getElementById("themeToggleBtn");

// THEME
loadTheme(body, themeBtn);
themeBtn.addEventListener("click", () => {
  toggleTheme(body, themeBtn);
});

// QUOTES
setupQuotes();

// MESSAGES (THIS WAS THE MISSING / BROKEN PART)
setupMessages();
