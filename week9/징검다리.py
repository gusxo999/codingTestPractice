def solution(distance, rocks, n):
    rocks.sort()
    distanceBetweenEachRock=[rocks[0]]
    for i in range(len(rocks)):
        if i==0:
            continue
        distanceBetweenEachRock.append(rocks[i]-rocks[i-1])
    distanceBetweenEachRock.append(distance-rocks[len(rocks)-1])
    for i in range(n):
        minValue=distance
        minValueIndex =len(rocks)
        for i in range(len(distanceBetweenEachRock)):
            if(minValue>distanceBetweenEachRock[i]):
                minValue=distanceBetweenEachRock[i]
        newDistanceBetweenEachRock=distanceBetweenEachRock[0:minValueIndex]
        if(minValueIndex==len(distanceBetweenEachRock)):
            newDistanceBetweenEachRock+=[distanceBetweenEachRock[minValueIndex]+distanceBetweenEachRock[minValueIndex+1]]    
        else:
            newDistanceBetweenEachRock+=[distanceBetweenEachRock[minValueIndex]+distanceBetweenEachRock[minValueIndex-1]]
        newDistanceBetweenEachRock+=distanceBetweenEachRock[minValueIndex+2:len(distanceBetweenEachRock)]
        distanceBetweenEachRock=newDistanceBetweenEachRock
    newDistanceBetweenEachRock.sort()
    return newDistanceBetweenEachRock[0]



solution(16, [1, 5, 11, 14], 1)
