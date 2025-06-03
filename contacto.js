document.addEventListener('DOMContentLoaded', function() {
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor complete todos los campos requeridos');
                return;
            }
            
            // Mostrar mensaje de enviando
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío (en producción esto enviaría realmente)
            setTimeout(() => {
                // Aquí iría el código real de envío del formulario
                // Para este ejemplo, mostramos un mensaje de éxito
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Efecto para los números de teléfono
    const phoneLinks = document.querySelectorAll('.phone-numbers a');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Animación al hacer clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // En un dispositivo móvil, esto abrirá la app de teléfono
            // En desktop, mostrará un mensaje
            if (!/Mobi|Android/i.test(navigator.userAgent)) {
                e.preventDefault();
                alert(`Llamar a: ${this.textContent.trim()}`);
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuButton.addEventListener('click', () => {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });
});