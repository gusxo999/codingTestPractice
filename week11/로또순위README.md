## 1. 문제 정리

### 1.1 주어진 입력 예시가 아래와 같을때,

| lottos             | win_nums            |
| ------------------ | ------------------- |
| `[0,0,1,25,31,44]` | `	[1,6,10,19,31,45]` |

### 1.2 `lottos` 배열에 존재하는 `[0]` 은 '알아볼수 없는 번호' 로, `[1]` 부터 `[45]` 가 될수있다.

### 1.3 `lottos` 복권 번호와 `win_nums` 정답 번호와의 일치 여부 검사후, `lottos` 배열의 가능한 순위를 Return 해야함.

| 순위    | 당첨 내용            |
| ------- | -------------------- |
| 1       | 6개 번호가 모두 일치 |
| 2       | 5개 번호가 일치      |
| 3       | 4개 번호가 일치      |
| 4       | 3개 번호가 일치      |
| 5       | 2개 번호가 일치      |
| 6(낙첨) | 그 외                |

## 2. 알고리즘

### 2.1 먼저 `lottos` `[0,0,1,25,31,44]` 배열을 사용해 `[0]` 을 제외한 `[1,25,31,44]` 배열을 생성하자.

### 2.2 `[1,25,31,44]` 배열과 `win_nums` `[1,6,10,19,31,45]` 배열을 비교해 최저 순위를 계산하자.

### 2.3 최저 순위와 `[0]` 개수를 사용해 최고 순위를 계산하자.

### 2.4 일치여부 개수가 `0개` 일때와 `1개` 일때가 똑같은 `6위` 라는 특징만 조심하면 되겠다.

### 2.5 테스트 한두개가 안되는게있네? 실패한 결과의 입력값을 보여주지않아서 디버깅이 어려움.

## 3. 코드의 일반화가 생각보다 어려운걸 깨달음.

#### 다음코드를 분석하지말고, `count` 와 `len(array)` 숫자를 이용해 일반화 시키려고 시도한 코드란 걸 알아주세요.

`count` : 정답 번호와 일치하는갯수

`len(array)` : `[0]` 아닌 숫자갯수

`hightestRank`: 최고 순위, 기본값 `6`

`lowestRank`: 최저 순위, 기본값 `6`

### 3.1 맨처음 코드 형태 - 테스트 13/15 통과

```
   if(count>1):
       count-=1
       lowestRank-=count

   if(len(array)>0):
       highestRank=lowestRank-(6-len(array))
   else:
       highestRank=lowestRank

   if(count<1):
       highestRank+=1
   answer = [highestRank,lowestRank]
```

### 3.2 패턴을 알아내기위해 수정한코드 - 테스트 11/15 통과

#### 테스트 통과횟수는 적지만, 위에서 실패한 테스트를 성공함!

```
    if(count==2):
        lowestRank=5
    if(count==3):
        lowestRank=4
    if(count==4):
        lowestRank=3
    if(count==5):
        lowestRank=2
    if(count==6):
        lowestRank=1

    if(len(array)==0):
        highestRank=1
    if(len(array)==1):
        highestRank=2-count
    if(len(array)==2):
        highestRank=3-count
    if(len(array)==3):
        highestRank=4-count
    if(len(array)==4):
        highestRank=5-count
```

### 이제 코드만 봐서는 어떻게 수정해야 할지 모르겠음.

## 4. 모든 경우의 수를 테스트를 해보자. (어떤 예시가 틀린지 알아내야하므로)

### 4.1 입력으로 받을수있는 모든 경우의 수는 몇개일까?

#### `lottos` 배열 `[?,?,?,?,?,?]`에서 `[?]` 는 모르는 값 `[0]` 이 올수도, `[맞는 값]` 이 올수도, `[틀린 값]`이 올 수 있습니다.

-여기서부터 AI 사용-

우리가 궁금한 건:

> **M(일치), W(불일치), U(모름) 각각 몇 개인지의 분포 조합(M + W + U = 6)이 몇 가지냐?**

---

이건 결국 **자연수 3개(M, W, U)의 조합 중 합이 6인 모든 조합의 개수**를 구하는 거고, **순서는 고려함** (예: (6,0,0), (0,6,0), (0,0,6) 다 다름).

