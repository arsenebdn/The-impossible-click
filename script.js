const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen');
const failScreen = document.getElementById('fail-screen');
const startBtn = document.getElementById('start-btn');
const levelDisplay = document.getElementById('level-display');
const timerDisplay = document.getElementById('timer');
const gameArea = document.getElementById('game-area');


let level = 1; // Niveau de départ
let timeLeft = 10;
let timer;
let proximityListener;
let intervalMover;

startBtn.addEventListener('click', () => {
  homeScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  startLevel();
});

function startLevel() {
  timeLeft = 5;
  levelDisplay.textContent = `Niveau ${level}`;
  timerDisplay.textContent = timeLeft;
  clearInterval(timer);

  if (proximityListener) {
    document.removeEventListener('mousemove', proximityListener);
    proximityListener = null;
  }
  if (intervalMover) {
    clearInterval(intervalMover);
    intervalMover = null;
  }

  setupLevel(level);

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) fail();
  }, 1000);
}

function pass() {
  clearInterval(timer);
  if (proximityListener) {
    document.removeEventListener('mousemove', proximityListener);
    proximityListener = null;
  }
  if (intervalMover) {
    clearInterval(intervalMover);
    intervalMover = null;
  }
  level++;
  if (level > 10) {
    gameScreen.classList.add('hidden');
    winScreen.classList.remove('hidden');
  } else {
    startLevel();
  }
}

function fail() {
  clearInterval(timer);
  if (proximityListener) {
    document.removeEventListener('mousemove', proximityListener);
    proximityListener = null;
  }
  if (intervalMover) {
    clearInterval(intervalMover);
    intervalMover = null;
  }
  gameScreen.classList.add('hidden');
  failScreen.classList.remove('hidden');
}

function setupLevel(lv) {
  gameArea.innerHTML = '';
  gameArea.style.background = '#121212';
  gameArea.style.height = '90vh';
  gameArea.style.cursor = 'default';

  switch (lv) {
    case 1: {
      const btn = document.createElement('button');
      btn.classList.add('game-btn');
      btn.textContent = 'Clique-moi';
      btn.style.position = 'absolute';
      btn.style.top = '50%';
      btn.style.left = '50%';
      btn.style.transform = 'translate(-50%, -50%)';
      btn.addEventListener('click', pass);
      gameArea.appendChild(btn);
      break;
    }

    case 2: {
      const btn = document.createElement('button');
      btn.classList.add('game-btn');
      btn.textContent = 'Clique-moi';
      btn.style.position = 'absolute';
      btn.addEventListener('click', pass);
      moveRandom(btn);
      gameArea.appendChild(btn);
      intervalMover = setInterval(() => moveRandom(btn), 600);
      break;
    }

    case 3: {
      const btn = document.createElement('button');
      btn.classList.add('game-btn');
      btn.textContent = 'Clique-moi';
      btn.style.position = 'absolute';
      moveRandom(btn);
      gameArea.appendChild(btn);

      // Clic = réussite
      btn.addEventListener('click', pass);

      // Fuite avec délai si souris trop proche
      let hoverTimeout;
      proximityListener = function (e) {
        const rect = btn.getBoundingClientRect();
        const distX = e.clientX - (rect.left + rect.width / 2);
        const distY = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 60) {
          if (!hoverTimeout) {
            hoverTimeout = setTimeout(() => {
              moveRandom(btn);
              hoverTimeout = null;
            }, 100);
          }
        } else {
          clearTimeout(hoverTimeout);
          hoverTimeout = null;
        }
      };

      document.addEventListener('mousemove', proximityListener);
      break;
    }

    case 4: {
      const btn = document.createElement('button');
      btn.classList.add('game-btn');
      btn.style.position = 'absolute';
      btn.style.opacity = '50'; // caché par défaut
      btn.style.cursor = 'none'; // pas de changement curseur au hover
      btn.textContent = '';
      gameArea.style.cursor = 'none'; // curseur invisible
      moveRandom(btn);
      gameArea.appendChild(btn);

      // Attente du rendu DOM pour position précise
      requestAnimationFrame(() => {
        const getBtnCenter = () => {
          const rect = btn.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
        };

        proximityListener = function (e) {
          const gameRect = gameArea.getBoundingClientRect();
          const mouseX = e.clientX - gameRect.left;
          const mouseY = e.clientY - gameRect.top;

          // Crée effet torche autour du curseur
          gameArea.style.background = `
        radial-gradient(circle 100px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.2) 0%, #121212 100%)
      `;

          const { x, y } = getBtnCenter();
          const dist = Math.sqrt((e.clientX - x) ** 2 + (e.clientY - y) ** 2);
          btn.style.opacity = dist < 100 ? '0.7' : '0';
        };

        btn.addEventListener('click', pass);
        document.addEventListener('mousemove', proximityListener);
      });

      break;
    }


    case 5: {
      const btn = document.createElement('button');
      btn.classList.add('game-btn');
      btn.style.position = 'absolute';
      btn.style.opacity = '50'; // invisible mais clicable
      btn.style.cursor = 'grab';
      btn.textContent = '';
      moveRandom(btn);
      gameArea.appendChild(btn);

      // Clic = réussite (protégé contre propagation accidentelle)
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Évite que le clic soit capté ailleurs
        e.stopImmediatePropagation();
        console.log("Bouton cliqué → PASS");
        pass();
      });

      requestAnimationFrame(() => {
        const rect = btn.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        proximityListener = function (e) {
          const distX = e.clientX - targetX;
          const distY = e.clientY - targetY;
          const distance = Math.sqrt(distX * distX + distY * distY);

          const maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
          const normalized = Math.min(1, distance / maxDistance);

          const cold = [0, 119, 255];
          const hot = [255, 51, 0];
          const mix = cold.map((c, i) => Math.round(c + (hot[i] - c) * (1 - normalized)));
          const color = `rgb(${mix.join(',')})`;

          gameArea.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, ${color} 0%, #121212 100%)`;
        };

        document.addEventListener('mousemove', proximityListener);
      });

      break;
    }
    case 6: {
  importLevel6();
  break;
}

  }


  function moveRandom(el) {
    const x = Math.random() * 80;
    const y = Math.random() * 80;
    el.style.top = `${y}%`;
    el.style.left = `${x}%`;
    el.style.transform = 'translate(-50%, -50%)';
  }
}