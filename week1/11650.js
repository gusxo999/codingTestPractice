// 문제
// 2차원 평면 위의 점 N개가 주어진다. 좌표를 x좌표가 증가하는 순으로, x좌표가 같으면 y좌표가 증가하는 순서로 정렬한 다음 출력하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 점의 개수 N (1 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 N개의 줄에는 i번점의 위치 xi와 yi가 주어진다. (-100,000 ≤ xi, yi ≤ 100,000) 좌표는 항상 정수이고, 위치가 같은 두 점은 없다.

// 출력
// 첫째 줄부터 N개의 줄에 점을 정렬한 결과를 출력한다.
const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").toString().trim().split(/\s+/);
const arrayLength = Number(input[0]);
const array = input.slice(1, arrayLength * 2 + 1).map((num) => Number(num));
const coordinates = [];
let temp;

for (let i = 0; i < arrayLength * 2; i += 2) {
  coordinates.push([array[i], array[i + 1]]);
}

//X 좌표 정렬 + Y 좌표 정렬 인데 Y좌표 정렬은 주석처리됨.
for (let j = 0; j < coordinates.length; j++) {
  for (let k = 1 + j; k < coordinates.length; k++) {
    if (coordinates[j][0] > coordinates[k][0]) {
      temp = coordinates[j];
      coordinates[j] = coordinates[k];
      coordinates[k] = temp;
    }
    //else if (coordinates[j][0] === coordinates[k][0]) {
    //   if (coordinates[j][1] > coordinates[k][1]) {
    //     temp = coordinates[j];
    //     coordinates[j] = coordinates[k];
    //     coordinates[k] = temp;
    //   }
    // }
  }
}

//Y좌표 정렬
for (let j = 0; j < coordinates.length; j++) {
  for (let k = 1 + j; k < coordinates.length; k++) {
    if (coordinates[j][0] === coordinates[k][0]) {
      if (coordinates[j][1] > coordinates[k][1]) {
        temp = coordinates[j];
        coordinates[j] = coordinates[k];
        coordinates[k] = temp;
      }
    }
  }
}
coordinates.map((coordinate) => {
  console.log(`${coordinate[0]} ${coordinate[1]}`);
});
// CHATGPT 가 위코드를 최적화한 코드
// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");
// const n = Number(input[0]);
// const coordinates = input.slice(1, n + 1).map((line) => {
//   const [x, y] = line.split(" ").map(Number);
//   return [x, y];
// });

// coordinates.sort((a, b) => {
//   if (a[0] === b[0]) return a[1] - b[1];
//   return a[0] - b[0];
// });

// console.log(coordinates.map(([x, y]) => `${x} ${y}`).join("\n"));
