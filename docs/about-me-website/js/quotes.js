// js/quotes.js
// =====================================================
// QUOTES MODULE
// - Always works using LOCAL_QUOTES
// - Tries online API first if not running file://
// - Falls back to local quotes if API fails
// =====================================================

const DEFAULT_QUOTE = {
  text: "Learning to code is learning to create.",
  author: "Zacharius"
};

const LOCAL_QUOTES = [
  DEFAULT_QUOTE,
  { text: "Code is not just syntax — it's thinking made visible.", author: "Anonymous" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Programs must be written for people to read.", author: "Harold Abelson" },
  { text: "Every great developer started exactly where you are.", author: "Unknown" }
];

export function resetQuote(textEl, authorEl, tipEl) {
  animateQuoteChange(textEl, authorEl, DEFAULT_QUOTE.text, DEFAULT_QUOTE.author);
  if (tipEl) tipEl.textContent = "";
}

export async function loadRandomQuote(textEl, authorEl, tipEl) {
  if (tipEl) tipEl.textContent = "";

  const isLocalFile = window.location.protocol === "file:";

  if (isLocalFile) {
    if (tipEl) {
      tipEl.textContent = "Using local quotes. Tip: Use Live Server for online quotes.";
    }
    showLocalQuote(textEl, authorEl);
    return;
  }

  textEl.textContent = "Loading a new quote...";
  authorEl.textContent = "";

  try {
    const response = await fetch("https://type.fit/api/quotes");

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const quotes = await response.json();
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    animateQuoteChange(
      textEl,
      authorEl,
      random.text,
      random.author || "Unknown"
    );

  } catch (error) {
    console.warn("Quote API failed. Using local quotes.", error);
    if (tipEl) tipEl.textContent = "Online quotes failed. Using local quotes instead.";
    showLocalQuote(textEl, authorEl);
  }
}

function animateQuoteChange(textEl, authorEl, newText, newAuthor) {
  textEl.classList.add("fade-out");
  authorEl.classList.add("fade-out");

  setTimeout(() => {
    textEl.textContent = newText;
    authorEl.textContent = `— ${newAuthor}`;

    textEl.classList.remove("fade-out");
    authorEl.classList.remove("fade-out");

    textEl.classList.add("fade-in");
    authorEl.classList.add("fade-in");

    setTimeout(() => {
      textEl.classList.remove("fade-in");
      authorEl.classList.remove("fade-in");
    }, 280);
  }, 260);
}

function showLocalQuote(textEl, authorEl) {
  const randomIndex = Math.floor(Math.random() * LOCAL_QUOTES.length);
  const quote = LOCAL_QUOTES[randomIndex];

  animateQuoteChange(textEl, authorEl, quote.text, quote.author);
}
