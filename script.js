document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const resultDiv = document.getElementById("result");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchCollection();
    }
  });

  document.querySelector("button").addEventListener("click", searchCollection);

  function searchCollection() {
    const query = input.value.trim().toLowerCase();
    resultDiv.innerHTML = "";

    const matches = clothingData.filter(item =>
      item.name.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultDiv.innerHTML = `<p>No matching collections found.</p>`;
      return;
    }

    if (matches.length === 1) {
      displayDetails(matches[0]);
    } else {
      const list = document.createElement("ul");
      list.className = "match-list";
      matches.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.number}/60)`;
        li.addEventListener("click", () => displayDetails(item));
        list.appendChild(li);
      });
      resultDiv.innerHTML = `<p>Multiple matches found. Click one:</p>`;
      resultDiv.appendChild(list);
    }
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
    `;
  }
});
