function solution(answers) {
  const number1 = [1, 2, 3, 4, 5];
  const number2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const number3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  const scores = [
    [1, 0],
    [2, 0],
    [3, 0],
  ];
  answers.forEach((answer, index) => {
    if (answer == number1[index % 5]) scores[0][1] += 1;
    if (answer == number2[index % 8]) scores[1][1] += 1;
    if (answer == number3[index % 10]) scores[2][1] += 1;
  });
  scores.sort((a, b) => b[1] - a[1]);

  if (scores[0][1] == scores[1][1] && scores[0][1] == scores[2][1]) {
    return [scores[0][0], scores[1][0], scores[2][0]];
  } else if (scores[0][1] == scores[1][1]) {
    return [scores[0][0], scores[1][0]];
  } else return [scores[0][0]];
}
// 알고리즘 개요
// 1. 수포자가 찍는 패턴배열 생성
// 2. 수포자의 점수 기록해줄 score 배열 생성 (나중에 순위 정할때 구분할수있는 Id 값부여)
// 3. answer 과 수포자 답과 비교해가며 채점.
// 4. scores 배열 정렬해서 순위 책정.
// 5. 조건문으로 점수가 셋이 모두 같은경우 셋다 리턴, 둘이 같을 경우 둘만 리턴, 같지 않을경우 1등만 리턴

// 풀면서 느꼈던점들
// 1. 수포자가 문제를 푸는 행위와 채점하는 행위를 코드로 구현해야한다.
// => 코드로 작성하는건 다양한 방식이 있을것으로 예상됨
// => 그냥 되는대로하자...
