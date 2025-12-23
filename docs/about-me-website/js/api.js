// js/api.js
// =====================================================
// API MODULE (AGIFY)
// - Fetches age estimate by name
// =====================================================

export function loadAgifyAge(apiNameInput, apiOutput) {
  const name = apiNameInput.value.trim();

  if (!name) {
    apiOutput.textContent = "Please enter a name.";
    return;
  }

  apiOutput.textContent = "Loading API data...";

  fetch(`https://api.agify.io/?name=${encodeURIComponent(name)}`)
    .then((res) => res.json())
    .then((data) => {
      apiOutput.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Estimated Age:</strong> ${data.age ?? "N/A"}</p>
        <p><strong>Based on:</strong> ${data.count ?? 0} records</p>
      `;
    })
    .catch((err) => {
      console.error("Agify API failed:", err);
      apiOutput.textContent = "Failed to load API data.";
    });
}
