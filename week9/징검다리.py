# def solution(distance, rocks, n):
#     rocks.sort()
#     distanceEachRock=[rocks[0]]
#     for i in range(len(rocks)):
#         if i==0:
#             continue
#         distanceEachRock.append(rocks[i]-rocks[i-1])
#     distanceEachRock.append(distance-rocks[len(rocks)-1])
#     for i in range(n):
#         minValue=distance
#         minValueIndex =len(rocks)
#         for i in range(len(distanceEachRock)):
#             if(minValue>distanceEachRock[i]):
#                 minValue=distanceEachRock[i]
#         newDistanceEachRock=distanceEachRock[0:minValueIndex]
#         if(minValueIndex==len(distanceEachRock)):
#             newDistanceEachRock+=[distanceEachRock[minValueIndex]+distanceEachRock[minValueIndex+1]]    
#         else:
#             newDistanceEachRock+=[distanceEachRock[minValueIndex]+distanceEachRock[minValueIndex-1]]
#         newDistanceEachRock+=distanceEachRock[minValueIndex+2:len(distanceEachRock)]
#         distanceEachRock=newDistanceEachRock
#     newDistanceEachRock.sort()
#     return newDistanceEachRock[0]





def solution(distance, rocks, n):
    rocks.sort()
    rocks = [0] + rocks + [distance]  # 시작점과 끝점 추가
    
    def can_remove_rocks(min_distance):
        """주어진 최소 거리를 유지하면서 n개 이하의 바위를 제거할 수 있는지 확인"""
        removed = 0
        current_pos = 0
        
        for i in range(1, len(rocks)):
            print("rocks[i] - rocks[current_pos]",rocks[i],rocks[current_pos])
            if rocks[i] - rocks[current_pos] < min_distance:
                # 거리가 min_distance보다 작으면 현재 바위를 제거
                removed += 1
                if removed > n:
                    return False
            else:
                # 거리가 충분하면 현재 위치 업데이트
                current_pos = i
        
        return True
    
    # 이진 탐색으로 최대 최소 거리 찾기
    left, right = 1, distance
    answer = 0
    repeat =0
    while left <= right:
        repeat+=1
        mid = (left + right) // 2
        if can_remove_rocks(mid):
            answer = mid
            left = mid + 1  # 더 큰 최소 거리가 가능한지 확인
        else:
            right = mid - 1  # 더 작은 최소 거리로 시도
    return answer

solution(25, [2, 14, 11, 21, 17], 2)