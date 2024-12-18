document.addEventListener("DOMContentLoaded", () => {
    // Overlay Elements
    const overlay = document.querySelector(".overlay:not(.submitted)");
    const submittedOverlay = document.querySelector(".overlay.submitted");
    const overlayBubblesContainer = overlay.querySelector(".rating-bubbles");
    const closeButton = overlay.querySelector(".close-button");
    const submitButton = overlay.querySelector(".button"); // Submit button in the review overlay
    const goBackButton = submittedOverlay.querySelector(".go-back-button");
  
    // Initialize Bubbles in Overlay
    createBubbles((rating) => {
      console.log(`Overlay updated rating: ${rating}`);
      updateOverlayBubbles(rating);
    }, overlayBubblesContainer);
  
    // Show Submitted Overlay
    submitButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default behavior
      overlay.classList.remove("visible"); // Hide review overlay
      submittedOverlay.classList.add("visible"); // Show submitted overlay
    });
  
    // Close Submitted Overlay
    goBackButton.addEventListener("click", () => {
      submittedOverlay.classList.remove("visible");
    });
  
    // Close Review Overlay
    closeButton.addEventListener("click", () => {
      overlay.classList.remove("visible");
    });
  
    // Functions
    function showOverlay() {
      overlay.classList.add("visible");
    }
     
    // Attach to window object
    window.showOverlay = showOverlay;
    
  
    

    // Create Bubbles rating
    function createBubbles(onClick, container = null) {
        const bubbleContainer = container || document.createElement("div");
        if (!container) bubbleContainer.classList.add("rating-bubbles");
        bubbleContainer.innerHTML = ""; // Clear previous bubbles
        for (let i = 1; i <= 5; i++) {
          const bubble = document.createElement("img");
          bubble.src = "images/rating-empty-bub.png";
          bubble.alt = `Rate ${i}`;
          bubble.dataset.value = i;
          bubble.addEventListener("click", () => onClick(i));
          bubbleContainer.appendChild(bubble);
        }
        return bubbleContainer;
      }
      // Attach to window object
      window.createBubbles = createBubbles;


    // Update Bubbles rating
      function updateOverlayBubbles(rating) {
        const bubbles = overlayBubblesContainer.querySelectorAll("img");
        bubbles.forEach((bubble, index) => {
          bubble.src = index < rating ? "images/rating-filled-bub.png" : "images/rating-empty-bub.png";
        });
      }
       // Attach to window object
       window.updateOverlayBubbles = updateOverlayBubbles;
  });
  