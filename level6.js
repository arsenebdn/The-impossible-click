function importLevel6() {
  const gameArea = document.getElementById('game-area');
  gameArea.innerHTML = '';

  const board = document.createElement('div');
  board.style.display = 'grid';
  board.style.gridTemplateColumns = 'repeat(8, 1fr)';
  board.style.width = 'min(90vmin, 90vw)';
  board.style.aspectRatio = '1';
  board.style.margin = 'auto';
  board.style.border = '4px solid white';

  const files = 'abcdefgh';
  const allSquares = {};

  const positionsList = [
    { pieces: { 'e8': '♚', 'a1': '♖' }, solution: { from: 'a1', to: 'a8' } },
    { pieces: { 'e8': '♚', 'g6': '♕' }, solution: { from: 'g6', to: 'e8' } },
    { pieces: { 'g8': '♚', 'f6': '♕' }, solution: { from: 'f6', to: 'g7' } },
    { pieces: { 'e8': '♚', 'h5': '♕' }, solution: { from: 'h5', to: 'e8' } },
    { pieces: { 'e8': '♚', 'c7': '♘' }, solution: { from: 'c7', to: 'd5' } },
    { pieces: { 'e8': '♚', 'f6': '♘' }, solution: { from: 'f6', to: 'g8' } },
    { pieces: { 'e8': '♚', 'f7': '♕' }, solution: { from: 'f7', to: 'f8' } },
    { pieces: { 'e8': '♚', 'g6': '♖' }, solution: { from: 'g6', to: 'g8' } },
    { pieces: { 'e8': '♚', 'd6': '♕' }, solution: { from: 'd6', to: 'e7' } },
    { pieces: { 'e8': '♚', 'h4': '♕' }, solution: { from: 'h4', to: 'e7' } },
  ];
  const rand = positionsList[Math.floor(Math.random() * positionsList.length)];
  const positions = rand.pieces;
  const solution = rand.solution;

  const selected = { from: null, piece: null };
  let alreadyTried = false;

  for (let rank = 8; rank >= 1; rank--) {
    for (let file = 0; file < 8; file++) {
      const coord = `${files[file]}${rank}`;
      const square = document.createElement('div');
      square.dataset.coord = coord;
      square.style.display = 'flex';
      square.style.alignItems = 'center';
      square.style.justifyContent = 'center';
      square.style.aspectRatio = '1';
      square.style.fontSize = '6vmin';
      square.style.userSelect = 'none';
      square.style.cursor = 'pointer';
      square.style.backgroundColor = (rank + file) % 2 === 0 ? '#eee' : '#444';
      square.style.color = '#fff';
      board.appendChild(square);
      allSquares[coord] = square;
    }
  }

  // Placement des pièces
  for (const coord in positions) {
    allSquares[coord].textContent = positions[coord];
  }

  for (const coord in allSquares) {
    const square = allSquares[coord];
    square.addEventListener('click', () => {
      if (alreadyTried) return;
      clearHighlights();

      const content = square.textContent;

      if (content && ['♖', '♕', '♘'].includes(content)) {
        selected.from = coord;
        selected.piece = content;

        const legalMoves = getLegalMoves(coord, content);
        legalMoves.forEach(target => {
          if (allSquares[target]) {
            allSquares[target].style.backgroundColor = 'rgb(253, 122, 122)';
            allSquares[target].style.outline.color = 'black';
            allSquares[target].classList.add('legal');
          }
        });

      } else if (selected.from) {
        const from = selected.from;
        const to = coord;

        allSquares[from].textContent = '';
        allSquares[to].textContent = selected.piece;

        alreadyTried = true;

        if (from === solution.from && to === solution.to) {
          pass();
        } else {
          fail();
        }
      }
    });
  }

  function clearHighlights() {
    for (const square of Object.values(allSquares)) {
      if (square.classList.contains('legal')) {
        const f = square.dataset.coord[0];
        const r = parseInt(square.dataset.coord[1]);
        square.style.backgroundColor = (f.charCodeAt(0) + r) % 2 === 0 ? '#eee' : '#444';
        square.classList.remove('legal');
      }
    }
  }

  function getLegalMoves(from, piece) {
    const file = from.charCodeAt(0);
    const rank = parseInt(from[1]);
    const moves = [];

    if (piece === '♖' || piece === '♕') {
      for (let i = 1; i <= 8; i++) {
        if (i !== rank) moves.push(`${from[0]}${i}`);
        const f = String.fromCharCode(96 + i);
        if (f !== from[0]) moves.push(`${f}${rank}`);
      }
    }
    if (piece === '♕') {
      for (let d = -7; d <= 7; d++) {
        if (d === 0) continue;
        const f = String.fromCharCode(file + d);
        const r1 = rank + d;
        const r2 = rank - d;
        if (f >= 'a' && f <= 'h') {
          if (r1 >= 1 && r1 <= 8) moves.push(`${f}${r1}`);
          if (r2 >= 1 && r2 <= 8) moves.push(`${f}${r2}`);
        }
      }
    }
    if (piece === '♘') {
      const knightMoves = [
        [1, 2], [2, 1], [2, -1], [1, -2],
        [-1, -2], [-2, -1], [-2, 1], [-1, 2]
      ];
      knightMoves.forEach(([dx, dy]) => {
        const f = String.fromCharCode(file + dx);
        const r = rank + dy;
        if (f >= 'a' && f <= 'h' && r >= 1 && r <= 8) {
          moves.push(`${f}${r}`);
        }
      });
    }
    return moves;
  }

  gameArea.appendChild(board);
}
