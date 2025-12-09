// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing dimensional interface...');
    
    // Инициализация всех систем
    initStarfield();
    initAnimations();
    initConsole();
    initHoverEffects();
    initEasterEgg();
    initScrollEffects();
    initAudio();
});

// Создание звёздного поля
function initStarfield() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        createStar(starsContainer);
    }
}

function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Случайные параметры
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    
    // Стилизация
    star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        opacity: ${Math.random() * 0.7 + 0.3};
        animation: twinkleStar ${duration}s infinite ${delay}s;
        box-shadow: 0 0 ${size * 2}px white;
    `;
    
    container.appendChild(star);
}

// Анимации элементов
function initAnimations() {
    // Парящие элементы
    const floatingElements = document.querySelectorAll('.hologram-icon, .language-cube');
    
    floatingElements.forEach((el, index) => {
        el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Появление карточек
    const cards = document.querySelectorAll('.info-card, .social-portal, .quote-matrix');
    
    cards.forEach((card, index) => {
        card.classList.add('scroll-effect');
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s, transform 0.8s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + index * 200);
    });
}

// Консольный вывод
function initConsole() {
    const consoleOutput = document.querySelector('.console-output');
    const messages = [
        "> Welcome to the dimensional interface",
        "> System boot complete",
        "> Quantum entanglement established",
        "> User identity: MISTYA verified",
        "> Security level: MAXIMUM",
        "> Energy signature: STABLE",
        "> Portal integrity: 100%",
        "> Ready for interdimensional communication"
    ];
    
    // Очистка и добавление сообщений
    consoleOutput.innerHTML = '';
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.textContent = message;
            consoleOutput.appendChild(line);
            
            // Прокрутка вниз
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }, index * 800);
    });
    
    // Добавляем мигающий курсор
    setTimeout(() => {
        const cursor = document.createElement('div');
        cursor.className = 'console-line blink';
        cursor.textContent = '> _';
        consoleOutput.appendChild(cursor);
    }, messages.length * 800);
}

// Эффекты при наведении
function initHoverEffects() {
    // Эффект для социальных сфер
    const socialOrbs = document.querySelectorAll('.social-orb');
    
    socialOrbs.forEach(orb => {
        orb.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                showTooltip(this, tooltip);
            }
            
            // Создаем частицы
            createParticles(this);
        });
        
        orb.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
    
    // Эффект для кубов языков
    const languageCubes = document.querySelectorAll('.language-cube');
    
    languageCubes.forEach(cube => {
        cube.addEventListener('mouseenter', function() {
            const language = this.getAttribute('data-language');
            highlightLanguage(language);
        });
    });
}

function showTooltip(element, text) {
    let tooltip = document.querySelector('.custom-tooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        document.body.appendChild(tooltip);
    }
    
    const rect = element.getBoundingClientRect();
    
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.9);
        color: #00ffff;
        padding: 8px 12px;
        border-radius: 6px;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.8rem;
        z-index: 10000;
        border: 1px solid #00ffff;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top - 40}px;
        transform: translateX(-50%);
        white-space: nowrap;
        pointer-events: none;
    `;
    
    tooltip.style.opacity = '1';
}

function hideTooltip() {
    const tooltip = document.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }
}

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 0.5 + 0.3;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, #00ffff, #8a2be2);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            z-index: 9999;
            pointer-events: none;
            animation: particleOut ${duration}s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Анимация частицы
        setTimeout(() => {
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            particle.style.transform = `translate(${endX}px, ${endY}px)`;
            particle.style.opacity = '0';
        }, 10);
        
        // Удаление частицы после анимации
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}

