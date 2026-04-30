document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surprise-btn');
    const heartContainer = document.getElementById('heart-container');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let musicStarted = false;

    // --- LOVE COUNTER LOGIC ---
    // Change this date to when you first met or started dating
    const startDate = new Date('2023-01-01T00:00:00'); 

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCounter, 1000);
    updateCounter();

    // --- MUSIC LOGIC ---
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

    document.body.addEventListener('click', startMusic, { once: true });

    // --- SURPRISE ANIMATION ---
    function createLoveText() {
        const text = document.createElement('div');
        text.classList.add('love-text');
        text.innerHTML = 'I Love You ❤️';
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        text.style.left = x + 'vw';
        text.style.top = y + 'vh';
        const fontSize = Math.random() * 1.5 + 1 + 'rem';
        text.style.fontSize = fontSize;
        text.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        document.body.appendChild(text);
        setTimeout(() => text.remove(), 2000);
    }

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

    surpriseBtn.addEventListener('click', () => {
        surpriseBtn.innerHTML = 'Infinity Love! <i class="fa-solid fa-heart"></i>';
        let count = 0;
        const max = 150;
        const interval = setInterval(() => {
            createLoveText();
            createHeart();
            count++;
            if (count >= max) clearInterval(interval);
        }, 50);
    });

    // --- SCROLL REVEAL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card, .timeline-item, .premium-quote').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(style);
});
