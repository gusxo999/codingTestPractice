function solution(gems) {
  const gemCategorys = new Set();
  const intervalList = new Map();
  const validIntervalList = [];
  gems.forEach((gem) => {
    gemCategorys.add(gem);
  });
  const gemCategoryLength = gemCategorys.size;

  for (let i = 0; i < gems.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (!intervalList.has(j)) intervalList.set(j, [[], new Set(), 0]); // 구간 데이터 객체 초기화

      if (!intervalList.get(j)[1].has(gems[i])) {
        if (!intervalList.get(j)[1].has(gems[i]))
          intervalList.get(j)[1].add(gems[i]);
        if (intervalList.get(j)[1].size == gemCategoryLength) {
          intervalList.get(j)[2] = i;
          validIntervalList.push([intervalList.get(j)[0], j, i]);
        }
      }
      if (intervalList.get(j)[1].size < gemCategoryLength) {
        intervalList.get(j)[0].push(gems[i]);
      }
    }
  }

  validIntervalList.sort((a, b) => a[0].length - b[0].length);
  return [validIntervalList[0][1] + 1, validIntervalList[0][2] + 1];
}
// 풀면서 느낀점
// 1. 필요한 로직
// -1 보석종류 개수를 세야한다.  => gemCategorys 를 Set 객체로 선언해서 기록
//
// -2 구간의 길이를 세야한다.  => 구간의 배열길이를 반환하게만들자.
//
// -3 구간이 모든 보석 종류를 가지고있는 상황을 판단할 방법이 필요하다. => 구간에 등장하지 않았던 보석이 새로 나오면 +1 를해서 구간이 모든 보석을 가지고있는지 확인을해야하는데
//                                                                보석종류 개수는 한바퀴 돌지않고서는 모른다(gems 배열을 최소 두번 돌아야함)=> 반복문 두개 필요한게 확정
//
// -4 '모든 구간의 정보'와 '유효한 구간인지 판단할 정보'를 서로 맵핑 해야한다.    => intervalList 라는 구간 데이터 Map 객체를 만들자
//
// -5
// 2. 구간 데이터를 먼저 보기좋게 전처리를 해보자
// // intervalList =
// // {
// //   0: [ ['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'], Set(4) { 'DIA', 'RUBY', 'EMERALD', 'SAPPHIRE' }, 6 ],
// //   1: [ ['RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'],        Set(4) { 'RUBY', 'DIA', 'EMERALD', 'SAPPHIRE' }, 6 ],
// //   2: [ ['RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'],                Set(4) { 'RUBY', 'DIA', 'EMERALD', 'SAPPHIRE' }, 6 ],
// //   3: [ ['DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'],                        Set(3) { 'DIA', 'EMERALD', 'SAPPHIRE' },         0 ],
// //   4: [ ['DIA', 'EMERALD', 'SAPPHIRE', 'DIA'],                               Set(3) { 'DIA', 'EMERALD', 'SAPPHIRE' },         0 ],
// //   5: [ ['EMERALD', 'SAPPHIRE', 'DIA'],                                      Set(3) { 'EMERALD', 'SAPPHIRE', 'DIA' },         0 ],
// //   6: [ ['SAPPHIRE', 'DIA'],                                                 Set(2) { 'SAPPHIRE', 'DIA' },                    0 ],
// //   7: [ ['DIA'],                                                             Set(1) { 'DIA' },                                0 ]
// // }
// // 참조하는법
// // intervalList[0] = [[ 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA' ],4,6] => [[구간 배열], 구간에서 등장한 보석종류(Set 객체), 구간의끝 인덱스]
// // intervalList[0][0] = [ 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA' ]
// // intervalList[0][1] = 4

// 3. 전처리를 한 데이터를 통해 유효한 구간을 가지고있는 보석 배열을 구분해 냈긴했지만, 그중 가장 길이가 짧은 배열을 찾을수있도록 데이터 가공이 필요.
// // 데이터 가공전 데이터의 문제 =>
// // validIntervalList =
// // [
// //   [ [ 'AB', 'AC', 'AA', 'AC' ], 1, 3 ],
// //   [ [ 'AA', 'AB', 'AC', 'AA', 'AC' ], 0, 2 ]
// // ]
// 위와같이 유효한 보석배열을 구분해냈지만 [ 'AA', 'AB', 'AC', 'AA', 'AC' ] 의 배열중 원하는 부분은 [ 'AA', 'AB', 'AC'] 만 임.
// => 23번 라인에서 푸시 할때 이미 유효한 보석배열이면 push 를 안하게 조건문추가하기.

// 효율성 평가 => 이 코드는 모든 시작점 j에 대해 현재 인덱스 i까지의 구간을 전부 관리하고 있어 시간복잡도가 O(n²) 수준이라 비효율적입니다.

//정답: 효율성 개선을 위해 투 포인터(two pointers) 방식으로 해결하는 게 적절합니다.
// function solution(gems) {
//   const gemTypes = new Set(gems).size; // 보석 종류 개수
//   const gemMap = new Map();
//   let answer = [0, gems.length - 1];
//   let start = 0;

//   for (let end = 0; end < gems.length; end++) {
//     const gem = gems[end];
//     gemMap.set(gem, (gemMap.get(gem) || 0) + 1);

//     while (gemMap.size === gemTypes) {
//       // 가장 짧은 구간인지 확인
//       if ((end - start) < (answer[1] - answer[0])) {
//         answer = [start, end];
//       }

//       // start 포인터 이동
//       const startGem = gems[start];
//       gemMap.set(startGem, gemMap.get(startGem) - 1);
//       if (gemMap.get(startGem) === 0) gemMap.delete(startGem);
//       start++;
//     }
//   }

//   // 1-based index로 변환
//   return [answer[0] + 1, answer[1] + 1];
// }
// ✅ 핵심 아이디어 (투 포인터 방식)
// 1. 보석의 모든 종류 수를 먼저 파악한다.

// 2. 두 포인터 (start, end) 를 이용해서, 슬라이딩 윈도우로 gems 배열을 탐색한다.

// 3. end를 이동시키면서 Map에 보석을 추가해 현재 윈도우에 있는 보석 종류를 센다.

// 4. 모든 종류가 들어왔을 때:

// -1. start를 한 칸씩 앞으로 옮기며 더 짧은 구간이 되는지 확인하고,

// -2. 보석 개수가 0이 되는 순간 해당 보석은 제거한다.

// 5.가장 짧은 구간을 갱신해나가면서 최적 구간을 찾는다

//이 문제 푸는데 소요시간 6시간....
