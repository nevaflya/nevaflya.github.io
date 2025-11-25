document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.profile-container');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    function createParticle(parent) {
        const particle = document.createElement('div');
        particle.classList.add('ender-particle');
        
        // Случайная позиция
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Случайная задержка анимации
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        parent.appendChild(particle);
    }
    
    // Анимация появления элементов
    const cards = document.querySelectorAll('.info-card, .quote, .social-link');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});