## 1. 문제정리

### 1.1 주어진 입력 예시가 아래와 같을때,

| distance | rocks                 | n   |
| -------- | --------------------- | --- |
| 25       | `[2, 14, 11, 21, 17]` | 2   |

### 1.2 실제 바위 위치는 `[0,2,11,14,17,21,25]` 이다.

### 1.3 이중 0 과 25 는 제거할수 없는 바위다.

### 1.4 그리고 배열 `[0,2,11,14,17,21,25]` 에서 `[2,11,14,17,21]` 중 2개 요소만 제거해서 각 배열요소 들의 차(difference)의 최소값들중, 가장 큰값을 구해야한다.

## 2. 최소값을 어떻게 구할수있을까?

### 2.1 배열 `[0,2,11,14,17,21,25]` 에서 `[2,11,14,17,21]` 중 2개 요소 제거한, 경우의 수 나열해보기

#### 2.1.1 한번 다 나열해 보자

| 제거한 바위의 위치 | 남아있는 바위들             | 각 바위 사이의 거리  | 거리의 최솟값 |
| ------------------ | --------------------------- | -------------------- | ------------- |
| `['2', '11']`      | `['0','14','17','21','25']` | `['14','3','4','4']` | 4             |
| `['2', '14']`      | `['0','11','17','21','25']` | `['11','6','4','4']` | 4             |
| `['2', '17']`      | `['0','11','14','21','25']` | `['11','3','7','4']` | 3             |
| `['2', '21']`      | `['0','11','14','17','25']` | `['11','3','3','8']` | 3             |
| `['11', '14']`     | `['0','2','17','21','25']`  | `['2','15','4','4']` | 2             |
| `['11', '17']`     | `['0','2','14','21','25']`  | `['2','12','7','4']` | 2             |
| `['11', '21']`     | `['0','2','14','17','25']`  | `['2','12','3','8']` | 2             |
| `['14', '17']`     | `['0','2','11','21','25']`  | `['2','9','10','4']` | 2             |
| `['14', '21']`     | `['0','2','11','17','25']`  | `['2','9','6','8']`  | 2             |
| `['17', '21']`     | `['0','2','11','14','25']`  | `['2','9','3','11']` | 2             |

### 거리의 최솟값들 중 가장 큰값 (Answer) : 4

#### 2.1.2 경우의수 종류가 아주많다... 다른방법 없을까? 규칙성 같은게 없을까?

### 2.2 생각해보면 '바위를 빼지않고도' 그냥 배열 `[0,2,11,14,17,21,25]` 을 보면 `[0,2]` 만봐도 최소값이 2라는걸 알수있네?

### 2.3 그럼 배열 `[0,2,11,14,17,21,25]` 이 주어졌을때 바위를 제거하는 연산을 먼저 하지말고,그냥 먼저 각 바위들의 거리를 구하는 연산을 먼저 해보자.

#### 2.3.1 각 바위 사이의 거리 계산하기

| 실제 바위의 위치       | 각 바위 사이의 거리 |
| ---------------------- | ------------------- |
| `[0,2,11,14,17,21,25]` | `[2,9,3,3,4,4]`     |

#### 2.3.2 그다음 우리는 위 '각 바위 사이의 거리' 의 배열을 가지고 바위 두개를 제거하는 연산을 수행해야한다. (N = 2 라서 2개)

#### - 첫번째 바위 제거

| 바위 하나 제거할 경우 실제 바위의 위치들 | 각 바위 사이의 거리 |
| ---------------------------------------- | ------------------- |
| `[0,11,14,17,21,25]` - 2 제거됨          | `[11,3,3,4,4]`      |

#### - 두번째 바위 제거

| 바위 두개 제거할 경우 실제 바위의 위치들 | 각 바위 사이의 거리 |
| ---------------------------------------- | ------------------- |
| `[0,11,17,21,25]` - 14 제거됨            | `[11,6,4,4]`        |

#### 2.3.3 아하 바위를 제거하는연산은 `[ 11 , 3 , 3 , 4 , 4 ]` => `[ 11 , (3 + 3) , 4 , 4 ]` 이런식으로 수행할수 있겠다.

#### 2.3.4 그리고 모든 바위들이 제거되었을때, 배열요소들의 최소값들이 높은 값 일수록 좋으니까, '각 바위 사이의 거리'를 가장 작게 만드는 바위를 우선적으로 제거해야함. <= (흠 이론적으로 문제없어 보이네 코딩시작!)

