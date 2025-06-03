function solution(numbers) {
  const result = new Set();

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i == j) continue;
      result.add(numbers[i] + numbers[j]);
    }
  }
  const answer = Array.from(result);
  answer.sort((a, b) => a - b);
  return answer;
}

// 알고리즘 개요
// 1. numbers 배열 순회하면서 다른 numbers 배열을 더함 (이중순회)
// 2. 같은 인덱스끼리는 더하지않음
// 3. result 는 Set 객체이므로 중복제거됨.
// 4. 배열 객체 answer로 바꿔서 오름차순 정렬

// 풀면서 느꼈던점들
// 1. 코드를 작성하기전 생각해봤다. 단순하게 가장 기본적인 형태인
// numbers[i]+numbers[j] 를 이중 중첩문을 돌리면 발생하는 문제가 뭐가있을까?
// -1. 결과에 중복이 너무 많아짐 => 결과 배열을 Set 로 선언해 중복제거
// -2. [1,2,3,4] 일경우 나와서는 안되는 8이 결과배열에 나온다. => 같은 인덱스끼리는 연산패스
// 2. 반복문을 중첩하지않고 설계할수있는가? => 여기선 불가능한듯?
