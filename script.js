document.addEventListener('DOMContentLoaded', () => {
    const loveBtn = document.getElementById('love-btn');
    const heartContainer = document.getElementById('heart-container');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        
        // Random position
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-5vh';
        
        // Random size
        const size = Math.random() * 20 + 10 + 'px';
        heart.style.fontSize = size;
        
        // Random duration
        const duration = Math.random() * 3 + 2 + 's';
        heart.style.animationDuration = duration;
        
        heartContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, parseFloat(duration) * 1000);
    }

    loveBtn.addEventListener('click', () => {
        // Create multiple hearts
        for (let i = 0; i < 30; i++) {
            setTimeout(createHeart, i * 100);
        }
    });

    // Auto-create hearts occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            createHeart();
        }
    }, 2000);

    // Scroll reveal logic (subtle)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .memory-card, .note-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Custom visible class for observer
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
