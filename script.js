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
        });