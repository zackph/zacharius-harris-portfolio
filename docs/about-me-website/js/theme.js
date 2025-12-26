// js/theme.js
// =====================================================
// THEME MODULE
// - Handles dark/light mode
// - Saves theme choice to localStorage
// =====================================================

export function loadTheme(body, button) {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme, body, button);
}

export function toggleTheme(body, button) {
  const currentlyDark = body.classList.contains("dark");
  const nextTheme = currentlyDark ? "light" : "dark";

  applyTheme(nextTheme, body, button);
  localStorage.setItem("theme", nextTheme);
}

function applyTheme(theme, body, button) {
  const isDark = theme === "dark";
  body.classList.toggle("dark", isDark);
  button.textContent = isDark ? "Light Mode" : "Dark Mode";
}
