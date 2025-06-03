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


document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuButton.addEventListener('click', () => {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });
});


// ESTE ES DEL CARRUSEL DE IMÁGENES 


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado, iniciando carrusel');

    const slides = document.querySelectorAll('.carousel-slide');
    console.log(`Se encontraron ${slides.length} diapositivas`);

    const dots = document.querySelectorAll('.dot');
    console.log(`Se encontraron ${dots.length} puntos de navegación`);

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        console.log(`Intentando mostrar diapositiva con índice: ${index}`);
        currentSlide = (index + totalSlides) % totalSlides;
        console.log(`Índice actual ajustado a: ${currentSlide}`);

        const slidesContainer = document.querySelector('.carousel-slides');
        if (slidesContainer) {
            console.log('Contenedor de diapositivas encontrado, aplicando transformación');
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        } else {
            console.error('Error: No se encontró el contenedor .carousel-slides');
        }

        slides.forEach((slide, i) => {
            const isActive = i === currentSlide;
            slide.classList.toggle('active', isActive);
            console.log(`Diapositiva ${i} está ${isActive ? 'activa' : 'inactiva'}`);
        });

        dots.forEach((dot, i) => {
            const isActive = i === currentSlide;
            dot.classList.toggle('active', isActive);
            console.log(`Punto ${i} está ${isActive ? 'activo' : 'inactivo'}`);
        });
    }

    let autoSlide = setInterval(() => {
        console.log('Cambiando a la siguiente diapositiva automáticamente');
        showSlide(currentSlide + 1);
    }, 5000);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            console.log(`Click detectado en el punto con data-slide: ${dot.dataset.slide}`);
            clearInterval(autoSlide);
            console.log('Auto-slide pausado');
            showSlide(parseInt(dot.dataset.slide));
            console.log('Auto-slide reanudado después de 5 segundos');
            autoSlide = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    });

    console.log('Inicializando primera diapositiva');
    showSlide(currentSlide);
});