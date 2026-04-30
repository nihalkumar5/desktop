document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surprise-btn');
    const heartContainer = document.getElementById('heart-container');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let musicStarted = false;

    function startMusic() {
        if (!musicStarted) {
            bgMusic.play().catch(e => console.log("Autoplay blocked"));
            musicBtn.classList.add('playing');
            musicStarted = true;
        }
    }

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('playing');
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        }
    });

    // Start music on first interaction
    document.body.addEventListener('click', startMusic, { once: true });

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-5vh';
        const size = Math.random() * 20 + 10 + 'px';
        heart.style.fontSize = size;
        const duration = Math.random() * 3 + 2 + 's';
        heart.style.animationDuration = duration;
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), parseFloat(duration) * 1000);
    }

    function createLoveText() {
        const text = document.createElement('div');
        text.classList.add('love-text');
        text.innerHTML = 'I Love You ❤️';
        
        // Random positions
        const x = Math.random() * 80 + 10; // Avoid edges
        const y = Math.random() * 80 + 10;
        
        text.style.left = x + 'vw';
        text.style.top = y + 'vh';
        
        // Random size and rotation
        const fontSize = Math.random() * 1.5 + 1 + 'rem';
        text.style.fontSize = fontSize;
        text.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        
        document.body.appendChild(text);

        // Remove after a while
        setTimeout(() => text.remove(), 2000);
    }

    surpriseBtn.addEventListener('click', () => {
        // Change button text
        surpriseBtn.innerHTML = 'Infinity Love! <i class="fa-solid fa-heart"></i>';
        
        // Start filling the screen
        let count = 0;
        const max = 150; // Total "I Love You" messages
        
        const interval = setInterval(() => {
            createLoveText();
            createHeart();
            count++;
            
            if (count >= max) {
                clearInterval(interval);
            }
        }, 50); // Fast spawn
    });

    // Subtitle reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(style);
});
