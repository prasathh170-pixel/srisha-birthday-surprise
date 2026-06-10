const surpriseBtn = document.getElementById('surpriseBtn');
const wishCard = document.getElementById('wish-card');

surpriseBtn.addEventListener('click', () => {
    wishCard.classList.add('show-card');
    surpriseBtn.style.display = 'none';
    wishCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
});