이 경우는 **중복을 허용한 3항 정수 조합** 문제야.

공식은 다음과 같아:

$$
\text{개수} = \binom{6 + 3 - 1}{3 - 1} = \binom{8}{2} = 28
$$

---

### ✅ 답: **총 28가지 조합**이 있어

예시 일부:

- (6,0,0)
- (5,1,0)
- (5,0,1)
- (4,2,0)
- (4,1,1)
- (4,0,2)
- ...
- (0,0,6)

이렇게 **M + W + U = 6**이 되는 **(M, W, U)** 형태의 조합은 총 **28개** 존재함.

### 4.2 '모든 조합 생성 함수'의 결과들을 '`Solution`' 함수에 투입한 결과

```
조합(M,W,U): (0, 0, 6), lottos: [0, 0, 0, 0, 0, 0]      solution:[1, 6]
조합(M,W,U): (0, 1, 5), lottos: [0, 0, 0, 0, 0, 7]      solution:[2, 6]
조합(M,W,U): (0, 2, 4), lottos: [0, 0, 0, 0, 7, 8]      solution:[3, 6]

...
```

```
...

조합(M,W,U): (2, 3, 1), lottos: [0, 1, 2, 7, 8, 9]      solution:[6, 5]
조합(M,W,U): (2, 4, 0), lottos: [1, 2, 7, 8, 9, 10]     solution:[6, 5]

```

### 어라? 최고 순위가 `[6]`이고 최저 순위가 `[5]` 라고? 찾았다! 요놈.

## 5. 최종 정리

### 위에서 못했던 코드 일반화시키기

기존코드

```
    if(count==0):
        lowestRank=6
    if(count==1):
        lowestRank=6
    if(count==2):
        lowestRank=5
    if(count==3):
        lowestRank=4
    if(count==4):
        lowestRank=3
    if(count==5):
        lowestRank=2
    if(count==6):
        lowestRank=1

    if(len(array)==0):
        highestRank=1-count
    if(len(array)==1):
        highestRank=2-count
    if(len(array)==2):
        highestRank=3-count
    if(len(array)==3):
        highestRank=4-count
    if(len(array)==4):
        highestRank=5-count
    if(len(array)==5):
        highestRank=6-count
    if(len(array)==6):
        highestRank=7-count
        if(count==0):
            highestRank-=1
```

일반화한 코드

```
    lowestRank=7-count
    if(count==0):
        lowestRank-=1

    highestRank=len(array) + 1 - count
    if(count==0):
        highestRank-=1
```

### 이런 코드로 일반화 성공. 인줄알았는데

### `lottos` `[0,0,0,0,0,0]` 일때 `[1,6]` 이여야하는데 `[0,6]` 이 되버려서 수정함.. (일반화 전엔 문제없었음)

최종 코드

```
    lowestRank=7-count
    if(count==0):
        lowestRank-=1

    highestRank=len(array) + 1 - count
    if(count==0):
        highestRank-=1
        if(len(array)==0):
            highestRank+=1
```

## 5.1 느낀점

### 코드의 일반화가 쉬운일이 아니다. 다음에 시작할땐, 건방지게 처음부터 일반화하려고 하지말고 if문으로 모든 분기를 펼쳐서 보는게 좋을것같다.

### 항상 또 검증하고 검증해야한다.

### 테스트 주도 개발 (TDD) 는 신이다.

## 6. AI 정답

```
def solution(lottos, win_nums):
    # 0의 개수 = 알아볼 수 없는 숫자의 개수
    unknown = lottos.count(0)

    # 당첨 숫자 중 실제로 맞힌 숫자 개수
    correct = len(set(lottos) & set(win_nums))

    # 최고 순위: 전부 맞췄다고 가정
    best = 7 - (correct + unknown)
    # 최저 순위: 0은 다 틀렸다고 가정
    worst = 7 - correct

    # 순위는 1~6등, 7등은 없으니 6등으로 고정
    best = best if best <= 6 else 6
    worst = worst if worst <= 6 else 6

    return [best, worst]

```

### 겁나 간단해서 말문이 막히네요

## 7. 극단적인 상황테스트

### 만약 숫자가 6개 아니고 100개였으면?
