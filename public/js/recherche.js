document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const filterGroups = document.querySelectorAll('.filter-group');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-by');
    const ratingStars = document.querySelectorAll('.stars i');
    const priceSlider = document.getElementById('price-slider');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const carCards = document.querySelectorAll('.car-card');
    const resultsCount = document.querySelector('.results-count');
    const viewToggleBtn = document.querySelector('.view-toggle');
    const carsGrid = document.querySelector('.cars-grid');
    
    // Toggle filter groups
    filterGroups.forEach(group => {
        const header = group.querySelector('.filter-header');
        const content = group.querySelector('.filter-content');
        
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
            header.classList.toggle('active');
        });
    });
    
    // Rating stars functionality
    let currentRating = 4; // Default: 4 stars
    
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            currentRating = rating;
            updateStars(rating);
            document.querySelector('.rating-text').textContent = `${rating} étoiles minimum`;
        });
        
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', () => {
            updateStars(currentRating);
        });
    });
    
    function highlightStars(rating) {
        ratingStars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
    
    function updateStars(rating) {
        highlightStars(rating);
    }
    
    // Price slider functionality
    priceSlider.addEventListener('input', () => {
        const value = priceSlider.value;
        minPriceInput.value = 0;
        maxPriceInput.value = value;
    });
    
    minPriceInput.addEventListener('input', () => {
        if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
            minPriceInput.value = maxPriceInput.value;
        }
    });
    
    maxPriceInput.addEventListener('input', () => {
        if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
            maxPriceInput.value = minPriceInput.value;
        }
        priceSlider.value = maxPriceInput.value;
    });
    
    // Apply filters
    applyFiltersBtn.addEventListener('click', () => {
        const minPrice = parseInt(minPriceInput.value) || 0;
        const maxPrice = parseInt(maxPriceInput.value) || 20000;
        const location = document.getElementById('location').value.toLowerCase();
        
        let visibleCount = 0;
        
        carCards.forEach(card => {
            const price = parseInt(card.getAttribute('data-price'));
            const rating = parseFloat(card.getAttribute('data-rating'));
            const cardLocation = card.querySelector('.car-location span').textContent.toLowerCase();
            
            let isVisible = true;
            
            // Price filter
            if (price < minPrice || price > maxPrice) {
                isVisible = false;
            }
            
            // Rating filter
            if (rating < currentRating) {
                isVisible = false;
            }
            
            // Location filter
            if (location && !cardLocation.includes(location)) {
                isVisible = false;
            }
            
            // Apply visibility
            if (isVisible) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update results count
        resultsCount.textContent = `${visibleCount} voitures disponibles`;
    });
    
    // Reset filters
    resetFiltersBtn.addEventListener('click', () => {
        document.getElementById('location').value = '';
        document.getElementById('radius').selectedIndex = 0;
        document.getElementById('start-date').value = '';
        document.getElementById('end-date').value = '';
        document.getElementById('time-period').selectedIndex = 0;
        minPriceInput.value = '';
        maxPriceInput.value = '';
        priceSlider.value = 10000;
        
        // Reset checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Reset select dropdowns
        document.getElementById('fuel-type').selectedIndex = 0;
        
        // Reset stars
        currentRating = 4;
        updateStars(currentRating);
        document.querySelector('.rating-text').textContent = '4 étoiles minimum';
        
        // Show all cars
        carCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Update results count
        resultsCount.textContent = `${carCards.length} voitures disponibles`;
    });
    
    // Sort functionality
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const cardsArray = Array.from(carCards);
        
        cardsArray.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));
            
            switch (sortValue) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'rating-desc':
                    return ratingB - ratingA;
                default:
                    return 0;
            }
        });
        
        // Re-append sorted cards
        cardsArray.forEach(card => {
            carsGrid.appendChild(card);
        });
    });
    
    // View toggle functionality
    viewToggleBtn.addEventListener('click', () => {
        carsGrid.classList.toggle('list-view');
        
        if (carsGrid.classList.contains('list-view')) {
            viewToggleBtn.innerHTML = '<i class="fas fa-th"></i>';
        } else {
            viewToggleBtn.innerHTML = '<i class="fas fa-th-list"></i>';
        }
    });
    
    // Initialize
    updateStars(currentRating);
});