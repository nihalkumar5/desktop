document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const modal = document.getElementById('surprise-modal');
    const closeBtn = document.getElementById('close-modal');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const heartContainer = document.getElementById('heart-container');

    // Music Logic
    let musicStarted = false;
    function startMusic() {
        if (!musicStarted) {
            bgMusic.play().catch(() => {});
            musicBtn.classList.add('playing');
            musicStarted = true;
        }
    }
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) { bgMusic.play(); musicBtn.classList.add('playing'); }
        else { bgMusic.pause(); musicBtn.classList.remove('playing'); }
    });
    document.body.addEventListener('click', startMusic, { once: true });

    // --- TEASE LOGIC: No Button Runaway ---
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });

    function moveButton() {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }

    // --- SURPRISE LOGIC ---
    yesBtn.addEventListener('click', () => {
        modal.classList.add('show');
        startSurprise();
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-5vh';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }

    function createLoveText() {
        const text = document.createElement('div');
        text.classList.add('love-text');
        text.innerHTML = 'I Love You Infinity ❤️';
        text.style.left = Math.random() * 70 + 15 + 'vw';
        text.style.top = Math.random() * 70 + 15 + 'vh';
        document.body.appendChild(text);
        setTimeout(() => text.remove(), 2000);
    }

    function startSurprise() {
        // Continuous burst
        const interval = setInterval(() => {
            if (!modal.classList.contains('show')) {
                clearInterval(interval);
                return;
            }
            createHeart();
            createLoveText();
        }, 200);
    }
});
