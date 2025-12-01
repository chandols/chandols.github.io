document.addEventListener("DOMContentLoaded", () => {
  fetch("/assets/version.json")
    .then(response => response.json())
    .then(data => {
      const label = document.getElementById("version-label");
      if (label) {
        label.textContent = data.version;
      }
    })
    .catch(err => console.error("Failed to load version:", err));
});


// this is just to show the version at the bottom right corner, prob no need to adjust anything here.
// to change the version, change the number in version.json.