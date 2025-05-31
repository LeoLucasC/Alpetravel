document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Search tabs functionality
    const searchTabs = document.querySelectorAll('.search-tabs button');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Auto-sliding for offers
    const offerSlider = document.querySelector('.offer-slider');
    if (offerSlider) {
        let scrollAmount = 0;
        const scrollStep = 330; // Width of card + gap
        
        function autoScroll() {
            scrollAmount += scrollStep;
            
            // Reset if at end
            if (scrollAmount > offerSlider.scrollWidth - offerSlider.clientWidth) {
                scrollAmount = 0;
            }
            
            offerSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        
        setInterval(autoScroll, 3000);
    }
    
    // Form submission handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por tu interés. En una implementación real, esto enviaría los datos al servidor.');
        });
    });
});

// Manejar la clase active en el menú
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ESTE ES DEL CARRUSEL DE IMÁGENES 


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