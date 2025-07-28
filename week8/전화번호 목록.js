function solution(phone_book) {
  const sortedBook = phone_book.sort((a, b) => a.length - b.length);
  const splitedBook = sortedBook.map((number) => number.split(""));

  for (let i = 0; i < splitedBook.length; i++) {
    //console.log("yes2", sortedBook[i]);
    for (let j = 0; j < splitedBook.length; j++) {
      //console.log("ij", i, j);
      if (i === j) continue;
      let check = 0;

      splitedBook[i].forEach((char, index) => {
        if (char == splitedBook[j][index]) {
          //console.log("char", char);
          //console.log("splitedBook[i][index]", splitedBook[j][index]);
          check++;
          // console.log("check", check);
        }
      });

      //console.log("splitedBook[j]", splitedBook[j]);

      if (check == sortedBook[i].length) return false;
    }
  }
  return true;
}
console.log(solution(["119", "1195524421", "97674223"]));
console.log(solution(["123", "456", "789"]));
console.log(solution(["12", "123", "1235", "567", "88"]));

function solution(phone_book) {
  const sortedBook = phone_book.sort((a, b) => a.length - b.length);
  const splitedBook = sortedBook.map((number) => number.split(""));

  for (let i = 0; i < splitedBook.length; i++) {
    for (let j = 0; j < splitedBook.length; j++) {
      if (i === j) continue;
      let check = 0;

      splitedBook[i].forEach((char, index) => {
        if (char == splitedBook[j][index]) {
          check++;
        }
      });
      if (check == sortedBook[i].length) return false;
    }
  }
  return true;
}