// Подсветка языка программирования
function highlightLanguage(language) {
    const energyBar = document.querySelector('.energy-fill');
    const energyText = document.querySelector('.energy-text');
    
    // Временное изменение энергии
    const originalWidth = energyBar.style.width;
    const originalText = energyText.textContent;
    
    energyBar.style.width = `${Math.random() * 30 + 70}%`;
    energyBar.style.background = 'linear-gradient(90deg, #ff00ff, #ff8800)';
    energyText.textContent = `ACCESSING: ${language}`;
    
    // Возврат к исходному состоянию
    setTimeout(() => {
        energyBar.style.width = originalWidth;
        energyBar.style.background = 'linear-gradient(90deg, #00ff00, #00ffff, #0088ff)';
        energyText.textContent = originalText;
    }, 1500);
}

// Эффекты при скролле
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами с эффектом скролла
    document.querySelectorAll('.scroll-effect').forEach(el => {
        observer.observe(el);
    });
}

// Аудио эффекты
function initAudio() {
    // Создаем аудио элементы для звуковых эффектов
    const hoverSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
    
    // Эффекты при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('.social-orb, .language-cube, .cyber-button');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Воспроизводим короткий звук (можно заменить на реальный файл)
            try {
                hoverSound.currentTime = 0;
                // hoverSound.play(); // Раскомментировать при наличии звукового файла
            } catch (e) {
                // Игнорируем ошибки аудио
            }
        });
    });
}

