function solution(clothes) {
  const categoryMap = new Map();
  const arrayWith1Cloth = [];
  const arrayWith2Cloth = [];
  const arrayWith3Cloth = [];
  const arrayWith4Cloth = [];
  let answer = 0;
  clothes.forEach((cloth) => {
    arrayWith1Cloth.push(cloth[0]);
    answer++;
    categoryMap.set(cloth[0], cloth[1]);
  });

  for (let i = 0; i < clothes.length; i++) {
    for (let j = 0; j < clothes.length; j++) {
      let isRepetition = false;
      if (clothes[i][1] === clothes[j][1]) continue;
      arrayWith2Cloth.forEach((cloth) => {
        if (cloth[0] === clothes[j][0] && cloth[1] === clothes[i][0])
          isRepetition = true;
      });
      if (isRepetition) continue;
      const array = [];
      array.push(clothes[i][0]);
      array.push(clothes[j][0]);
      arrayWith2Cloth.push(array);
      answer++;
    }
  }

  clothes.forEach((cloth) => {
    for (let i = 0; i < arrayWith2Cloth.length; i++) {
      if (
        cloth[0] != arrayWith2Cloth[i][0] &&
        cloth[0] != arrayWith2Cloth[i][1] &&
        cloth[1] != categoryMap.get(arrayWith2Cloth[i][0]) &&
        cloth[1] != categoryMap.get(arrayWith2Cloth[i][1])
      ) {
        const array = [];
        array.push(arrayWith2Cloth[i][0]);
        array.push(arrayWith2Cloth[i][1]);
        array.push(cloth[0]);
        arrayWith3Cloth.push(array);
        answer++;
      }
    }
  });

  clothes.forEach((cloth) => {
    for (let i = 0; i < arrayWith3Cloth.length; i++) {
      if (
        cloth[0] != arrayWith3Cloth[i][0] &&
        cloth[0] != arrayWith3Cloth[i][1] &&
        cloth[0] != arrayWith3Cloth[i][2] &&
        cloth[1] != categoryMap.get(arrayWith3Cloth[i][0]) &&
        cloth[1] != categoryMap.get(arrayWith3Cloth[i][1]) &&
        cloth[1] != categoryMap.get(arrayWith3Cloth[i][2])
      ) {
        const array = [];
        array.push(arrayWith3Cloth[i][0]);
        array.push(arrayWith3Cloth[i][1]);
        array.push(arrayWith3Cloth[i][2]);
        array.push(cloth[0]);
        arrayWith4Cloth.push(array);
        answer++;
      }
    }
  });

  console.log(categoryMap);
  console.log(arrayWith1Cloth);
  console.log(arrayWith2Cloth);
  console.log(arrayWith3Cloth);
  console.log(arrayWith4Cloth);
  return answer;
}

console.log(
  solution([
    ["yellow_hat", "headgear"],
    ["blue_sunglasses", "eyewear"],
    ["green_turban", "headgear"],
    ["smoky_makeup", "face"],
    ["smoky_makeup2", "faces"],
  ])
);

//망함
// function solution(clothes) {
//   const categoryMap = {};

//   // 각 종류별로 의상 개수를 센다
//   for (const [name, category] of clothes) {
//     if (!categoryMap[category]) {
//       categoryMap[category] = [];
//     }
//     categoryMap[category].push(name);
//   }

//   // 조합의 수 계산: 각 종류마다 (의상 개수 + 1) (입지 않는 경우 포함)
//   let combinations = 1;
//   for (const category in categoryMap) {
//     combinations *= categoryMap[category].length + 1;
//   }

//   // 최소 하나는 입어야 하므로 전부 안 입는 경우(1가지) 제외
//   return combinations - 1;
// }
// 