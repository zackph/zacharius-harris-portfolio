// js/main.js
// Main “wiring” file: grabs elements + connects buttons to each module.

import { loadTheme, toggleTheme } from "./theme.js";
import { loadRandomQuote, resetQuote } from "./quotes.js";
import {
  loadSavedName,
  updateCharUI,
  loadMessageHistory,
  handleMessageSubmit,
  clearMessageHistory,
} from "./messages.js";

import { loadAgifyAge } from "./api.js";

// Run AFTER the page loads so the elements exist
document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // Grab elements from HTML (IDs must match!)
  // =========================================
  const body = document.body;

  // Theme
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // Quotes
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const newQuoteBtn = document.getElementById("newQuoteBtn");
  const resetQuoteBtn = document.getElementById("resetQuoteBtn");

  // Messages
  const nameInput = document.getElementById("userName");
  const msgInput = document.getElementById("userMessage");
  const messageForm = document.getElementById("messageForm");
  const charCount = document.getElementById("charCount");
  const charWarning = document.getElementById("charWarning");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const messageList = document.getElementById("messageList");

  // API demo
  const apiNameInput = document.getElementById("apiNameInput");
  const loadApiBtn = document.getElementById("loadApiBtn");
  const apiOutput = document.getElementById("apiOutput");

  // =========================================
  // Theme wiring
  // =========================================
  if (themeToggleBtn) {
    loadTheme(body, themeToggleBtn);
    themeToggleBtn.addEventListener("click", () => toggleTheme(body, themeToggleBtn));
  }

  // =========================================
  // Quotes wiring
  // =========================================
  if (quoteText && quoteAuthor) {
    // Set the default quote once on load
    resetQuote(quoteText, quoteAuthor);

    if (newQuoteBtn) {
      newQuoteBtn.addEventListener("click", () => loadRandomQuote(quoteText, quoteAuthor));
    }

    if (resetQuoteBtn) {
      resetQuoteBtn.addEventListener("click", () => resetQuote(quoteText, quoteAuthor));
    }
  }

  // =========================================
  // Messages wiring
  // =========================================
  if (nameInput) loadSavedName(nameInput);

  if (messageList) loadMessageHistory(messageList);

  if (msgInput && charCount && charWarning) {
    // Show initial “50 characters remaining”
    updateCharUI(msgInput, charCount, charWarning);

    msgInput.addEventListener("input", () => {
      updateCharUI(msgInput, charCount, charWarning);
    });
  }

  if (messageForm) {
    messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleMessageSubmit(nameInput, msgInput, messageList);
      if (msgInput && charCount && charWarning) {
        updateCharUI(msgInput, charCount, charWarning);
      }
    });
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => clearMessageHistory(messageList));
  }

  // =========================================
  // API wiring (optional)
  // =========================================
  if (loadApiBtn) {
    loadApiBtn.addEventListener("click", () => {
      loadAgifyAge(apiNameInput, apiOutput);
    });
  }
});
