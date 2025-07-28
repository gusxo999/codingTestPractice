function solution(n) {
  let traveledDistance;
  let spendBatteryCharge = 1;

  while (n > 0) {
    while (n % 2 == 0) n /= 2;

    while (n % 2 != 0) n -= 1;

    if (traveledDistance == n) return spendBatteryCharge;
    spendBatteryCharge++;
  }
}
