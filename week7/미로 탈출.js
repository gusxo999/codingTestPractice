// function solution(maps) {
//   const visitedToLever = Array.from({ length: n }, () => Array(m).fill(false));
//   const visitedToExit = Array.from({ length: n }, () => Array(m).fill(false));
//   let result = 0;
//   function scanMaze(x, y, array, result) {
//     const newArray = array.map((row) => row.slice());
//     result++;
//     newArray[x][y] = true;

//     if (maps[x + 1]?.[y] !== "X" && array[x + 1]?.[y] === false) {
//       return scanMaze(x + 1, y, newArray, result);
//     }

//     if (maps[x][y + 1] !== "X" && array[x]?.[y + 1] === false) {
//       return scanMaze(x, y + 1, newArray, result);
//     }

//     if (maps[x - 1]?.[y] !== "X" && array[x - 1]?.[y] === false) {
//       return scanMaze(x - 1, y, newArray, result);
//     }

//     if (maps[x][y - 1] !== "X" && array[x]?.[y - 1] === false) {
//       return scanMaze(x, y - 1, newArray, result);
//     }
//   }
//   for (let i = 0; i < maps.length; i++) {
//     for (let j = 0; j < maps.length; j++) {
//       if (maps[i][j] == "S") scanMaze(i, j, visitedToLever);
//     }
//   }
// }

function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  let start, lever, exit;

  // 좌표 찾기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const cell = maps[i][j];
      if (cell === "S") start = [i, j];
      if (cell === "L") lever = [i, j];
      if (cell === "E") exit = [i, j];
    }
  }

  // BFS 함수
  function bfs(startX, startY, target) {
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    const queue = [[startX, startY, 0]];
    visited[startX][startY] = true;

    while (queue.length) {
      const [x, y, dist] = queue.shift();

      if (maps[x][y] === target) return dist;

      for (let d = 0; d < 4; d++) {
        const nx = x + dx[d];
        const ny = y + dy[d];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < n &&
          ny < m &&
          !visited[nx][ny] &&
          maps[nx][ny] !== "X"
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny, dist + 1]);
        }
      }
    }

    return -1;
  }

  const toLever = bfs(start[0], start[1], "L");
  if (toLever === -1) return -1;

  const toExit = bfs(lever[0], lever[1], "E");
  if (toExit === -1) return -1;

  return toLever + toExit;
}
