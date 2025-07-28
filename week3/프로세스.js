function solution(priorities, location) {
  const processMap = new Map();
  const processes = priorities.map((priority, index) => {
    processMap.set(index, priorities);
  });
}

// 풀면서 느낀점
// 1. 문제에 대한 이해를 돕기위해 , 존재하는 프로세스가 [A, B, C, D, E, F]고, priorities [1,1,9,1,1,1] 일때
//    [C, D, E, F, A, B] 배열을 만들어내는 코드를 먼저 짜면 좋을것같음.
// 2. 근데 priorities는 가변 배열이기때문에
//    간단하게 그냥 A, B, C 프로세스를 0, 1, 2 (priorities 의 인덱스) 라고 생각하는게 좋겠음.
// 3. 헷갈리지않고 보기좋게 [processes, priorities] 를 맵 객체로 맵핑하자.
// 4. 가장 문제가되는 부분이 가장 높은 우선순위 프로세스를 처리한다음 그다음 프로세스를 처리하는방식인데,(반복문적으로 부자연스러움 )
