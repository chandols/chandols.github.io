let currentIndex = 0;
let currentResults = [];
let currentNumber = null; // the currently viewed collection number

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (!input) return;

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchCollection();
    }
  });
});

function searchCollection() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  currentResults = collections.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  const resultsList = document.getElementById("resultsList");
  const resultDetail = document.getElementById("resultDetail");
  resultsList.innerHTML = "";
  resultDetail.style.display = "none";

  if (currentResults.length === 0) {
    resultsList.innerHTML = "<p>No results found.</p>";
    return;
  }

  // auto open if theres only 1 result
  if (currentResults.length === 1) {
    currentNumber = currentResults[0].number;
    renderDetail();
    return;
  }

  // list of results
  currentResults.forEach((item, index) => {
    const div = document.createElement("div");
div.className = "result-item";
div.innerHTML = `
  <span class="match-name">${item.name}</span>
  <button class="view-button" onclick="showDetailFromResults(${index})">View</button>
`;
resultsList.appendChild(div);

  });
}

function showDetailFromResults(index) {
  const item = currentResults[index];
  if (!item) return;
  currentNumber = item.number;
  renderDetail();
}

// render detail by the currently selected number
function renderDetail() {
  const resultDetail = document.getElementById("resultDetail");
  const resultBox = document.getElementById("result");

  const fullItem = collections.find(c => c.number === currentNumber);
  if (!fullItem) return;

  resultBox.innerHTML = `
    <div class="result-card">
      <h2>${fullItem.name} <span class="collection-number">(${fullItem.number}/60)</span></h2>
      <p><strong>Style:</strong> ${fullItem.style}</p>
      <p><strong>Quality:</strong> ${fullItem.quality}</p>
      <p><strong>Price:</strong> ${fullItem.price}</p>
      <p><strong>Audience:</strong> ${fullItem.audience}</p>

      <div class="nav-buttons">
        <button id="prevBtn" ${fullItem.number === 1 ? "disabled" : ""}>← Previous</button>
        <button id="nextBtn" ${fullItem.number === 60 ? "disabled" : ""}>Next →</button>
      </div>
    </div>
  `;

  resultDetail.style.display = "block";

  // nav arrows
  document.getElementById("prevBtn")?.addEventListener("click", () => {
    if (currentNumber > 1) {
      currentNumber -= 1;
      renderDetail();
    }
  });

  document.getElementById("nextBtn")?.addEventListener("click", () => {
    if (currentNumber < 60) {
      currentNumber += 1;
      renderDetail();
    }
  });
}