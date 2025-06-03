function solution(brown, yellow) {
  let answer;
  const area = brown + yellow;
  const divisorList = [];
  let divisorListIndex = 0;
  let width = 3; // 가로 최소값 3 부터시작
  let length = 3; // 세로 최소값 3 부터시작
  while (width * length <= area) {
    while (width * length <= area) {
      if (width * length == area && width > length) {
        divisorList[divisorListIndex] = [width, length];
        divisorListIndex++;
      }
      length++;
    }
    length = 3;
    width++;
  }
  divisorList.forEach((divisor) => {
    if (divisor[0] * 2 + divisor[1] * 2 - 4 == brown && area - brown == yellow)
      answer = divisor;
  });
  return answer;
}

// 알고리즘 개요
// 1. 넓이 = 갈색 칸 + 노란색 칸
// 2. 가로 세로 값을 담을 divisorList 선언
// 3. 가로 세로 값을 1씩 올려가면서 '넓이의 약수' 찾기
// 4. 3 에서 찾은 '넓이 의 약수'들중에서 갈색 칸 노란색 칸값이 일치하는 약수 찾기

// 풀면서 느꼈던점들
// 1. 24 24 일때 나올수있는값이 [8,6] 이라고했는데, 왜 [12,4]는 안되는거지? 라는 의문이 듬.
// 24 24 가 [8,6] 이 될수밖에없는 내가 모르는 규칙이 있나?
// 세보니까 [12,4] 가 되려면 [Brown,Yellow]가 28,20 이 되어야함
// 결론 : [Brown,Yellow] 이 주어졌으면 나올수있는 값은 하나이다.

// 2. [Brown,Yellow] 값을 합치면 총 넓이값이 나오고, 이 넓이값을 '넓이값의 약수'로 나눈 경우의 수들 중에 정답이있음.
// 3. 다만 넓이가 48 일때 나오는 경우의 수가 [가로,세로] -> [16,3] [12,4] [8,6] 가있는데, ([가로,세로]->[24,2]는 가운데 노랑이 들어갈자리가없음)
// 이 경우의 수들 중에서 넓이 48나 [Brown,Yellow] 값 24,24 를 이용해서 바로 정답 [8,6] 을 유추하는건 불가능해 보임.
// => 반대로 [가로,세로] -> [16,3] [12,4] [8,6] 값들을 먼저 확인하면 어떨까?
// => [가로,세로] -> [16,3] 에서 [Brown,Yellow]->[34,14] 같은 가능한값을 어떻게 도출하지?
// 4. '테두리 1줄은 갈색으로 칠해져있다' 라고 가정했을때 [가로,세로] 값으로 갈색값 노랑값 도출하는법 =>
// [가로,세로] -> [16,3]
// 갈색값: (가로:(16+16) + 세로:(3+3) - 겹치는꼭짓점:4) = 34
// 노랑값: (넓이:48-갈색값:34) = 14

// 결론 : [16,3] [12,4] [8,6] 모두 가능한 값 검사해서 [Brown,Yellow] 값 24,24 를 찾는다.
// 그리고 추가조건으로 걸어야할것 => 세로는 3보다 크거나 같아야함(시간최적화에 도움될듯)
