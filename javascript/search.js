// search.js

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("search-results");
  document.querySelector(".beer-search-wrapper").appendChild(resultContainer);

  let beers = [];

  // Fetch the beers.json data
  fetch("../json/beers.json")
    .then((response) => response.json())
    .then((data) => {
      beers = data;
    })
    .catch((error) => console.error("Error loading beer data:", error));

  // Search function
  function searchBeers(query) {
    const lowerCaseQuery = query.toLowerCase();
    return beers.filter((beer) =>
      beer["Beer Name"].toLowerCase().includes(lowerCaseQuery) ||
      beer["Brewery Name"].toLowerCase().includes(lowerCaseQuery) ||
      beer["Beer Type"].toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Organize results by bar
  function groupByBar(results) {
    return {
      Veskebalancen: results.filter((beer) => beer["Is in Veskebalancen"]),
      Erlings: results.filter((beer) => beer["Is in Erlings"]),
      MigOgOlsnedkeren: results.filter((beer) => beer["Is in Mig og Olsnedkeren"]),
    };
  }

  // Display search results
  function displayResults(results) {
    resultContainer.innerHTML = ""; // Clear previous results
    const bars = groupByBar(results);

    const barNamesMap = {
      Veskebalancen: { name: "Væskebalancen Bar", link: "../vaeskebalancen.html" },
      Erlings: { name: "Erlings Jazz- & Ølbar", link: "../erlings.html" },
      MigOgOlsnedkeren: { name: "Mig og Ølsnedkeren", link: "../mig_og_olsnedkeren.html" },
    };

    Object.entries(bars).forEach(([barName, beers]) => {
      if (beers.length > 0) {
        const barSection = document.createElement("div");
        barSection.classList.add("search-bar-section");
        barSection.innerHTML = `<h3 class="search-bar-title">${barNamesMap[barName].name}</h3>`;

        beers.forEach((beer) => {
          const beerItem = document.createElement("div");
          beerItem.classList.add("search-beer-item");

          beerItem.innerHTML = `
            <div class="search-beer-header">
              <strong class="search-beer-name">${beer["Beer Name"]}</strong>
              <strong class="search-beer-price">${beer["Price"]}</strong>
            </div>
            <p class="search-beer-type">${beer["Beer Type"]}</p>
            <p class="search-beer-brewery">${beer["Brewery Name"]}</p>
            <p class="search-beer-flavor">${beer["Flavor Profile"]}</p>
          `;
          barSection.appendChild(beerItem);
        });

        // Add "Check it out" button
        const button = document.createElement("a");
        button.href = barNamesMap[barName].link;
        button.classList.add("button");
        button.textContent = "Check it out";
        button.style.display = "inline-block";
        button.style.textAlign = "center";
        button.style.margin = "1rem auto 0";

        barSection.appendChild(button);
        resultContainer.appendChild(barSection);
      }
    });

    if (results.length === 0) {
      resultContainer.innerHTML = `<p class="search-no-results">No beers found. Try another search!</p>`;
    }
  }

  // Trigger search on input
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
      const results = searchBeers(query);
      displayResults(results);
    } else {
      resultContainer.innerHTML = "";
    }
  });
});
