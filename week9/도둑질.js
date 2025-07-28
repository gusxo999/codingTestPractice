function solution(money) {
  function scan(moneyArray, index, sum) {
    let newSum = sum + moneyArray[index];
    if (moneyArray.length == 2) {
      if (moneyArray[0] >= moneyArray[1]) {
        console.log("yes1", sum, newSum, moneyArray[0]);
        return newSum;
      } else {
        console.log("yes2", sum, newSum, moneyArray[1]);
        return newSum;
      }
    } else if (moneyArray.length == 1) {
      return newSum;
    }
    if (index == 0) {
      const newArray = moneyArray.slice(2, 4);
      const returnedSum1 = scan(newArray, 0, newSum);
      const returnedSum2 = scan(newArray, 1, newSum);
      if (returnedSum1 > returnedSum2) return returnedSum1;
      else return returnedSum2;
    } else {
      const newArray = moneyArray.slice(3);
      const returnedSum1 = scan(newArray, 0, newSum);
      const returnedSum2 = scan(newArray, 1, newSum);
      if (returnedSum1 > returnedSum2) return returnedSum1;
      else return returnedSum2;
    }
  }

  const answer1 = scan(money, 0, 0);
  const answer2 = scan(money, 1, 0);
  console.log("damn", answer2);
  if (answer1 > answer2) return answer1;
  else return answer2;
}

console.log(solution([1, 2, 3, 4, 5]));

// function solution(money) {
//   const n = money.length;

//   // dp 계산 함수
//   function rob(arr) {
//     const len = arr.length;
//     const dp = new Array(len).fill(0);
//     dp[0] = arr[0];
//     dp[1] = Math.max(arr[0], arr[1]);
//     for (let i = 2; i < len; i++) {
//       dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
//     }
//     return dp[len - 1];
//   }

//   // case 1: 첫 집 포함, 마지막 집 제외
//   const case1 = rob(money.slice(0, n - 1));
//   // case 2: 첫 집 제외, 마지막 집 포함
//   const case2 = rob(money.slice(1));

//   return Math.max(case1, case2);
// }
