let cookies = 0;
let cps = 0;
let cursorCount = 0;
let grandmaCount = 0;
let farmCount = 0;
let bakeryCount = 0;
let factoryCount = 0;
let mineCount = 0;
let shipCount = 0;
let rocketCount = 0;
let totalCookiesEarned = 0;

const cursorCostBase = 15;
const grandmaCostBase = 100;
const farmCostBase = 1100;
const bakeryCostBase = 5000;
const factoryCostBase = 10000;
const mineCostBase = 20000;
const shipCostBase = 50000;
const rocketCostBase = 100000;

const achievements = [
    { id: 'firstCookie', name: 'First Cookie', desc: 'Click the cookie once', condition: () => cookies >= 1, bonus: 10, unlocked: false },
    { id: 'cookieBaker', name: 'Cookie Baker', desc: 'Bake 100 cookies', condition: () => cookies >= 100, bonus: 50, unlocked: false },
    { id: 'cursorCollector', name: 'Cursor Collector', desc: 'Buy 10 cursors', condition: () => cursorCount >= 10, bonus: 100, unlocked: false },
    { id: 'grandmaGang', name: 'Grandma Gang', desc: 'Buy 5 grandmas', condition: () => grandmaCount >= 5, bonus: 200, unlocked: false },
    { id: 'farmFrenzy', name: 'Farm Frenzy', desc: 'Buy 3 farms', condition: () => farmCount >= 3, bonus: 500, unlocked: false },
    { id: 'bakeryBoss', name: 'Bakery Boss', desc: 'Buy 2 bakeries', condition: () => bakeryCount >= 2, bonus: 1000, unlocked: false },
    { id: 'factoryTycoon', name: 'Factory Tycoon', desc: 'Buy 1 factory', condition: () => factoryCount >= 1, bonus: 2000, unlocked: false },
    { id: 'mineMaster', name: 'Mine Master', desc: 'Buy 1 mine', condition: () => mineCount >= 1, bonus: 5000, unlocked: false },
    { id: 'shipCaptain', name: 'Ship Captain', desc: 'Buy 1 ship', condition: () => shipCount >= 1, bonus: 10000, unlocked: false },
    { id: 'rocketScientist', name: 'Rocket Scientist', desc: 'Buy 1 rocket', condition: () => rocketCount >= 1, bonus: 50000, unlocked: false }
];

