// js/main.js
// =====================================================
// MAIN MODULE (ENTRY POINT)
// - Wires up Theme + Quotes + Messages + API
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

import { loadAgifyAge } from "./api.js";

// =====================================================
// GRAB ELEMENTS FROM HTML (IDs must match index.html)
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

// Messages: character counter
userMessageInput.addEventListener("input", () => {
  updateCharUI(userMessageInput, charCountEl, charWarningEl);
});

// Messages: submit
messageForm.addEventListener("submit", (e) => {
  handleMessageSubmit(e, {
    userNameInput,
    userMessageInput,
    messageListEl,
    charWarningEl,
    charCountEl
  });
});

// Messages: clear history
clearHistoryBtn.addEventListener("click", () => {
  clearMessageHistory(messageListEl);
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

console.log("Lesson 12 full modules loaded ✅");


