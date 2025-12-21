// js/theme.js
// =====================================================
// THEME MODULE
// - Handles dark/light mode
// - Saves theme choice to localStorage
// =====================================================

/**
 * Loads the saved theme (or defaults to light)
 * and applies it to the page.
 */
export function loadTheme(body, button) {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme, body, button);
}

/**
 * Toggles between light and dark themes,
 * applies the change, and saves it.
 */
export function toggleTheme(body, button) {
  const currentlyDark = body.classList.contains("dark");
  const nextTheme = currentlyDark ? "light" : "dark";

  applyTheme(nextTheme, body, button);
  localStorage.setItem("theme", nextTheme);
}

/**
 * Applies the theme by toggling a CSS class.
 * NOTE: This function is NOT exported (internal use only).
 */
function applyTheme(theme, body, button) {
  const isDark = theme === "dark";

  // Add/remove the dark class on the body
  body.classList.toggle("dark", isDark);

  // Update button text to show the next action
  button.textContent = isDark ? "Light Mode" : "Dark Mode";
}