const translations = {
    en: {
        title: 'Cookie Clicker',
        cookies: 'Cookies',
        cps: 'Cookies per second',
        language: 'Language',
        cursor: 'Cursor',
        grandma: 'Grandma',
        farm: 'Farm',
        bakery: 'Bakery',
        factory: 'Factory',
        mine: 'Mine',
        ship: 'Ship',
        rocket: 'Rocket',
        buy: 'Buy',
        feedback: 'Feedback',
        restart: 'Restart Game',
        winMessage: 'Congratulations! You\'ve reached 1 quadrillion cookies!',
        feedbackName: 'Name',
        feedbackEmail: 'Email',
        feedbackMessage: 'Message',
        feedbackSubmit: 'Submit',
        achievements: 'Achievements',
        firstCookie: 'First Cookie',
        firstCookieDesc: 'Click the cookie once',
        cookieBaker: 'Cookie Baker',
        cookieBakerDesc: 'Bake 100 cookies',
        cursorCollector: 'Cursor Collector',
        cursorCollectorDesc: 'Buy 10 cursors',
        grandmaGang: 'Grandma Gang',
        grandmaGangDesc: 'Buy 5 grandmas',
        farmFrenzy: 'Farm Frenzy',
        farmFrenzyDesc: 'Buy 3 farms',
        bakeryBoss: 'Bakery Boss',
        bakeryBossDesc: 'Buy 2 bakeries',
        factoryTycoon: 'Factory Tycoon',
        factoryTycoonDesc: 'Buy 1 factory',
        mineMaster: 'Mine Master',
        mineMasterDesc: 'Buy 1 mine',
        shipCaptain: 'Ship Captain',
        shipCaptainDesc: 'Buy 1 ship',
        rocketScientist: 'Rocket Scientist',
        rocketScientistDesc: 'Buy 1 rocket'
    },
    es: {
        title: 'Clic de Galleta',
        cookies: 'Galletas',
        cps: 'Galletas por segundo',
        language: 'Idioma',
        cursor: 'Cursor',
        grandma: 'Abuela',
        farm: 'Granja',
        bakery: 'Panadería',
        factory: 'Fábrica',
        mine: 'Mina',
        ship: 'Barco',
        rocket: 'Cohete',
        buy: 'Comprar',
        feedback: 'Comentarios',
        restart: 'Reiniciar Juego',
        winMessage: '¡Felicitaciones! ¡Has alcanzado 1 cuatrillón de galletas!',
        feedbackName: 'Nombre',
        feedbackEmail: 'Correo electrónico',
        feedbackMessage: 'Mensaje',
        feedbackSubmit: 'Enviar',
        achievements: 'Logros',
        firstCookie: 'Primera Galleta',
        firstCookieDesc: 'Haz clic en la galleta una vez',
        cookieBaker: 'Panadero de Galletas',
        cookieBakerDesc: 'Hornea 100 galletas',
        cursorCollector: 'Coleccionista de Cursors',
        cursorCollectorDesc: 'Compra 10 cursors',
        grandmaGang: 'Pandilla de Abuelas',
        grandmaGangDesc: 'Compra 5 abuelas',
        farmFrenzy: 'Locura de Granjas',
        farmFrenzyDesc: 'Compra 3 granjas',
        bakeryBoss: 'Jefe de Panadería',
        bakeryBossDesc: 'Compra 2 panaderías',
        factoryTycoon: 'Magnate de Fábricas',
        factoryTycoonDesc: 'Compra 1 fábrica',
        mineMaster: 'Maestro de Minas',
        mineMasterDesc: 'Compra 1 mina',
        shipCaptain: 'Capitán de Barco',
        shipCaptainDesc: 'Compra 1 barco',
        rocketScientist: 'Científico de Cohetes',
        rocketScientistDesc: 'Compra 1 cohete'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function updateDisplay() {
    document.getElementById('cookieCount').textContent = Math.floor(cookies);
    document.getElementById('cps').textContent = cps.toFixed(1);
    document.getElementById('cursorCount').textContent = cursorCount;
    document.getElementById('grandmaCount').textContent = grandmaCount;
    document.getElementById('farmCount').textContent = farmCount;
    document.getElementById('bakeryCount').textContent = bakeryCount;
    document.getElementById('factoryCount').textContent = factoryCount;
    document.getElementById('mineCount').textContent = mineCount;
    document.getElementById('shipCount').textContent = shipCount;
    document.getElementById('rocketCount').textContent = rocketCount;

    document.getElementById('cursorCost').textContent = Math.ceil(cursorCostBase * Math.pow(1.15, cursorCount));
    document.getElementById('grandmaCost').textContent = Math.ceil(grandmaCostBase * Math.pow(1.15, grandmaCount));
    document.getElementById('farmCost').textContent = Math.ceil(farmCostBase * Math.pow(1.15, farmCount));
    document.getElementById('bakeryCost').textContent = Math.ceil(bakeryCostBase * Math.pow(1.15, bakeryCount));
    document.getElementById('factoryCost').textContent = Math.ceil(factoryCostBase * Math.pow(1.15, factoryCount));
    document.getElementById('mineCost').textContent = Math.ceil(mineCostBase * Math.pow(1.15, mineCount));
    document.getElementById('shipCost').textContent = Math.ceil(shipCostBase * Math.pow(1.15, shipCount));
    document.getElementById('rocketCost').textContent = Math.ceil(rocketCostBase * Math.pow(1.15, rocketCount));

    // Enable/disable buy buttons
    document.querySelector('#cursor button').disabled = cookies < Math.ceil(cursorCostBase * Math.pow(1.15, cursorCount));
    document.querySelector('#grandma button').disabled = cookies < Math.ceil(grandmaCostBase * Math.pow(1.15, grandmaCount));
    document.querySelector('#farm button').disabled = cookies < Math.ceil(farmCostBase * Math.pow(1.15, farmCount));
    document.querySelector('#bakery button').disabled = cookies < Math.ceil(bakeryCostBase * Math.pow(1.15, bakeryCount));
    document.querySelector('#factory button').disabled = cookies < Math.ceil(factoryCostBase * Math.pow(1.15, factoryCount));
    document.querySelector('#mine button').disabled = cookies < Math.ceil(mineCostBase * Math.pow(1.15, mineCount));
    document.querySelector('#ship button').disabled = cookies < Math.ceil(shipCostBase * Math.pow(1.15, shipCount));
    document.querySelector('#rocket button').disabled = cookies < Math.ceil(rocketCostBase * Math.pow(1.15, rocketCount));

    // Unlock upgrades
    if (cursorCount >= 5) {
        document.getElementById('bakery').style.display = 'block';
    }
    if (bakeryCount >= 3) {
        document.getElementById('factory').style.display = 'block';
    }
    if (factoryCount >= 2) {
        document.getElementById('mine').style.display = 'block';
    }
    if (mineCount >= 2) {
        document.getElementById('ship').style.display = 'block';
    }
    if (shipCount >= 1) {
        document.getElementById('rocket').style.display = 'block';
    }

    // Check achievements
    achievements.forEach(ach => {
        if (!ach.unlocked && ach.condition()) {
            ach.unlocked = true;
            cookies += ach.bonus;
            alert(`Achievement Unlocked: ${ach.name}! +${ach.bonus} cookies`);
        }
    });

    // Check win condition
    if (totalCookiesEarned >= 1000000000000000) {
        document.getElementById('win-screen').style.display = 'flex';
    }

    // Check win condition
    if (totalCookiesEarned >= 1000000000000000) {
        document.getElementById('win-screen').style.display = 'flex';
    }

    saveGame();
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguage();
}

function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Update title
    document.querySelector('h1').textContent = t.title;
    
    // Update stats labels
    document.querySelector('#stats p:first-child').childNodes[0].textContent = t.cookies + ': ';
    document.querySelector('#stats p:nth-child(2)').childNodes[0].textContent = t.cps + ': ';
    document.querySelector('#stats p:nth-child(3)').childNodes[0].textContent = t.language + ': ';
    
    // Update upgrade names
    document.querySelector('#cursor h3').textContent = t.cursor;
    document.querySelector('#grandma h3').textContent = t.grandma;
    document.querySelector('#farm h3').textContent = t.farm;
    document.querySelector('#bakery h3').textContent = t.bakery;
    document.querySelector('#factory h3').textContent = t.factory;
    document.querySelector('#mine h3').textContent = t.mine;
    document.querySelector('#ship h3').textContent = t.ship;
    document.querySelector('#rocket h3').textContent = t.rocket;
    
    // Update buy buttons
    document.querySelectorAll('.upgrade button').forEach(btn => btn.textContent = t.buy);
    
    // Update feedback button
    document.getElementById('feedbackBtn').textContent = t.feedback;
    
    // Update feedback modal title
    document.getElementById('feedback-title').textContent = t.feedback;
    
    // Update win modal
    document.getElementById('win-message').textContent = t.winMessage;
    
    // Update feedback modal
    document.querySelector('label[for="name"]').textContent = t.feedbackName + ':';
    document.querySelector('label[for="email"]').textContent = t.feedbackEmail + ':';
    document.querySelector('label[for="message"]').textContent = t.feedbackMessage + ':';
    document.querySelector('#feedbackForm button').textContent = t.feedbackSubmit;
    
    // Update achievements
    achievements.forEach(ach => {
        const element = document.getElementById(ach.id);
        if (element) {
            element.querySelector('h4').textContent = t[ach.id];
            element.querySelector('p').textContent = t[ach.id + 'Desc'];
        }
    });
}

function updateAchievements() {
    // Removed display
}

function saveGame() {
    const gameState = {
        cookies,
        cps,
        cursorCount,
        grandmaCount,
        farmCount,
        bakeryCount,
        factoryCount,
        mineCount,
        shipCount,
        rocketCount,
        totalCookiesEarned,
        achievements: achievements.map(a => ({ id: a.id, unlocked: a.unlocked }))
    };
    localStorage.setItem('cookieClickerSave', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('cookieClickerSave');
    if (saved) {
        const gameState = JSON.parse(saved);
        cookies = gameState.cookies || 0;
        cps = gameState.cps || 0;
        cursorCount = gameState.cursorCount || 0;
        grandmaCount = gameState.grandmaCount || 0;
        farmCount = gameState.farmCount || 0;
        bakeryCount = gameState.bakeryCount || 0;
        factoryCount = gameState.factoryCount || 0;
        mineCount = gameState.mineCount || 0;
        shipCount = gameState.shipCount || 0;
        rocketCount = gameState.rocketCount || 0;
        totalCookiesEarned = gameState.totalCookiesEarned || 0;
        if (gameState.achievements) {
            gameState.achievements.forEach(savedAch => {
                const ach = achievements.find(a => a.id === savedAch.id);
                if (ach) ach.unlocked = savedAch.unlocked;
            });
        }
    }
}

function clickCookie() {
    cookies += 1;
    totalCookiesEarned += 1;
    spawnFallingCookie();
    updateDisplay();
}

function spawnFallingCookie() {
    const fallingCookies = document.getElementById('falling-cookies');
    const cookie = document.createElement('div');
    cookie.className = 'falling-cookie';
    const leftPos = Math.random() * 100;
    cookie.style.left = leftPos + '%';
    cookie.style.setProperty('--start-left', leftPos);
    cookie.style.setProperty('--sway1', (Math.random() * 20 - 10)); // -10 to 10
    cookie.style.setProperty('--sway2', (Math.random() * 20 - 10));
    cookie.style.setProperty('--sway3', (Math.random() * 20 - 10));
    const img = document.createElement('img');
    img.src = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f36a.svg';
    img.style.width = '100%';
    img.style.height = '100%';
    cookie.appendChild(img);
    fallingCookies.appendChild(cookie);
    
    // Remove the cookie after animation
    setTimeout(() => {
        if (fallingCookies.contains(cookie)) {
            fallingCookies.removeChild(cookie);
        }
    }, 2000);
}

function buyUpgrade(type) {
    let cost;
    switch(type) {
        case 'cursor':
            cost = Math.ceil(cursorCostBase * Math.pow(1.15, cursorCount));
            if (cookies >= cost) {
                cookies -= cost;
                cursorCount++;
                cps += 0.1;
            }
            break;
        case 'grandma':
            cost = Math.ceil(grandmaCostBase * Math.pow(1.15, grandmaCount));
            if (cookies >= cost) {
                cookies -= cost;
                grandmaCount++;
                cps += 1;
            }
            break;
        case 'farm':
            cost = Math.ceil(farmCostBase * Math.pow(1.15, farmCount));
            if (cookies >= cost) {
                cookies -= cost;
                farmCount++;
                cps += 8;
            }
            break;
        case 'bakery':
            cost = Math.ceil(bakeryCostBase * Math.pow(1.15, bakeryCount));
            if (cookies >= cost) {
                cookies -= cost;
                bakeryCount++;
                cps += 20;
            }
            break;
        case 'factory':
            cost = Math.ceil(factoryCostBase * Math.pow(1.15, factoryCount));
            if (cookies >= cost) {
                cookies -= cost;
                factoryCount++;
                cps += 100;
            }
            break;
        case 'mine':
            cost = Math.ceil(mineCostBase * Math.pow(1.15, mineCount));
            if (cookies >= cost) {
                cookies -= cost;
                mineCount++;
                cps += 500;
            }
            break;
        case 'ship':
            cost = Math.ceil(shipCostBase * Math.pow(1.15, shipCount));
            if (cookies >= cost) {
                cookies -= cost;
                shipCount++;
                cps += 2000;
            }
            break;
        case 'rocket':
            cost = Math.ceil(rocketCostBase * Math.pow(1.15, rocketCount));
            if (cookies >= cost) {
                cookies -= cost;
                rocketCount++;
                cps += 10000;
            }
            break;
    }
    updateDisplay();
}

// Auto-generate cookies every second
setInterval(() => {
    cookies += cps;
    totalCookiesEarned += cps;
    updateDisplay();
}, 1000);

// Restart game function
function restartGame() {
    // Reset all variables
    cookies = 0;
    cps = 0;
    cursorCount = 0;
    grandmaCount = 0;
    farmCount = 0;
    bakeryCount = 0;
    factoryCount = 0;
    mineCount = 0;
    shipCount = 0;
    rocketCount = 0;
    totalCookiesEarned = 0;
    
    // Reset achievements
    achievements.forEach(ach => ach.unlocked = false);
    
    // Hide upgrades
    document.getElementById('bakery').style.display = 'none';
    document.getElementById('factory').style.display = 'none';
    document.getElementById('mine').style.display = 'none';
    document.getElementById('ship').style.display = 'none';
    document.getElementById('rocket').style.display = 'none';
    
    // Clear localStorage
    localStorage.removeItem('cookieClickerSave');
    
    // Hide win screen
    document.getElementById('win-screen').style.display = 'none';
    
    // Update display
    updateDisplay();
}

// Initial display update
loadGame();
updateDisplay();

// Spacebar cookie generation
let spaceInterval;
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        if (!spaceInterval) {
            spaceInterval = setInterval(() => {
                clickCookie();
            }, 100);
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        if (spaceInterval) {
            clearInterval(spaceInterval);
            spaceInterval = null;
        }
    }
});

function openFeedback() {
    document.getElementById('feedback-modal').style.display = 'flex';
}

function closeFeedback() {
    document.getElementById('feedback-modal').style.display = 'none';
}

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    alert(`Thank you for your feedback, ${name}! We appreciate your input.`);
    document.getElementById('feedbackForm').reset();
});

// Initialize language
document.getElementById('languageSelect').value = currentLanguage;
updateLanguage();