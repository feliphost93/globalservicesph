// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== VARIABLES =====
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('header');
    const backToTopButton = document.getElementById('back-to-top');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('#navbar ul li a');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    // ===== FUNCTIONS =====
    
    // Toggle mobile menu
    function toggleMenu() {
        navbar.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Close mobile menu
    function closeMenu() {
        navbar.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    // Scroll event handler
    function handleScroll() {
        // Header shadow on scroll
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Update active menu link based on scroll position
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Image slider functionality
    function setupSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Function to show next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Set up click event for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                // Restart automatic slideshow
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
        
        // Start automatic slideshow
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Services Tab Navigation
    function setupServicesTabs() {
        const serviceTabs = document.querySelectorAll('.service-tab');
        const serviceContents = document.querySelectorAll('.service-content');
        
        if (serviceTabs.length === 0 || serviceContents.length === 0) return;
        
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                serviceTabs.forEach(t => t.classList.remove('active'));
                serviceContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const serviceId = tab.getAttribute('data-service');
                const serviceContent = document.getElementById(serviceId);
                if (serviceContent) {
                    serviceContent.classList.add('active');
                }
            });
        });
    }
    
    // Products functionality
    function setupProducts() {
        // Product category filtering
        const categoryButtons = document.querySelectorAll('.category-button');
        const productSlides = document.querySelectorAll('.product-slide');
        
        if (categoryButtons.length === 0 || productSlides.length === 0) return;
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter products
                const category = button.getAttribute('data-category');
                
                if (category === 'all') {
                    // Show all products
                    productSlides.forEach(slide => {
                        slide.style.display = 'block';
                    });
                } else {
                    // Show only products from selected category
                    productSlides.forEach(slide => {
                        if (slide.getAttribute('data-category') === category) {
                            slide.style.display = 'block';
                        } else {
                            slide.style.display = 'none';
                        }
                    });
                }
                
                // Reset slider position
                productsSlider.style.transform = 'translateX(0)';
                currentSlideIndex = 0;
                updateProductPagination();
            });
        });
        
        // Products slider
        const productsSlider = document.querySelector('.products-slider');
        const prevButton = document.querySelector('.product-slider-control.prev');
        const nextButton = document.querySelector('.product-slider-control.next');
        const paginationDots = document.querySelectorAll('.pagination-dot');
        
        if (!productsSlider || !prevButton || !nextButton || paginationDots.length === 0) return;
        
        let currentSlideIndex = 0;
        const slidesPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
        const visibleSlides = Array.from(productSlides).filter(slide => slide.style.display !== 'none');
        const totalSlides = visibleSlides.length;
        const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
        
        function updateProductPagination() {
            paginationDots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentSlideIndex) {
                    dot.classList.add('active');
                }
                
                // Hide pagination dots if there are more dots than pages
                if (index <= maxIndex) {
                    dot.style.display = 'block';
                } else {
                    dot.style.display = 'none';
                }
            });
        }
        
        function slideProducts(direction) {
            // Calculate new index
            if (direction === 'next') {
                currentSlideIndex = (currentSlideIndex + 1) > maxIndex ? 0 : currentSlideIndex + 1;
            } else {
                currentSlideIndex = (currentSlideIndex - 1) < 0 ? maxIndex : currentSlideIndex - 1;
            }
            
            // Slide to new position
            const slideWidth = document.querySelector('.product-slide').offsetWidth + 20; // 20px is the gap
            productsSlider.style.transform = `translateX(-${currentSlideIndex * slideWidth * slidesPerView}px)`;
            
            // Update pagination
            updateProductPagination();
        }
        
        // Set up click events for buttons
        prevButton.addEventListener('click', () => slideProducts('prev'));
        nextButton.addEventListener('click', () => slideProducts('next'));
        
        // Set up click events for pagination dots
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideIndex = index;
                const slideWidth = document.querySelector('.product-slide').offsetWidth + 20;
                productsSlider.style.transform = `translateX(-${currentSlideIndex * slideWidth * slidesPerView}px)`;
                updateProductPagination();
            });
        });
        
        // Initialize pagination
        updateProductPagination();
        
        // Add responsive handling
        window.addEventListener('resize', () => {
            const newSlidesPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
            
            if (newSlidesPerView !== slidesPerView) {
                // Reset slider position and update variables
                productsSlider.style.transform = 'translateX(0)';
                currentSlideIndex = 0;
                updateProductPagination();
            }
        });
    }
    
    // Form submission handler
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        console.log("AQUI ENTRO CORRECTAMENTE.")
        // Send form data using fetch API
        fetch('/php/contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message
                formMessage.style.display = 'block';
                formMessage.className = 'success';
                formMessage.textContent = data.message;
                // Reset form
                contactForm.reset();
            } else {
                // Show error message
                formMessage.style.display = 'block';
                formMessage.className = 'error';
                formMessage.textContent = data.message;
            }
        })
        .catch(error => {
            // Show error message
            formMessage.style.display = 'block';
            formMessage.className = 'error';
            formMessage.textContent = 'An error occurred. Please try again later.';
            console.error('Error:', error);
        });
    }
    
    // Smooth scroll for anchor links
    function setupSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu when a link is clicked
                closeMenu();
                
                // Get the target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Scroll to target section
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    
    // Initialize all functions
    function init() {
        // Event listeners
        hamburger.addEventListener('click', toggleMenu);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', closeMenu);
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Form submissions
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        const subscribeForm = document.getElementById('subscribeForm');
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', handleSubscribeFormSubmit);
        }
        
        // Setup smooth scroll
        setupSmoothScroll();
        
        // Setup slider
        setupSlider();
        
        // Setup services tabs
        setupServicesTabs();
        
        // Setup products slider and filtering
        setupProducts();
        
        // Initial call to set the correct state
        handleScroll();
        
        // Add animation to product cards on scroll
        const productCards = document.querySelectorAll('.product-card.animated');
        if (productCards.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }
                });
            }, { threshold: 0.1 });
            
            productCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
        }
    }
    
    // Initialize
    init();
});
