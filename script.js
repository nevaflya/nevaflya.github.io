// Основной загрузчик
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Mystical Interface...');
    
    // Загружаем модули
    loadModules();
});

async function loadModules() {
    try {
        // Загружаем модули по очереди
        await loadModule('effects');
        await loadModule('console');
        await loadModule('interactions');
        await loadModule('easter-egg');
        
        console.log('All modules loaded successfully');
        
        // Инициализируем
        initSystems();
        
    } catch (error) {
        console.error('Error loading modules:', error);
        // Fallback - базовые функции
        initBasicFunctions();
    }
}

function loadModule(moduleName) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `modules/${moduleName}.js`;
        script.onload = () => {
            console.log(`Module ${moduleName} loaded`);
            resolve();
        };
        script.onerror = () => {
            console.warn(`Module ${moduleName} failed to load`);
            reject();
        };
        document.head.appendChild(script);
    });
}

function initSystems() {
    // Инициализируем системы, если они доступны
    if (typeof initEffects === 'function') initEffects();
    if (typeof initConsole === 'function') initConsole();
    if (typeof initInteractions === 'function') initInteractions();
    if (typeof initEasterEgg === 'function') initEasterEgg();
}

function initBasicFunctions() {
    // Базовая функциональность
    console.log('Running in basic mode');
    
    // Базовые эффекты
    initSimpleEffects();
    initSimpleConsole();
    initSimpleInteractions();
}

// Базовые функции
function initSimpleEffects() {
    // Простые эффекты
    const cards = document.querySelectorAll('.info-card, .social-portal, .quote-matrix');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function initSimpleConsole() {
    const consoleOutput = document.querySelector('.console-output');
    if (consoleOutput) {
        const messages = [
            "> System initialized",
            "> User: Mistya",
            "> Status: Online"
        ];
        
        messages.forEach((msg, i) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'console-line';
                line.textContent = msg;
                consoleOutput.appendChild(line);
            }, i * 500);
        });
    }
}

function initSimpleInteractions() {
    // Простые взаимодействия
    const socialLinks = document.querySelectorAll('.social-orb');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Технологии
    const techOrbs = document.querySelectorAll('.tech-orb');
    techOrbs.forEach(orb => {
        orb.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
        });
        orb.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Простая змейка
function initSimpleSnake() {
    const header = document.querySelector('.header h1');
    const gameContainer = document.getElementById('snakeGame');
    const closeButton = document.getElementById('closeSnake');
    
    if (header && gameContainer && closeButton) {
        header.addEventListener('click', function() {
            gameContainer.style.display = 'flex';
            alert('Easter egg loaded!');
        });
        
        closeButton.addEventListener('click', function() {
            gameContainer.style.display = 'none';
        });
    }
}
