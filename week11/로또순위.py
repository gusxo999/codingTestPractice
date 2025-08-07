def solution(lottos, win_nums):
    lottos.sort()
    win_nums.sort()
    array=[]
    count=0
    lowestRank=6
    highestRank=6
    for number in lottos:
        if(number==0):
            continue
        array+=[number]

    for number in array:
        for i in range(6):
            if(number==win_nums[i]):
                count+=1
            if(number<win_nums[i]):
                break

    lowestRank=7-count
    if(count==0):
        lowestRank-=1

    print("l")
    highestRank=len(array) + 1 - count
    if(count==0):
        highestRank-=1
        if(len(array)==0):
            highestRank+=1

    answer = [highestRank,lowestRank]
    return answer

solution([0, 0, 0, 0, 0,0],[1, 2, 3, 4, 5, 6])

# from itertools import combinations, permutations

# # 가능한 (M, W, U) 조합 (합이 6인 자연수 조합)
# combinations_list = []
# for m in range(7):
#     for w in range(7 - m):
#         u = 6 - m - w
#         combinations_list.append((m, w, u))

# # win_nums 고정
# win_nums = [1, 2, 3, 4, 5, 6]

# # 1~45 중 win_nums 아닌 숫자 (불일치용 숫자들)
# non_win_nums = [n for n in range(1, 46) if n not in win_nums]

# # 결과 저장
# lottos_by_combo = []

# for m, w, u in combinations_list:
#     if m > len(win_nums) or w > len(non_win_nums):
#         continue

#     # 일치 숫자 m개 선택
#     match_nums = win_nums[:m]

#     # 불일치 숫자 w개 선택
#     wrong_nums = non_win_nums[:w]

#     # 모름 u개는 0으로
#     unknowns = [0] * u

#     # 조합 순서 상관 없이 정렬하여 고정 배열 생성
#     lottos = sorted(match_nums + wrong_nums + unknowns)

#     # 이미 같은 MWU 조합이 들어갔다면 생략
#     lottos_by_combo.append({
#         'combo': (m, w, u),
#         'lottos': lottos
#     })

# # 출력
# for entry in lottos_by_combo:
#     combo = entry['combo']
#     lottos = entry['lottos']
#     answer= solution(entry['lottos'],[1,2,3,4,5,6])
#     print(f"조합(M,W,U): {combo}, lottos: {str(lottos):<23} solution:{answer}")