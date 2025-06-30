function solution(game_board, table) {
  let answer = 0;
  const puzzlePieces = [];
  const gameBoardBlank = [];
  const totalPuzzleTable = [];
  const totalgameBoardTable = [];

  const n = table.length;
  const k = game_board.length;
  function scanPuzzlePiece(x, y, piece) {
    if (x < 0 || x >= n || y < 0 || y >= n || table[x][y] !== 1) {
      return;
    }

    table[x][y] = 0;
    piece.push([x, y]);

    scanPuzzlePiece(x + 1, y, piece);
    scanPuzzlePiece(x - 1, y, piece);
    scanPuzzlePiece(x, y + 1, piece);
    scanPuzzlePiece(x, y - 1, piece);
  }

  function scanGameBoardBlank(x, y, blank) {
    if (x < 0 || x >= k || y < 0 || y >= k || game_board[x][y] !== 0) {
      return;
    }

    game_board[x][y] = 1;
    blank.push([x, y]);

    scanGameBoardBlank(x + 1, y, blank);
    scanGameBoardBlank(x - 1, y, blank);
    scanGameBoardBlank(x, y + 1, blank);
    scanGameBoardBlank(x, y - 1, blank);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (table[i][j] === 1) {
        const piece = [];
        scanPuzzlePiece(i, j, piece);
        puzzlePieces.push(piece);
      }
    }
  }

  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) {
      if (game_board[i][j] === 0) {
        const blank = [];
        scanGameBoardBlank(i, j, blank);
        gameBoardBlank.push(blank);
      }
    }
  }

  function normalize(piece) {
    piece.sort();
    const [baseX, baseY] = piece[0];
    return piece
      .map(([x, y]) => [x - baseX, y - baseY])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  }

  console.log("퍼즐 조각들:", puzzlePieces);
  console.log("게임보드 공간들:", gameBoardBlank);

  return answer;
}
