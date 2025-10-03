document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Handle scroll effect for navbar
    function handleScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        navbar.classList.toggle('scrolled', scrollPosition > 50);
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    }
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize
    handleScroll();
    
    // Gallery Slideshow Functionality - ADD THIS SECTION
    function initGallery() {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.slide-nav.prev');
        const nextBtn = document.querySelector('.slide-nav.next');
        
        // Check if gallery elements exist
        if (slides.length === 0) {
            console.log('No gallery slides found');
            return;
        }
        
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Ensure index is within bounds
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            
            // Add active class to current slide and indicator
            slides[currentSlide].classList.add('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.add('active');
            }
        }
        
        // Function to go to next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Function to go to previous slide
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Start automatic slideshow
        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        // Stop automatic slideshow
        function stopSlideshow() {
            clearInterval(slideInterval);
        }
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                prevSlide();
                stopSlideshow();
                startSlideshow();
            });
        } else {
            console.log('Previous button not found');
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                nextSlide();
                stopSlideshow();
                startSlideshow();
            });
        } else {
            console.log('Next button not found');
        }
        
        // Indicator click events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                showSlide(index);
                stopSlideshow();
                startSlideshow();
            });
        });
        
        // Pause slideshow on hover
        const gallery = document.querySelector('.gallery-slideshow');
        if (gallery) {
            gallery.addEventListener('mouseenter', stopSlideshow);
            gallery.addEventListener('mouseleave', startSlideshow);
        }
        
        // Initialize slideshow
        showSlide(currentSlide);
        startSlideshow();
    }
    
    // Initialize gallery
    initGallery();
});