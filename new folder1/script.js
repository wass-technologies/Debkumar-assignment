document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".containercoursel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const itemWidth = 240; // Image width (230px) + margin
    let position = 0;

    // Duplicate images for infinite scrolling effect
    const images = [...slider.children];
    images.forEach((image) => {
        const clone = image.cloneNode(true);
        slider.appendChild(clone);
    });

    // Function to move slider left
    function slideLeft() {
        if (position >= 0) {
            position = -slider.scrollWidth / 2;
        }
        position += itemWidth;
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(${position}px)`;
    }

    // Function to move slider right
    function slideRight() {
        position -= itemWidth;
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(${position}px)`;

        // Reset position when reaching the end
        if (Math.abs(position) >= slider.scrollWidth / 2) {
            setTimeout(() => {
                position = 0;
                slider.style.transition = "none";
                slider.style.transform = `translateX(${position}px)`;
            }, 500);
        }
    }

    // Button click event listeners
    prevBtn.addEventListener("click", slideLeft);
    nextBtn.addEventListener("click", slideRight);

    // Auto-slide every 3 seconds (optional)
    setInterval(slideRight, 3000);
});

