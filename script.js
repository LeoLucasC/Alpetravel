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