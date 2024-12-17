document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

// BEER SECTION (On Tap)
const beerSection = document.querySelector(".on-tap-section");
if (beerSection) {
  const beerTitle = beerSection.querySelector(".dropdown-title");
  const beerArrow = beerSection.querySelector(".arrow-down");
  const beerList = beerSection.querySelector(".beer-list");

  if (beerTitle && beerArrow && beerList) {
    const placeFilter = beerSection.getAttribute("data-place"); // Extract data-place
    console.log("Place Filter:", placeFilter);

    fetch("../json/beers.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter beers dynamically based on data-place attribute
        const filteredBeers = data.filter((beer) => beer[placeFilter] === true);

        // Clear existing list
        beerList.innerHTML = "";

        // Populate the beer list
        if (filteredBeers.length > 0) {
          filteredBeers.forEach((beer) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
              <div class="beer-item">
                <div class="beer-header">
                  <strong class="beer-name">${beer["Beer Name"]}</strong>
                  <strong>${beer["Price"]}</strong>
                </div>
                <p>${beer["Beer Type"]}</p>
                <p>${beer["Brewery Name"]}</p>
                <p>${beer["Flavor Profile"]}</p>
              </div>
            `;
            beerList.appendChild(listItem);
          });
        } else {
          beerList.innerHTML = "<li>No beers available for this bar.</li>";
        }

        // Initialize dropdown state
        beerList.style.maxHeight = "0px";
      })
      .catch((error) => {
        console.error("Error fetching or processing the JSON file:", error);
      });

    // Dropdown toggle functionality
    beerTitle.addEventListener("click", () => {
      toggleDropdown(beerList, beerArrow);
    });
  }
}


  // EVENT SECTION (Upcoming Events)
  const eventSection = document.querySelector(".event-section");
  if (eventSection) {
    const eventTitle = eventSection.querySelector(".dropdown-title");
    const eventArrow = eventSection.querySelector(".arrow-down");
    const eventList = eventSection.querySelector(".event-list");

    if (eventTitle && eventArrow && eventList) {
      const placeFilter = eventSection.getAttribute("data-place");
      console.log("Place Filter:", placeFilter);

      fetch("../json/events.json")
        .then((response) => response.json())
        .then((data) => {
          const filteredEvents = data.filter((event) => event.place === placeFilter);
          const groupedEvents = filteredEvents.reduce((acc, event) => {
            acc[event.date] = acc[event.date] || [];
            acc[event.date].push(event);
            return acc;
          }, {});

          for (const [date, events] of Object.entries(groupedEvents)) {
            const dateItem = document.createElement("li");
            dateItem.innerHTML = `<p class="event-date">${date}</p>`;
            events.forEach((event) => {
              dateItem.innerHTML += `
                <div class="event-details">
                  <p><strong class="event-time">${event.time || ""}</strong> ${event.name}</p>
                </div>
              `;
            });
            eventList.appendChild(dateItem);
          }

          eventList.style.maxHeight = "0px";
        })
        .catch((error) => {
          console.error("Error fetching or processing the JSON file:", error);
        });

      eventTitle.addEventListener("click", () => {
        toggleDropdown(eventList, eventArrow);
      });
    }
  }

  // REVIEWS DROPDOWN SECTION
  const reviewsDropdownSection = document.querySelector(".reviews-section.dropdown");
  if (reviewsDropdownSection) {
    const reviewContent = reviewsDropdownSection.querySelector(".review-content");

    // Current Rating Section
    const currentRatingDiv = document.createElement("div");
    currentRatingDiv.classList.add("rating");
    
    // Dynamically populate the current rating section
    const ratingImage = reviewsDropdownSection.getAttribute("data-rating-image");
    const rating = reviewsDropdownSection.getAttribute("data-rating");
    const reviews = reviewsDropdownSection.getAttribute("data-reviews");

    currentRatingDiv.innerHTML = `
      <img src="${ratingImage}" alt="Rating Icon">
      <h2>${rating}</h2>
      <p>(${reviews})</p>
    `;
    
    reviewContent.appendChild(currentRatingDiv);

    // "Rate your experience" section
    const rateDiv = document.createElement("div");
    rateDiv.classList.add("rate");
    rateDiv.innerHTML = `<h2>Rate your experience</h2>`;

    // Create and append bubbles for rating
    const ratingBubblesContainer = createBubbles((rating) => {
      console.log(`User selected rating: ${rating}`);
      updateOverlayBubbles(rating);
      showOverlay();
    });

    rateDiv.appendChild(ratingBubblesContainer);
    reviewContent.appendChild(rateDiv);

    // Community reviews section
    const communityReviewsDiv = document.createElement("div");
    communityReviewsDiv.classList.add("community_reviews");
    communityReviewsDiv.innerHTML = `<h2>Community reviews</h2>`;
    reviewContent.appendChild(communityReviewsDiv);

    // Fetch and add community reviews based on `data-place`
    const placeFilter = reviewsDropdownSection.getAttribute("data-place");
    fetch("../json/reviews.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredReviews = data.filter((review) => review["place"] === placeFilter);
        filteredReviews.forEach((review) => {
          const reviewCard = document.createElement("div");
          reviewCard.classList.add("review-card");
          reviewCard.style.backgroundColor = "#859290"; // Set the background color
          reviewCard.innerHTML = `
            <h3>${review["name"]}</h3>
            <div class="review-meta">
              <img src="${review["rating"]}" alt="Rating">
              <span style="font-style: italic; opacity: 0.5; margin-left: -10px;s">${review["when"]}</span>
            </div>
            <p>${review["review"]}</p>
          `;
          communityReviewsDiv.appendChild(reviewCard);
        });
      })
      .catch((error) => console.error("Error fetching reviews:", error));

  
    reviewContent.style.maxHeight = "0";

    const reviewTitle = reviewsDropdownSection.querySelector(".dropdown-title");
    const reviewArrow = reviewsDropdownSection.querySelector(".arrow-down");

    reviewTitle.addEventListener("click", () => {
      toggleDropdown(reviewContent, reviewArrow);
    });
  }

  // HELPER FUNCTIONS
  function toggleDropdown(content, arrow) {
    if (content.style.maxHeight === "0px" || content.style.maxHeight === "") {
      content.style.maxHeight = `${content.scrollHeight}px`;
      arrow.classList.add("arrow-rotated");
    } else {
      content.style.maxHeight = "0px";
      arrow.classList.remove("arrow-rotated");
    }
  }
});
