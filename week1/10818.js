// 문제
// N개의 정수가 주어진다. 이때, 최솟값과 최댓값을 구하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 정수의 개수 N (1 ≤ N ≤ 1,000,000)이 주어진다. 둘째 줄에는 N개의 정수를 공백으로 구분해서 주어진다. 모든 정수는 -1,000,000보다 크거나 같고, 1,000,000보다 작거나 같은 정수이다.

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").toString().trim().split(/\s+/);
const arrayLength = Number(input[0]);
const array = input.slice(1, arrayLength + 1).map((num) => Number(num));

let max = Number(input[1]);
let min = Number(input[1]);

for (let number of array) {
  if (max < Number(number)) {
    max = Number(number);
  }
  if (min > Number(number)) {
    min = Number(number);
  }
}

console.log(min, max);
