// Global function definition
function initializePhotoGallery(photoArray) {
  let currentPhotoIndex = 1; // Start at 1 because of the duplicated first image

  // Dynamically create slider container with images
  const photoGallery = document.querySelector(".photo-gallery");
  const slider = document.createElement("div");
  slider.classList.add("slider");

  // Duplicate the first and last images
  const photos = [photoArray[photoArray.length - 1], ...photoArray, photoArray[0]];

  // Add all images to the slider
  photos.forEach((photo, index) => {
    const img = document.createElement("img");
    img.id = `photo-${index}`;
    img.classList.add("photo");
    img.src = photo;
    img.alt = `Photo ${index + 1}`;
    img.style.width = "100%"; // Ensure the image matches the gallery width
    slider.appendChild(img);
  });

  photoGallery.appendChild(slider);

  // Update the slider position
  function updateSlider(animated = true) {
    const offset = -currentPhotoIndex * 340; // Adjust to your gallery width
    slider.style.transition = animated ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(${offset}px)`;
  }

  // Handle transition end for seamless looping
  slider.addEventListener("transitionend", () => {
    if (currentPhotoIndex === 0) {
      currentPhotoIndex = photoArray.length; // Jump to the last original image
      updateSlider(false); // Disable animation
    }
    if (currentPhotoIndex === photoArray.length + 1) {
      currentPhotoIndex = 1; // Jump to the first original image
      updateSlider(false); // Disable animation
    }
  });

  // Event listeners for arrows
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  leftArrow.addEventListener("click", () => {
    currentPhotoIndex -= 1;
    updateSlider();
  });

  rightArrow.addEventListener("click", () => {
    currentPhotoIndex += 1;
    updateSlider();
  });

  // Swipe functionality
  let startX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
      currentPhotoIndex += 1; // Swipe left
    } else if (startX < endX - 50) {
      currentPhotoIndex -= 1; // Swipe right
    }
    updateSlider();
  });

  // Drag functionality for desktops
  slider.addEventListener("mousedown", (e) => {
    startX = e.clientX;
  });

  slider.addEventListener("mouseup", (e) => {
    const endX = e.clientX;
    if (startX > endX + 50) {
      currentPhotoIndex += 1; // Drag left
    } else if (startX < endX - 50) {
      currentPhotoIndex -= 1; // Drag right
    }
    updateSlider();
  });

  // Initialize the slider's position
  updateSlider(false); // No animation for initial setup
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Menu Toggle
  const menuIcon = document.getElementById("menuIcon");
  const menuPanel = document.getElementById("menuPanel");

  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent immediate closing when clicking the menu icon
    menuPanel.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (menuPanel.classList.contains("open") && !menuPanel.contains(e.target)) {
      menuPanel.classList.remove("open");
    }
  });

  // Language Toggle
  const languageToggle = document.getElementById("languageToggle");
  if (languageToggle) {
    let currentLanguage = "EN";
    languageToggle.addEventListener("click", (e) => {
      e.preventDefault();
      currentLanguage = currentLanguage === "EN" ? "DA" : "EN";

      // Update the text with styled active language
      languageToggle.innerHTML = `
        <span style="color: ${currentLanguage === "EN" ? "#D9B79A" : "#333"};">EN</span> /
        <span style="color: ${currentLanguage === "DA" ? "#D9B79A" : "#333"};">DA</span>
      `;
    });

    // Initialize with correct colors
    languageToggle.innerHTML = `
      <span style="color: #D9B79A;">EN</span> /
      <span style="color: #F2F2F0;">DA</span>
    `;
  }
});
