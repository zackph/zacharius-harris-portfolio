// js/main.js
// =====================================================
// MAIN MODULE (ENTRY POINT)
// - Wires up Theme + Quotes + Messages + Reviews + API
// =====================================================

import { loadTheme, toggleTheme } from "./theme.js";
import { loadRandomQuote, resetQuote } from "./quotes.js";

import {
  loadSavedName,
  updateCharUI,
  loadMessageHistory,
  handleMessageSubmit,
  clearMessageHistory
} from "./messages.js";

import {
  initStarRating,
  loadReviews,
  handleReviewSubmit,
  clearReviews
} from "./reviews.js";

import { loadAgifyAge } from "./api.js";

// =====================================================
// GRAB ELEMENTS
// =====================================================

// Theme
const body = document.body;
const themeToggleBtn = document.getElementById("themeToggleBtn");

// Quotes
const quoteTextEl = document.getElementById("quote-text");
const quoteAuthorEl = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const resetQuoteBtn = document.getElementById("resetQuoteBtn");
const quoteTipEl = document.getElementById("quoteTip");

// Messages
const messageForm = document.getElementById("messageForm");
const userNameInput = document.getElementById("userName");
const userMessageInput = document.getElementById("userMessage");
const charWarningEl = document.getElementById("charWarning");
const charCountEl = document.getElementById("charCount");
const messageListEl = document.getElementById("messageList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// Reviews
const reviewForm = document.getElementById("reviewForm");
const reviewNameEl = document.getElementById("reviewName");
const reviewTextEl = document.getElementById("reviewText");
const reviewWarningEl = document.getElementById("reviewWarning");
const reviewListEl = document.getElementById("reviewList");
const clearReviewsBtn = document.getElementById("clearReviewsBtn");

const starRatingEl = document.getElementById("starRating");
const ratingValueEl = document.getElementById("ratingValue");

// API Demo
const apiNameInput = document.getElementById("apiNameInput");
const loadApiBtn = document.getElementById("loadApiBtn");
const apiOutput = document.getElementById("apiOutput");

// =====================================================
// EVENT LISTENERS
// =====================================================

// Theme toggle
themeToggleBtn.addEventListener("click", () => {
  toggleTheme(body, themeToggleBtn);
});

// Quotes
newQuoteBtn.addEventListener("click", () => {
  loadRandomQuote(quoteTextEl, quoteAuthorEl, quoteTipEl);
});

resetQuoteBtn.addEventListener("click", () => {
  resetQuote(quoteTextEl, quoteAuthorEl, quoteTipEl);
});

// Messages
userMessageInput.addEventListener("input", () => {
  updateCharUI(userMessageInput, charCountEl, charWarningEl);
});

messageForm.addEventListener("submit", (e) => {
  handleMessageSubmit(e, {
    userNameInput,
    userMessageInput,
    messageListEl,
    charWarningEl,
    charCountEl
  });
});

clearHistoryBtn.addEventListener("click", () => {
  clearMessageHistory(messageListEl);
});

// Reviews
reviewForm.addEventListener("submit", (e) => {
  handleReviewSubmit(e, {
    nameEl: reviewNameEl,
    textEl: reviewTextEl,
    warningEl: reviewWarningEl,
    listEl: reviewListEl
  });
});

clearReviewsBtn.addEventListener("click", () => {
  clearReviews(reviewListEl);
});

// API demo
loadApiBtn.addEventListener("click", () => {
  loadAgifyAge(apiNameInput, apiOutput);
});

// =====================================================
// INITIAL LOAD
// =====================================================

loadTheme(body, themeToggleBtn);

resetQuote(quoteTextEl, quoteAuthorEl, quoteTipEl);

loadSavedName(userNameInput);
loadMessageHistory(messageListEl);
updateCharUI(userMessageInput, charCountEl, charWarningEl);

initStarRating(starRatingEl, ratingValueEl);
loadReviews(reviewListEl);

console.log("Site modules loaded ✅");
