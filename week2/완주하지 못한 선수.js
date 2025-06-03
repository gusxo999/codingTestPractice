function solution(participant, completion) {
  for (let i = 0; i < participant.length; i++) {
    for (let j = 0; j < completion.length; j++) {
      if (participant[i] === completion[j]) {
        participant.splice(i, 1);
        completion.splice(j, 1);
        i = i - 1;
        break;
      }
    }
  }
  return participant[0];
}
// 알고리즘 개요
// 1. participant 을 순회하면서
// 2. 'participant 배열요소의 문자열'과 'completion 배열요소의 문자열'과 비교 (completion를 2중으로 순회하면서 비교)
// 3. 서로 일치하면 각각 배열에서 해당 문자열삭제
// 4. 마지막으로 남은 participant 반환.

// 풀면서 느꼈던점들
// 1. 배열끼리 비교할일 있으면 MAP 객체를 사용하자 시간복잡도 최적화가 사기적임.
// 2. 동명이인 문제가 가장큰문제라서 참가자ID를 부여하는게 이 문제를 해결하는데 가장적절한것으로 보임.
// 3. 이미 완주자 명단을 이름으로 작성해 참가자 ID를 부여하는게 불가능 => 굳이 부여하자면 문제를 해결하고나서야 부여가능

// 정답
// function solution(participant, completion) {
//   const map = new Map();

//   for (const person of completion) {
//     map.set(person, (map.get(person) || 0) + 1);
//   }

//   for (const person of participant) {
//     if (!map.has(person) || map.get(person) === 0) {
//       return person;
//     }
//     map.set(person, map.get(person) - 1);
//   }
// }
