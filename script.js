// ========================================
// Smooth Scroll Behavior
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// Game Tile Hover Effects
// ========================================
// Tilt effect removed - CSS handles the hover animation now

// ========================================
// Lazy Loading for Images/GIFs
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ========================================
// Scroll Animations for Gallery Items
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger the animation
            }
        });
    }, {
        threshold: 0.1
    });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        scrollObserver.observe(item);
    });
});

// ========================================
// Optional: UI Sound Effects
// ========================================
class SoundManager {
    constructor() {
        this.enabled = false; // Disabled by default
        this.sounds = {
            hover: this.createBeep(600, 0.05, 0.1),
            click: this.createBeep(800, 0.08, 0.15)
        };
    }
    
    createBeep(frequency, duration, volume) {
        return () => {
            if (!this.enabled) return;
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        };
    }
    
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

const soundManager = new SoundManager();

// Add sound effects to game tiles
document.addEventListener('DOMContentLoaded', function() {
    const gameTiles = document.querySelectorAll('.game-tile');
    const navLinks = document.querySelectorAll('.nav-link');
    
    gameTiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => soundManager.sounds.hover());
        tile.addEventListener('click', () => soundManager.sounds.click());
    });
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => soundManager.sounds.hover());
        link.addEventListener('click', () => soundManager.sounds.click());
    });
});

// ========================================
// Navigation Active State Handler
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Back Button Navigation
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            // If there's history, go back, otherwise go to home
            if (window.history.length > 1) {
                e.preventDefault();
                window.history.back();
            }
        });
    }
});

// ========================================
// Parallax Effect for Hero Section
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
});

// ========================================
// Easter Egg: Konami Code
// ========================================
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        document.body.style.filter = 'hue-rotate(180deg)';
        soundManager.toggle();
        
        // Show a message
        const message = document.createElement('div');
        message.textContent = '🎮 Debug Mode Activated! 🎮';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(33, 150, 243, 0.95);
            color: white;
            padding: 2rem 3rem;
            border-radius: 16px;
            font-size: 24px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        // Reset after 10 seconds
        setTimeout(() => {
            document.body.style.filter = '';
        }, 10000);
    }
})();

// ========================================
// Keyboard Navigation for Game Tiles
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const gameTiles = Array.from(document.querySelectorAll('.game-tile'));
    let focusedIndex = -1;
    
    document.addEventListener('keydown', (e) => {
        if (!gameTiles.length) return;
        
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                focusedIndex = (focusedIndex + 1) % gameTiles.length;
                gameTiles[focusedIndex].focus();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                focusedIndex = (focusedIndex - 1 + gameTiles.length) % gameTiles.length;
                gameTiles[focusedIndex].focus();
                break;
            case 'Enter':
                if (focusedIndex >= 0) {
                    gameTiles[focusedIndex].click();
                }
                break;
        }
    });
});

// ========================================
// Smooth Page Transitions
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation on page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add fade-out animation on navigation
    const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="game.html"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const href = this.href;
                
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

console.log('🎮 Portfolio loaded successfully!');
console.log('💡 Tip: Try the Konami Code for a surprise! (↑↑↓↓←→←→BA)');