### 3. 되긴하는데 테스트 통과를 못하는 예시가 존재함. '어떤 예시' 가 '왜' 통과를 못하는지 분석해야함.

### 3.1 모르겠다... 항복선언후 CLAUDE AI 출격

### 3.2 테스트 통과 못하는 예시를 찾을수가없음 AI 도 얼탐... 결국 PASS

## 4. 이 문제 유형이 이진탐색이라는 게 인간에게 자명한가?

## 👀 직관적인 첫 접근: 그리디

이 문제를 처음 보는 사람이라면:

> "바위를 제거해서 최소 거리를 최대화" 라는 문제 설명만 봐서는  
> 이진탐색이 떠오르기 어려워요.

오히려 대부분은 이렇게 생각할 가능성이 높습니다:

> "가장 가까운 바위들을 제거하면 되지 않을까?"  
> → 그리디하게 해결할 수 있을 것 같음.

실제로 질문자의 코드도 그런 **그리디 방식**으로 작성되어 있었고,  
그 방식도 꽤 자연스러운 첫 시도입니다.

---

## 🧠 하지만 이 문제는 이진탐색으로 푸는 문제

이 문제는 결국 **"최소값의 최대화"** 문제이고,  
이는 전형적인 **Parametric Search (파라메트릭 서치)** 유형에 속합니다.

이진탐색 접근을 적용하려면 이런 생각을 해야 해요:

```
1. "최소값의 최대화" 라는 패턴을 알고 있어야 하고
2. "특정 값 X에 대해 YES/NO를 판단할 수 있다면 이진탐색 가능" 이라는 사고 과정을 거쳐야 하는데
3. 이런 건 경험이나 훈련 없이는 쉽게 떠오르지 않는 아이디어입니다
```

## 🙇 AI 의 반성

솔직히 말하면 저는 이런 유형의 문제를 많이 접해봤기 때문에

> "아, 이거 전형적인 parametric search 문제네"  
> 하고 바로 알아챌 수 있었어요.

그렇지만 처음 보는 사람 입장에서는 이게 **전혀 자명하지 않은 접근법**이라고 생각해요.

그래서 제가 처음에 "이 문제 유형이 보통 이진탐색으로 해결된다"고 말한 건  
→ **좀 오만했네요. 😅**

---

## ✅ 결론

- 이 문제는 경험자에게는 익숙한 이진탐색 패턴이지만 처음 접한 사람에게는 **직관적으로 그리디 접근이 먼저 떠오름**
- 따라서 이 문제의 해법이 이진탐색이라는 사실은 **초심자에겐 명확하지 않다**
- 그리디는 항상 증명해야 돼, 왜냐면 "그렇게 풀어도 되는지" 확실하지 않기 때문
- 반대로 DP나 완전탐색은 최적해를 보장하는 방식이기 때문에, 구조가 맞는 이상 결과 자체가 증명이 됨
- 다만 어떤 알고리즘이든 "왜 이게 맞는지" 설명할 수 있어야 진짜 제대로 푼 거야

## 정답 코드 설명

# Stepping Stones Algorithm 코드 분석

## 전체 개요

이 코드는 "징검다리 건너기" 문제를 해결하는 알고리즘입니다. 주어진 거리에서 최대 n개의 바위를 제거하여 남은 바위들 사이의 최소 거리를 최대화하는 문제입니다.

## 함수 매개변수

| 매개변수   | 타입 | 설명                               |
| ---------- | ---- | ---------------------------------- |
| `distance` | int  | 출발지점과 도착지점 사이의 총 거리 |
| `rocks`    | list | 바위들의 위치를 담은 리스트        |
| `n`        | int  | 제거할 수 있는 바위의 최대 개수    |

## 코드 단계별 분석

### 1. 초기 설정

| 단계      | 코드                               | 설명                                              |
| --------- | ---------------------------------- | ------------------------------------------------- |
| 정렬      | `rocks.sort()`                     | 바위 위치를 오름차순으로 정렬                     |
| 경계 추가 | `rocks = [0] + rocks + [distance]` | 출발점(0)과 도착점(distance)을 바위 리스트에 추가 |

### 2. 내부 함수: can_remove_rocks

이 함수는 주어진 최소 거리(`min_distance`)를 달성할 수 있는지 확인합니다.

