document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".containercoursel");
  const items = document.querySelectorAll(".gallery-item");
  const totalItems = items.length;
  let itemWidth = items[0].offsetWidth + 10; // Include gap spacing
  let index = 0;
  let autoScroll;

  // Clone items to create an infinite scrolling effect
  for (let i = 0; i < totalItems; i++) {
      let clone = items[i].cloneNode(true);
      container.appendChild(clone);
  }

  function scrollGallery(forward = true) {
      if (forward) {
          index++;
      } else {
          index--;
      }

      container.style.transition = "transform 0.5s ease-in-out";
      container.style.transform = `translateX(-${index * itemWidth}px)`;

      // Reset after full cycle for infinite effect
      if (index >= totalItems) {
          setTimeout(() => {
              container.style.transition = "none"; // Remove transition before resetting
              index = 0;
              container.style.transform = `translateX(0px)`;
          }, 500); // Delay to match transition duration
      } else if (index < 0) {
          setTimeout(() => {
              container.style.transition = "none"; // Remove transition before resetting
              index = totalItems - 1;
              container.style.transform = `translateX(-${index * itemWidth}px)`;
          }, 500);
      }
  }

  // Auto-scroll every 4 seconds
  function startAutoScroll() {
      autoScroll = setInterval(() => scrollGallery(true), 4000);
  }

  function stopAutoScroll() {
      clearInterval(autoScroll);
  }

  startAutoScroll(); // Start auto-scroll initially

  // Adjust item width on window resize
  window.addEventListener("resize", () => {
      itemWidth = items[0].offsetWidth + 10;
  });

  // Left & Right Buttons
  document.getElementById("prevBtn").addEventListener("click", () => {
      stopAutoScroll();
      scrollGallery(true);
      startAutoScroll();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
      stopAutoScroll();
      scrollGallery(false);
      startAutoScroll();
  });
});
