
// Add interactive functionality to the heading words
document.addEventListener('DOMContentLoaded', function() {
    const words = document.querySelectorAll('.word');
    
    // Add click animation to words
    words.forEach(word => {
        word.addEventListener('click', function() {
            // Add a pulse effect on click
            this.style.transform = 'scale(1.2)';
            this.style.color = '#fab1a0';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.color = '';
            }, 200);
        });
        
        // Add mouse enter effect with slight delay for smoother animation
        word.addEventListener('mouseenter', function() {
            // Create a ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.background = 'radial-gradient(circle, rgba(255,234,167,0.3) 0%, transparent 70%)';
            ripple.style.top = '0';
            ripple.style.left = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '-1';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add scroll-triggered animations for stat cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe stat cards for scroll animations
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add sparkle effect on stat card hover
    const statCardsForSparkle = document.querySelectorAll('.stat-card');
    statCardsForSparkle.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
    
    function createSparkles(element) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                sparkle.style.fontSize = '12px';
                sparkle.style.animation = 'sparkle 1s ease-out forwards';
                
                const rect = element.getBoundingClientRect();
                sparkle.style.left = Math.random() * rect.width + rect.left + 'px';
                sparkle.style.top = Math.random() * rect.height + rect.top + 'px';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
            }, i * 100);
        }
    }
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console log for debugging
console.log('Interactive homepage loaded successfully!');
