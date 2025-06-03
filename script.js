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


// Carrusel de imágenes de las promociones 


document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los elementos del carrusel
    const slides = document.querySelectorAll('.carousel-item');
    const carouselInner = document.querySelector('.carousel-inner');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Verificar si el carrusel y las imágenes existen
    if (!carouselInner || totalSlides === 0) {
        console.error('No se encontró el carrusel o no hay imágenes.');
        return;
    }

    // Asegurarse de que las imágenes estén cargadas antes de iniciar el carrusel
    let imagesLoaded = 0;
    slides.forEach(slide => {
        if (slide.complete) {
            imagesLoaded++;
        } else {
            slide.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === totalSlides) {
                    initializeCarousel();
                }
            });
            slide.addEventListener('error', () => {
                console.error(`Error al cargar imagen: ${slide.src}`);
            });
        }
    });

    // Si todas las imágenes ya están cargadas, inicializar de inmediato
    if (imagesLoaded === totalSlides) {
        initializeCarousel();
    }

    function initializeCarousel() {
        // Ajustar el ancho del contenedor según el número de imágenes
        carouselInner.style.width = `${totalSlides * 100}%`;

        // Ajustar el ancho de cada imagen
        slides.forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
        });

        // Mostrar el primer slide
        showSlide(currentSlide);

        // Iniciar el carrusel automático
        setInterval(autoSlide, 3000);
    }

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Asegurarse de que el índice esté dentro de los límites
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Desplazar el carrusel
        const offset = -currentSlide * (100 / totalSlides);
        carouselInner.style.transform = `translateX(${offset}%)`;

        // Actualizar la clase 'active'
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
    }

    // Función para pasar al siguiente slide automáticamente
    function autoSlide() {
        showSlide(currentSlide + 1);
    }
});

// Carrusel de imágenes de HOTELES



document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 1; // Empezar con el slide central
    let autoSlideInterval;

    // Ajustar el ancho de los slides
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });

    // Función para actualizar las clases de los slides
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('center', 'left', 'right');
            
            if (index === currentIndex) {
                slide.classList.add('center');
            } else if (index < currentIndex) {
                slide.classList.add('left');
            } else {
                slide.classList.add('right');
            }
        });
    }

    // Función para mover el carrusel
    function moveToSlide(targetIndex) {
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;

        currentIndex = targetIndex;
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex - (window.innerWidth / 2 - slideWidth / 2)) + 'px)';
        
        updateSlides();
    }

    // Función para mover al siguiente slide
    function nextSlide() {
        moveToSlide(currentIndex + 1);
    }

    // Función para mover al slide anterior
    function prevSlide() {
        moveToSlide(currentIndex - 1);
    }

    // Iniciar carrusel automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    // Detener carrusel automático
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners para los botones
    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Inicializar
    updateSlides();
    moveToSlide(1); // Empezar con el slide central
    startAutoSlide();

    // Pausar el carrusel al pasar el mouse
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    // Ajustar en redimensionamiento
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = newSlideWidth * index + 'px';
        });
        moveToSlide(currentIndex);
    });
});