| 변수          | 초기값 | 역할               |
| ------------- | ------ | ------------------ |
| `removed`     | 0      | 제거된 바위의 개수 |
| `current_pos` | 0      | 현재 위치의 인덱스 |

#### 알고리즘 로직

| 조건                                            | 동작              | 결과                           |
| ----------------------------------------------- | ----------------- | ------------------------------ |
| `rocks[i] - rocks[current_pos] < min_distance`  | `removed += 1`    | 바위 제거 (거리가 너무 가까움) |
| `removed > n`                                   | `return False`    | 제거 한도 초과로 실패          |
| `rocks[i] - rocks[current_pos] >= min_distance` | `current_pos = i` | 현재 위치 업데이트             |

### 3. 이진 탐색 구현

| 변수     | 초기값   | 의미               |
| -------- | -------- | ------------------ |
| `left`   | 1        | 탐색 범위의 최솟값 |
| `right`  | distance | 탐색 범위의 최댓값 |
| `answer` | 0        | 최종 답안          |

#### 이진 탐색 과정

| 단계 | 조건                             | 동작                             | 목적                      |
| ---- | -------------------------------- | -------------------------------- | ------------------------- |
| 1    | `left <= right`                  | 탐색 범위가 유효한 동안 반복     | 모든 가능한 값 검사       |
| 2    | `mid = (left + right) // 2`      | 중간값 계산                      | 탐색 범위를 절반으로 나눔 |
| 3    | `can_remove_rocks(mid) == True`  | `answer = mid`, `left = mid + 1` | 더 큰 값 탐색             |
| 4    | `can_remove_rocks(mid) == False` | `right = mid - 1`                | 더 작은 값 탐색           |

## 예시 실행

주어진 값: `distance = 25, rocks = [2, 14, 11, 21, 17], n = 2`

### 초기 설정 후

```
rocks = [0, 2, 11, 14, 17, 21, 25]
```

### 초기 설정 후

```
rocks = [0, 2, 11, 14, 17, 21, 25]
```

### 이진 탐색 과정 예시

| 반복 | left  | right | mid | can_remove_rocks(mid) 체크             | 결과                 | answer |
| ---- | ----- | ----- | --- | -------------------------------------- | -------------------- | ------ |
| 1    | 1     | 25    | 13  | mid=13일 때 3개 바위 제거 필요 → False | right = 12           | 0      |
| 2    | 1     | 12    | 6   | mid=6일 때 3개 바위 제거 필요 → False  | right = 5            | 0      |
| 3    | 1     | 5     | 3   | mid=3일 때 1개 바위 제거 필요 → True   | answer = 3, left = 4 | 3      |
| 4    | 4     | 5     | 4   | mid=4일 때 2개 바위 제거 필요 → True   | answer = 4, left = 5 | 4      |
| 5    | 5     | 5     | 5   | mid=5일 때 3개 바위 제거 필요 → False  | right = 4            | 4      |
| 6    | 5 > 4 | -     | -   | left > right이므로 종료                | -                    | 4      |

#### 각 mid 값에 대한 상세 분석

**mid = 13일 때:**

- rocks = [0, 2, 11, 14, 17, 21, 25]
- 0→2 (거리 2 < 13) → 바위 2 제거
- 0→11 (거리 11 < 13) → 바위 11 제거
- 0→14 (거리 14 ≥ 13) → 현재위치 = 14
- 14→17 (거리 3 < 13) → 바위 17 제거
- 제거된 바위: 3개 > n(2) → **False**

**mid = 6일 때:**

- 0→2 (거리 2 < 6) → 바위 2 제거
- 0→11 (거리 11 ≥ 6) → 현재위치 = 11
- 11→14 (거리 3 < 6) → 바위 14 제거
- 11→17 (거리 6 ≥ 6) → 현재위치 = 17
- 17→21 (거리 4 < 6) → 바위 21 제거
- 17→25 (거리 8 ≥ 6) → 현재위치 = 25
- 제거된 바위: 3개 > n(2) → **False**

**mid = 3일 때:**

- 0→2 (거리 2 < 3) → 바위 2 제거
- 0→11 (거리 11 ≥ 3) → 현재위치 = 11
- 11→14 (거리 3 ≥ 3) → 현재위치 = 14
- 14→17 (거리 3 ≥ 3) → 현재위치 = 17
- 17→21 (거리 4 ≥ 3) → 현재위치 = 21
- 21→25 (거리 4 ≥ 3) → 현재위치 = 25
- 제거된 바위: 1개 ≤ n(2) → **True**

