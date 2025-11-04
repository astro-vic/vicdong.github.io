document.addEventListener('DOMContentLoaded', function() {
    // Get all sections and navigation links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.site-nav a');
    
    // Function to update active navigation link
    function updateActiveLink() {
        const currentScrollPos = window.pageYOffset + 100; // Offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (currentScrollPos >= sectionTop && currentScrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const correspondingLink = document.querySelector(`.site-nav a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveLink);
    
    // Add smooth scroll behavior to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for internal anchor links (starting with #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (like CV), let the default behavior occur
        });
    });
});

// Slideshow functionality for outreach presentations
let slideIndices = {};

function initializeSlideshow(slideshowId) {
    slideIndices[slideshowId] = 1;
    showSlide(slideshowId, slideIndices[slideshowId]);
}

function changeSlide(slideshowId, n) {
    showSlide(slideshowId, slideIndices[slideshowId] += n);
}

function currentSlide(slideshowId, n) {
    showSlide(slideshowId, slideIndices[slideshowId] = n);
}

function showSlide(slideshowId, n) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;
    
    const slides = slideshow.getElementsByClassName("outreach-slide");
    const dots = slideshow.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndices[slideshowId] = 1; }
    if (n < 1) { slideIndices[slideshowId] = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    if (slides[slideIndices[slideshowId] - 1]) {
        slides[slideIndices[slideshowId] - 1].classList.add("active");
    }
    
    if (dots[slideIndices[slideshowId] - 1]) {
        dots[slideIndices[slideshowId] - 1].classList.add("active");
    }
}

// Auto-initialize slideshows when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all slideshows
    const slideshows = document.querySelectorAll('.slideshow-container');
    slideshows.forEach(slideshow => {
        initializeSlideshow(slideshow.id);
    });
    
    // Optional: Auto-advance slides every 8 seconds
    setInterval(() => {
        Object.keys(slideIndices).forEach(slideshowId => {
            changeSlide(slideshowId, 1);
        });
    }, 8000);
});