// A format for expressing an ordered list of integers is to use a comma separated list of either
// - individual integers
// - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example "12,13,15-17"
// Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.

function solution(L) {
  result = "";
  function write(string) {
    result += string;
  }
  function getRangeEndIndex(rangeStartIndex) {
    let j = rangeStartIndex + 2;
    while (L[j + 1] === L[j] + 1)
      // while next number belongs to a range, count it in
      j++;

    return j;
  }

  for (let i = 0; i < L.length; i++) {
    const thereIsARange = L[i + 1] === L[i] + 1 && L[i + 2] === L[i + 1] + 1;
    write(L[i]);
    if (thereIsARange) {
      const j = getRangeEndIndex(i);
      write("-" + L[j]);
      i = j;
    }
    if (i === L.length - 1) return result;
    write(",");
  }
}

console.log(
  solution([
    -10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18,
    19, 20,
  ])
);
// returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"
