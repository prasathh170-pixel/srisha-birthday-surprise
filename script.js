const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const lockCurrentTime = document.getElementById('lock-current-time');
const countdown = document.getElementById('countdown');
const surpriseBtn = document.getElementById('surpriseBtn');
const wishCard = document.getElementById('wish-card');

const targetDate = new Date('2026-06-19T00:00:00');

const formatDateTime = (date) => date.toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
});

const pad = (value) => String(value).padStart(2, '0');

const updateLockScreen = () => {
    if (!lockCurrentTime) return;
    lockCurrentTime.textContent = `Current time: ${formatDateTime(new Date())}`;

    const diff = targetDate - new Date();
    if (diff <= 0) {
        if (lockScreen) lockScreen.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
        if (countdown) countdown.textContent = 'The website is now open!';
        return;
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (countdown) {
        countdown.textContent = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s until June 19 at 12:00 AM`;
    }
};

updateLockScreen();
setInterval(updateLockScreen, 1000);

if (surpriseBtn && wishCard) {
    const reveal = (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        wishCard.classList.add('show-card');
        wishCard.setAttribute('aria-hidden', 'false');
        surpriseBtn.setAttribute('aria-expanded', 'true');
        surpriseBtn.style.display = 'none';
        // remove listeners to avoid double-trigger
        surpriseBtn.removeEventListener('click', reveal);
        surpriseBtn.removeEventListener('touchstart', reveal);
        surpriseBtn.removeEventListener('pointerdown', reveal);
        wishCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    surpriseBtn.addEventListener('click', reveal);
    surpriseBtn.addEventListener('touchstart', reveal, { passive: true });
    surpriseBtn.addEventListener('pointerdown', reveal);
}