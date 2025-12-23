// js/quotes.js
// =====================================================
// QUOTES MODULE
// - Always works using LOCAL_QUOTES
// - Tries online API first if not running file://
// - Falls back to local quotes if API fails
// =====================================================

// Default quote (what Reset brings you back to)
const DEFAULT_QUOTE = {
  text: "Learning to code is learning to create.",
  author: "Zacharius"
};

// Local quote list (always available)
const LOCAL_QUOTES = [
  DEFAULT_QUOTE,
  { text: "Code is not just syntax — it's thinking made visible.", author: "Anonymous" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Programs must be written for people to read.", author: "Harold Abelson" },
  { text: "Every great developer started exactly where you are.", author: "Unknown" }
];

/**
 * Resets the quote display back to the default quote.
 */
export function resetQuote(textEl, authorEl, tipEl) {
  animateQuoteChange(
    textEl,
    authorEl,
    DEFAULT_QUOTE.text,
    DEFAULT_QUOTE.author
  );

  if (tipEl) tipEl.textContent = "";
}


/**
 * Loads a random quote.
 * - If running from file:// it uses local quotes (APIs can be blocked)
 * - If running from Live Server (http://...) it tries API first
 */
export async function loadRandomQuote(textEl, authorEl, tipEl) {
  // Clear any tip message first
  if (tipEl) tipEl.textContent = "";

  const isLocalFile = window.location.protocol === "file:";

  // If file://, skip API and use local quotes immediately
  if (isLocalFile) {
    if (tipEl) {
      tipEl.textContent = "Using local quotes. Tip: Use Live Server for online quotes.";
    }
    showLocalQuote(textEl, authorEl);
    return;
  }

  // Show loading message while we fetch
  textEl.textContent = "Loading a new quote...";
  authorEl.textContent = "";

  try {
    const response = await fetch("https://type.fit/api/quotes");

    // If the server returns an error code, stop and fallback
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const quotes = await response.json();
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    textEl.textContent = random.text;
    authorEl.textContent = `— ${random.author || "Unknown"}`;

  } catch (error) {
    console.warn("Quote API failed. Using local quotes.", error);
    if (tipEl) tipEl.textContent = "Online quotes failed. Using local quotes instead.";
    showLocalQuote(textEl, authorEl);
  }
}

/**
 * Picks a random quote from LOCAL_QUOTES and shows it.
 * This is a private helper function (not exported).
 */

/**
 * Smoothly updates quote text/author with a fade animation.
 */
function animateQuoteChange(textEl, authorEl, newText, newAuthor) {
  // Fade out first
  textEl.classList.add("fade-out");
  authorEl.classList.add("fade-out");

  // After fade-out finishes, change content, then fade back in
  setTimeout(() => {
    textEl.textContent = newText;
    authorEl.textContent = `— ${newAuthor}`;

    textEl.classList.remove("fade-out");
    authorEl.classList.remove("fade-out");

    // Optional: force a "fade-in" state (keeps it consistent)
    textEl.classList.add("fade-in");
    authorEl.classList.add("fade-in");

    // Remove fade-in class after the animation is done
    setTimeout(() => {
      textEl.classList.remove("fade-in");
      authorEl.classList.remove("fade-in");
    }, 280);
  }, 260);
}

function showLocalQuote(textEl, authorEl) {
  const randomIndex = Math.floor(Math.random() * LOCAL_QUOTES.length);
  const quote = LOCAL_QUOTES[randomIndex];

  textEl.textContent = quote.text;
  authorEl.textContent = `— ${quote.author}`;
}
