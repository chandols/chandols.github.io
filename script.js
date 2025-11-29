document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const resultDiv = document.getElementById("result");

  let currentItem = null;

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchCollection();
    }
  });

  document.querySelector("button").addEventListener("click", searchCollection);

  function searchCollection() {
    const query = input.value.trim().toLowerCase();
    resultDiv.innerHTML = "";

    const match = clothingData.find(item =>
      item.name.toLowerCase().includes(query)
    );

    if (!match) {
      resultDiv.innerHTML = `<p>No matching collection found.</p>`;
      return;
    }

    currentItem = match;
    displayDetails(currentItem);
  }

  function displayDetails(item) {
    const { number, name, style, quality, price, audience } = item;
    resultDiv.innerHTML = `
      <div class="result-card">
        <h2>${name} <span class="collection-number">(${number}/60)</span></h2>
        <p><strong>Style:</strong> ${style}</p>
        <p><strong>Quality:</strong> ${quality}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Audience:</strong> ${audience}</p>
      </div>
      <div class="nav-buttons">
        <button id="prevBtn" ${number === 1 ? "disabled" : ""}>← Previous</button>
        <button id="nextBtn" ${number === 60 ? "disabled" : ""}>Next →</button>
      </div>
    `;

    document.getElementById("prevBtn")?.addEventListener("click", () => {
      if (item.number > 1) {
        currentItem = clothingData.find(c => c.number === item.number - 1);
        displayDetails(currentItem);
      }
    });

    document.getElementById("nextBtn")?.addEventListener("click", () => {
      if (item.number < 60) {
        currentItem = clothingData.find(c => c.number === item.number + 1);
        displayDetails(currentItem);
      }
    });
  }
});
