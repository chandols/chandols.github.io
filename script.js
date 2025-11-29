function searchCollection() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  const matches = clothingData.filter(item => item.name.toLowerCase().includes(input));

  if (matches.length === 0) {
    resultDiv.innerHTML = `<p>No matching collections found.</p>`;
    return;
  }

  matches.forEach(item => {
    const { number, name, style, quality, price, audience } = item;
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <h2>${name} <span class="collection-number">(${number}/60)</span></h2>
      <p><strong>Style:</strong> ${style}</p>
      <p><strong>Quality:</strong> ${quality}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Audience:</strong> ${audience}</p>
    `;
    resultDiv.appendChild(card);
  });
}
