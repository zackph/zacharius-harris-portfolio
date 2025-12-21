export function loadTheme(body, button) {
  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved, body, button);
}

export function toggleTheme(body, button) {
  const next = body.classList.contains("dark") ? "light" : "dark";
  applyTheme(next, body, button);
  localStorage.setItem("theme", next);
}

function applyTheme(theme, body, button) {
  body.classList.toggle("dark", theme === "dark");
  button.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
}