**mid = 4일 때:**

- 0→2 (거리 2 < 4) → 바위 2 제거
- 0→11 (거리 11 ≥ 4) → 현재위치 = 11
- 11→14 (거리 3 < 4) → 바위 14 제거
- 11→17 (거리 6 ≥ 4) → 현재위치 = 17
- 17→21 (거리 4 ≥ 4) → 현재위치 = 21
- 21→25 (거리 4 ≥ 4) → 현재위치 = 25
- 제거된 바위: 2개 ≤ n(2) → **True**

**mid = 5일 때:**

- 0→2 (거리 2 < 5) → 바위 2 제거
- 0→11 (거리 11 ≥ 5) → 현재위치 = 11
- 11→14 (거리 3 < 5) → 바위 14 제거
- 11→17 (거리 6 ≥ 5) → 현재위치 = 17
- 17→21 (거리 4 < 5) → 바위 21 제거
- 17→25 (거리 8 ≥ 5) → 현재위치 = 25
- 제거된 바위: 3개 > n(2) → **False**

최종 답: **4** (최소 거리의 최댓값)

## 알고리즘 핵심 아이디어

| 개념            | 설명                                                |
| --------------- | --------------------------------------------------- |
| **그리디 전략** | 현재 위치에서 최소 거리를 만족하지 않는 바위를 제거 |
| **이진 탐색**   | 가능한 최소 거리의 최댓값을 효율적으로 찾음         |
| **최적화**      | 바위 제거 개수를 최소화하면서 최소 거리를 최대화    |

## 이진 탐색 코드를 현태가 요약정리한 내용 :

주어진 입력 예시가 아래와 같을때,
| distance | rocks | n |
| -------- | --------------------- | --- |
| 25 | `[2, 11, 14, 17, 21]` | 2 |

'최댓값' 을 찾기위해, 최댓값을 '이진 탐색' 하자.

최댓값의 가능한 범위는 1< 최댓값 < **distance** 이니까

Left = 1 이고
Right = 25, Mid = 13 이다.

그래서 '최댓값' 13 부터 시작해서, 이 '13' 이라는 최댓값이 바위 제거를 두개만했을때, 나올수있는 값인가?

불가능한 값이면, '최댓값' 14~25 는 불가능하니 스킵하고 다시 최댓값 6부터 비교시작. `1 (Left) + 12 (Right) // 2 = 6`

가능한 값이면, '최댓값' 1~12는 가능하니 스킵하고 다시 최댓값 18부터 비교시작 `14 (Left) + 25 (Right) // 2 = 18`

이런식으로 최적해 를 찾을수있음.

그런데, 어떤기준으로 불가능한 값을 판단하냐면, 예시를 들어보겠습니다.

```
rocks = [0, 2, 11, 14, 17, 21, 25]
can_remove_rocks(13)
```

처럼 최댓값이 13 일때

1. 0부터 시작해서, 바위 `[2]`은 거리 `13` 을 충족시키지 못하고 제거되어야합니다. **removed** ++

2. 바위 `[11]` 도 거리 13 을 충족시키지 못하고 제거되어야합니다. **removed** ++

3. 바위 `[14]` 는 거리 13 을 충족시키기 때문에, 포함되어야 하고, 바위 `[14]` 부터 거리를 다시 계산해야되기때문에 **current_pos=바위`[14]`의 인덱스** 로 업데이트 해주어야합니다.

4. 바위 `[17]` 은 바위 [14] 로부터 거리 `13`을 충족시키지 못하고 제거되어야합니다. **removed** ++

5. 최종적으로 **removed** 개수가 `n`과 일치한다면 '최댓값' `13`은 가능한 값, 일치하지않는다면 불가능한 값 입니다.

| rocks\[i] - rocks\[current_pos] < min_distance | 제거 여부 | removed 개수 | current_pos 업데이트 여부 |
| ---------------------------------------------- | --------- | ------------ | ------------------------- |
| `2 - 0 = 2 < 13 `                              | 제거      | 1            | ❌                        |
| `11 - 0 = 11 < 13`                             | 제거      | 2            | ❌                        |
| `14 - 0 = 14 < 13`                             | 유지      | 2            | ✅ (0 → 3)                |
| `17 - 14 = 3 < 13`                             | 제거      | 3            | ❌ → **False 반환**       |
