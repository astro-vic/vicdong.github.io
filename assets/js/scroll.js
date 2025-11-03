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
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});