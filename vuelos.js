document.addEventListener('DOMContentLoaded', function() {
    // Tabs functionality
    const tabs = document.querySelectorAll('.search-tabs button');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar/ocultar campos según el tipo de vuelo seleccionado
            const returnField = document.getElementById('return').parentElement;
            if (this.textContent === 'Solo ida') {
                returnField.style.display = 'none';
            } else {
                returnField.style.display = 'block';
            }
        });
    });
    
    // Date picker restrictions
    const today = new Date();
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    
    // Establecer fecha mínima como hoy
    departureInput.min = today.toISOString().split('T')[0];
    
    // Actualizar fecha mínima de vuelta cuando cambia la de ida
    departureInput.addEventListener('change', function() {
        returnInput.min = this.value;
        
        // Si la fecha de vuelta es anterior a la de ida, resetear
        if (returnInput.value && returnInput.value < this.value) {
            returnInput.value = '';
        }
    });
    
    // Form submission
    const flightForm = document.querySelector('.flight-search-form');
    
    if (flightForm) {
        flightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const origin = document.getElementById('origin').value.trim();
            const destination = document.getElementById('destination').value.trim();
            const departure = document.getElementById('departure').value;
            
            if (!origin || !destination || !departure) {
                alert('Por favor complete los campos requeridos');
                return;
            }
            
            // Mostrar mensaje de búsqueda
            const searchBtn = this.querySelector('button[type="submit"]');
            const originalText = searchBtn.innerHTML;
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
            searchBtn.disabled = true;
            
            // Simular búsqueda (en producción sería una llamada AJAX)
            setTimeout(() => {
                alert('Redirigiendo a resultados de búsqueda...');
                searchBtn.innerHTML = originalText;
                searchBtn.disabled = false;
                // Aquí iría la redirección real a la página de resultados
            }, 1500);
        });
    }
    
    // Efecto hover para las tarjetas de destino
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.btn-small').style.backgroundColor = var(--secondary-color);
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.btn-small').style.backgroundColor = var(--primary-color);
        });
    });
});