// Пасхалка со змейкой
function initEasterEgg() {
    const header = document.querySelector('.header');
    const gameContainer = document.getElementById('snakeGame');
    const closeButton = document.getElementById('closeSnake');
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let gameLoop;
    let score = 0;
    let gameActive = false;
    
    // Инициализация игры
    function initGame() {
        snake = [
            {x: 8, y: 10},
            {x: 7, y: 10},
            {x: 6, y: 10}
        ];
        
        generateFood();
        score = 0;
        direction = 'right';
        nextDirection = 'right';
        gameActive = true;
        
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(updateGame, 120);
    }
    
    // Генерация еды
    function generateFood() {
        do {
            food = {
                x: Math.floor(Math.random() * 25),
                y: Math.floor(Math.random() * 25)
            };
        } while (isOnSnake(food.x, food.y));
    }
    
    function isOnSnake(x, y) {
        return snake.some(segment => segment.x === x && segment.y === y);
    }
    
    // Основной игровой цикл
    function updateGame() {
        if (!gameActive) return;
        
        direction = nextDirection;
        
        // Двигаем змейку
        const head = {...snake[0]};
        
        switch(direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        // Проверка столкновения
        if (head.x < 0 || head.x >= 25 || head.y < 0 || head.y >= 25 || isOnSnake(head.x, head.y)) {
            gameOver();
            return;
        }
        
        snake.unshift(head);
        
        // Проверка съедания еды
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            generateFood();
            createFoodParticles();
        } else {
            snake.pop();
        }
        
        drawGame();
    }
    
    // Отрисовка игры
    function drawGame() {
        // Очистка canvas с градиентом
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0a0a16');
        gradient.addColorStop(1, '#1a0b2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Отрисовка сетки
        ctx.strokeStyle = 'rgba(138, 43, 226, 0.2)';
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= 25; x++) {
            ctx.beginPath();
            ctx.moveTo(x * 20, 0);
            ctx.lineTo(x * 20, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y <= 25; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * 20);
            ctx.lineTo(canvas.width, y * 20);
            ctx.stroke();
        }
        
        // Отрисовка змейки с градиентом
        snake.forEach((segment, index) => {
            const gradient = ctx.createRadialGradient(
                segment.x * 20 + 10,
                segment.y * 20 + 10,
                0,
                segment.x * 20 + 10,
                segment.y * 20 + 10,
                10
            );
            
            if (index === 0) {
                // Голова
                gradient.addColorStop(0, '#00ffff');
                gradient.addColorStop(1, '#0088ff');
            } else {
                // Тело
                const intensity = 1 - (index / snake.length) * 0.7;
                gradient.addColorStop(0, `rgba(138, 43, 226, ${intensity})`);
                gradient.addColorStop(1, `rgba(70, 0, 140, ${intensity * 0.7})`);
            }
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(segment.x * 20 + 10, segment.y * 20 + 10, 9, 0, Math.PI * 2);
            ctx.fill();
            
            // Контур
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
        
        // Отрисовка еды
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(food.x * 20 + 10, food.y * 20 + 10, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Свечение еды
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Отрисовка счета
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Orbitron';
        ctx.fillText(`SCORE: ${score}`, 20, 30);
        
        // Отрисовка управления
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '14px Orbitron';
        ctx.fillText('USE ARROW KEYS', 20, canvas.height - 20);
    }
    
    // Частицы при съедании еды
    function createFoodParticles() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'food-particle';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 50 + 30;
                const size = Math.random() * 6 + 3;
                const duration = Math.random() * 0.8 + 0.4;
                
                const foodX = food.x * 20 + 10;
                const foodY = food.y * 20 + 10;
                const canvasRect = canvas.getBoundingClientRect();
                
                particle.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, #00ff00, #00cc00);
                    border-radius: 50%;
                    left: ${canvasRect.left + foodX}px;
                    top: ${canvasRect.top + foodY}px;
                    z-index: 9999;
                    pointer-events: none;
                    animation: foodParticle ${duration}s ease-out forwards;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    const endX = Math.cos(angle) * distance;
                    const endY = Math.sin(angle) * distance;
                    
                    particle.style.transform = `translate(${endX}px, ${endY}px)`;
                    particle.style.opacity = '0';
                }, 10);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, duration * 1000);
            }, i * 30);
        }
    }
    
    function gameOver() {
        gameActive = false;
        clearInterval(gameLoop);
        
        // Эффект game over
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = 'bold 36px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Orbitron';
        ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, canvas.height / 2);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = '18px Orbitron';
        ctx.fillText('CLICK ANYWHERE TO RESTART', canvas.width / 2, canvas.height / 2 + 40);
    }
    
    // Обработчики событий
    header.addEventListener('click', function(e) {
        if (e.target === header || e.target.closest('h1')) {
            gameContainer.style.display = 'flex';
            initGame();
        }
    });
    
    canvas.addEventListener('click', function() {
        if (!gameActive) {
            initGame();
        }
    });
    
    closeButton.addEventListener('click', function() {
        gameContainer.style.display = 'none';
        if (gameLoop) clearInterval(gameLoop);
    });
    
    // Управление клавишами
    document.addEventListener('keydown', function(e) {
        if (gameContainer.style.display === 'none') return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') nextDirection = 'right';
                break;
        }
    });
    
    // Добавляем CSS для частиц
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleOut {
            to {
                opacity: 0;
            }
        }
        
        @keyframes foodParticle {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx, 0), var(--ty, 0)) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Таймер для динамических изменений
setInterval(() => {
    // Динамическое изменение энергии
    const energyFill = document.querySelector('.energy-fill');
    if (energyFill) {
        const currentWidth = parseFloat(energyFill.style.width) || 89;
        const fluctuation = Math.random() * 4 - 2; // -2 до +2
        const newWidth = Math.max(70, Math.min(95, currentWidth + fluctuation));
        energyFill.style.width = `${newWidth}%`;
        
        // Обновление текста
        const energyText = document.querySelector('.energy-text');
        if (energyText && !energyText.textContent.includes('ACCESSING')) {
            energyText.textContent = `SYSTEM ENERGY: ${Math.round(newWidth)}%`;
        }
    }
}, 5000);

// Добавляем случайные вспышки звёзд
setInterval(() => {
    const stars = document.querySelectorAll('.star');
    if (stars.length > 0) {
        const randomStar = stars[Math.floor(Math.random() * stars.length)];
        randomStar.style.animation = 'none';
        randomStar.style.boxShadow = '0 0 20px white';
        
        setTimeout(() => {
            randomStar.style.animation = '';
            randomStar.style.boxShadow = '';
        }, 300);
    }
}, 2000);
