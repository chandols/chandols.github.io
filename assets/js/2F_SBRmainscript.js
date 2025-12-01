document.addEventListener("DOMContentLoaded", () => {
  const category = document.getElementById("category");
  const suggestionOptions = document.getElementById("suggestionOptions");
  const suggestionType = document.getElementById("suggestionType");
  const existingFunctionOptions = document.getElementById("existingFunctionOptions");
  const bugOptions = document.getElementById("bugOptions");
  const submitBtn = document.getElementById("submitBtn");

  // show or hide based on category that user chose
  category.addEventListener("change", () => {
    suggestionOptions.style.display = category.value === "suggestion" ? "block" : "none";
    bugOptions.style.display = category.value === "bug" ? "block" : "none";
    existingFunctionOptions.style.display = "none";
  });

  // existing function dropdown thing so it only pops up if existing function was chosen
  suggestionType.addEventListener("change", () => {
    existingFunctionOptions.style.display = suggestionType.value === "existing" ? "block" : "none";
  });

  // handle submit
  submitBtn.addEventListener("click", async () => {
    const data = {
      nickname: document.getElementById("nickname")?.value.trim() || null,
      category: category.value,
      suggestionType: suggestionType.value,
      functionName: document.getElementById("functionName")?.value || null,
      bugArea: document.getElementById("bugArea")?.value || null,
      message: document.getElementById("message").value.trim(),
      timestamp: new Date().toISOString()
    };

    if (!data.category || !data.message) {
      alert("Please select a category and enter a message.");
      return;
    }

    try {
      // cloudflare worker stuff
      const response = await fetch("https://ubet.uraniumdonx.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        alert(`✅ Sent to Discord as "${result.threadTitle}"`);
        document.getElementById("message").value = "";
      } else {
        alert("❌ Failed to send. Check console.");
        console.error(result);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error sending to server.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const category = document.getElementById("category");
  const suggestionOptions = document.getElementById("suggestionOptions");
  const suggestionType = document.getElementById("suggestionType");
  const existingFunctionOptions = document.getElementById("existingFunctionOptions");
  const bugOptions = document.getElementById("bugOptions");

  // thingy to toggle visibility
  const toggleVisibility = (el, show) => {
    el.classList.toggle("visible", show);
  };

  // normal state
  toggleVisibility(suggestionOptions, false);
  toggleVisibility(bugOptions, false);
  toggleVisibility(existingFunctionOptions, false);

  category.addEventListener("change", () => {
    const selected = category.value;
    toggleVisibility(suggestionOptions, selected === "suggestion");
    toggleVisibility(bugOptions, selected === "bug");
    toggleVisibility(existingFunctionOptions, false); // reset
  });

  suggestionType.addEventListener("change", () => {
    toggleVisibility(existingFunctionOptions, suggestionType.value === "existing");
  });
});