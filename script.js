// Создание частиц Эндера
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

    // Инициализация пасхалки со змейкой
    initSnakeEasterEgg();
});

// Пасхалка со змейкой
function initSnakeEasterEgg() {
    const header = document.querySelector('.header h1');
    const gameContainer = document.getElementById('snakeGame');
    const closeButton = document.getElementById('closeSnake');
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    
    let snake = [];
    let food = {};
    let direction = 'right';
    let gameLoop;
    let score = 0;
    
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
        
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(updateGame, 150);
    }
    
    // Генерация еды
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
        
        // Проверяем, чтобы еда не появилась на змейке
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                generateFood();
                break;
            }
        }
    }
    
    // Основной игровой цикл
    function updateGame() {
        // Двигаем змейку
        const head = {...snake[0]};
        
        switch(direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        // Проверка столкновения со стеной
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            gameOver();
            return;
        }
        
        // Проверка столкновения с собой
        for (let segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                gameOver();
                return;
            }
        }
        
        snake.unshift(head);
        
        // Проверка съедания еды
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            generateFood();
        } else {
            snake.pop();
        }
        
        drawGame();
    }
    
    // Отрисовка игры
    function drawGame() {
        // Очистка canvas
        ctx.fillStyle = '#1a0b2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Отрисовка змейки
        ctx.fillStyle = '#8a2be2';
        for (let segment of snake) {
            ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
        }
        
        // Отрисовка еды
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
        
        // Отрисовка счета
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText('Счет: ' + score, 10, 20);
    }
    
    function gameOver() {
        clearInterval(gameLoop);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = '24px Arial';
        ctx.fillText('Игра окончена!', 120, 180);
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Arial';
        ctx.fillText('Счет: ' + score, 170, 210);
    }
    
    // Обработчики событий
    header.style.cursor = 'pointer';
    header.title = 'Нажми для пасхалки!';
    
    header.addEventListener('click', function() {
        gameContainer.style.display = 'flex';
        initGame();
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
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });
}
