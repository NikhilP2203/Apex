/**
 * Apex Field Solutions - Custom JavaScript
 */

document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 75, // Account for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav item highlighting based on scroll
    const sections = document.querySelectorAll('section[id], div[id]:not(.carousel)');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');
    
    function highlightNavItem() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    
    // Form validation and submission
    const contactForm = document.forms['submit-to-google-sheet'];
    if (contactForm) {
        const msg = document.getElementById('msg');
        const scriptURL = ''; // Add your Google Script URL here
        
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            
            // Basic form validation
            const requiredInputs = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                msg.innerHTML = '<div class="alert alert-warning">Please fill all required fields.</div>';
                return;
            }
            
            // Show loading indicator
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            submitBtn.disabled = true;
            
            // Submit the form
            fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
                .then(response => {
                    msg.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
                    contactForm.reset();
                    setTimeout(function() {
                        msg.innerHTML = '';
                    }, 5000);
                })
                .catch(error => {
                    msg.innerHTML = '<div class="alert alert-danger">Error! Please try again.</div>';
                })
                .finally(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Add specific animations to services on hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            icon.classList.add('fa-bounce');
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            icon.classList.remove('fa-bounce');
        });
    });
}); 