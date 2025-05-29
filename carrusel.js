document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Ensure index stays within bounds
        currentSlide = (index + totalSlides) % totalSlides;

        // Update slide position
        const slidesContainer = document.querySelector('.carousel-slides');
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update active slide and dot
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    // Auto slide every 5 seconds
    let autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide); // Pause auto-slide on manual navigation
            showSlide(parseInt(dot.dataset.slide));
            // Resume auto-slide after 5 seconds
            autoSlide = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    });

    // Initialize first slide
    showSlide(currentSlide);
});