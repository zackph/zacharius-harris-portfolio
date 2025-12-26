// js/reviews.js
// =====================================================
// REVIEWS MODULE
// - Clickable star rating (1-5)
// - Save/load reviews (localStorage)
// =====================================================

const REVIEW_KEY = "reviewHistory";
const MAX_REVIEW_CHARS = 120;

let selectedRating = 5;

/**
 * Initializes the clickable stars.
 * - hover previews
 * - click selects
 * - mouseleave restores selection
 */
export function initStarRating(starContainer, ratingValueEl) {
  const stars = [...starContainer.querySelectorAll("button")];

  function paintStars(value) {
    stars.forEach((btn) => {
      const starValue = Number(btn.dataset.value);
      btn.classList.toggle("selected", starValue <= value);
    });
    ratingValueEl.textContent = `Rating: ${value}`;
  }

  stars.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRating = Number(btn.dataset.value);
      paintStars(selectedRating);
    });

    btn.addEventListener("mouseenter", () => {
      paintStars(Number(btn.dataset.value));
    });
  });

  starContainer.addEventListener("mouseleave", () => {
    paintStars(selectedRating);
  });

  // default
  paintStars(selectedRating);
}

export function loadReviews(reviewListEl) {
  const stored = localStorage.getItem(REVIEW_KEY);
  if (!stored) return;

  const reviews = JSON.parse(stored);
  reviews.forEach((r) => addReviewToList(reviewListEl, r));
}

export function handleReviewSubmit(e, els) {
  e.preventDefault();

  const { nameEl, textEl, warningEl, listEl } = els;

  const name = nameEl.value.trim();
  const text = textEl.value.trim();
  const rating = selectedRating;

  if (!name || !text) return;

  if (text.length > MAX_REVIEW_CHARS) {
    warningEl.textContent = `Review too long. Keep it under ${MAX_REVIEW_CHARS} characters.`;
    return;
  }

  warningEl.textContent = "";

  const stored = localStorage.getItem(REVIEW_KEY);
  const reviews = stored ? JSON.parse(stored) : [];

  const newReview = {
    name,
    text,
    rating,
    createdAt: new Date().toISOString()
  };

  reviews.push(newReview);
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));

  addReviewToList(listEl, newReview);

  // reset text only (keep rating selection)
  textEl.value = "";
}

export function clearReviews(listEl) {
  localStorage.removeItem(REVIEW_KEY);
  listEl.innerHTML = "";
}

function addReviewToList(listEl, review) {
  const li = document.createElement("li");

  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

  li.innerHTML = `
    <strong>${escapeHtml(review.name)}</strong>
    <span class="review-stars">${stars}</span>
    <div>${escapeHtml(review.text)}</div>
  `;

  listEl.appendChild(li);
  li.classList.add("new-message");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
