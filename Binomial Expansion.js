// Write a function expand that takes in an expression with a single, one character variable, and expands it. The expression is in the form (ax+b)^n where a and b are integers which may be positive or negative, x is any single character variable, and n is a natural number. If a = 1, no coefficient will be placed in front of the variable. If a = -1, a "-" will be placed in front of the variable.
// The expanded form should be returned as a string in the form ax^b+cx^d+ex^f... where a, c, and e are the coefficients of the term, x is the original one character variable that was passed in the original expression and b, d, and f, are the powers that x is being raised to in each term and are in decreasing order.
// If the coefficient of a term is zero, the term should not be included. If the coefficient of a term is one, the coefficient should not be included. If the coefficient of a term is -1, only the "-" should be included. If the power of the term is 0, only the coefficient should be included. If the power of the term is 1, the caret and power should be excluded.



// Solved this by scanning Pascal's triangle.
function expand(expr) {
  function extractNumberFromString(str, start) {
    function isIntNumber(char) {
      return Number.isInteger(Number(char));
    }
    let end = start;
    do end++;
    while (isIntNumber(str[end]));
    return {
      value: Number(str.slice(start, end)),
      end: end,
    };
  }
  function analyzeFirstPart(expression = expr) {
    // takes (ax+b)^n string, a = integer, and extracts coefficient a, char in place of x and index of the x
    let sign = 1,
      i = 1;

    const beginsWithAMinus = expression[i] === "-";
    if (beginsWithAMinus) {
      sign = -1;
      i++;
    }

    const noCoefficient = isNaN(expression[i]);
    if (noCoefficient)
      return {
        a: sign * 1,
        x: expression[i],
        end: i,
      };

    const coefficientStart = i;
    const aModulus = extractNumberFromString(expression, coefficientStart);

    return {
      a: sign * aModulus.value,
      x: expression[aModulus.end],
      end: aModulus.end,
    };
  }
  function analyzeSecondPart(start, expression = expr) {
    // analyzes +b)^n part of the (ax+b)^n string, given index of the x character, returns b and n.
    // it is given that input case when b = 0 does not omit b. => (ax+0)
    const signIsPlus = expression[start + 1] === "+";
    const sign = signIsPlus ? 1 : -1;
    const bModulus = extractNumberFromString(expression, start + 2); // start,sign,b,b,b,b,b,b,..
    const b = sign * bModulus.value;
    const n = extractNumberFromString(expression, bModulus.end + 2).value; // ..b,b,b,b)^n
    return {
      b: b,
      n: n,
    };
  }
  function getBinomialCoefficients(power) {
    // scans Pascal's triangle, searching for the row of the coefficients corresponding to the power of the binom
    let row1 = [1],
      row2 = [1, 1];
    for (let currentPower = 2; currentPower <= power; currentPower++) {
      row1 = row2;
      row2 = [];
      row2.push(1);
      for (let j = 0; j < row1.length - 1; j++) {
        row2.push(row1[j] + row1[j + 1]);
      }
      row2.push(1);
    }
    return row2;
  }
  function synthesiseAnswer(a, x, b, n, coefficients) {
    function writeFirstAddendumCoefficient(a, n) {
      if (a != 1 && a != -1) return a ** n;
      if (a === -1 && n % 2 === 1) return "-"; // if a^n = -1
      return "";
    }
    function writeSecondAddendumCoefficient(a, b, n, binomialCoefficients) {
      const secondAddendumCoefficient =
        binomialCoefficients[1] * a ** (n - 1) * b;
      if (secondAddendumCoefficient > 0) return "+" + secondAddendumCoefficient;
      return secondAddendumCoefficient; // cannot be 1 because binomial coefficient of second addendum is > 1
    }
    function writeIntermediateAddendumCoefficient(C) {
      if (C > 1) return "+" + C;
      if (C < -1) return C;
      if (C === -1) return "-";
    }
    function writeSecondToLastAddendumCoefficient(
      a,
      b,
      n,
      binomialCoefficients
    ) {
      const BC = binomialCoefficients;
      const binomialC = BC[BC.length - 2];
      const C = binomialC * a * b ** (n - 1);
      if (C > 0) return "+" + C;
      return C;
    }

    let answer = "";
    answer += writeFirstAddendumCoefficient(a, n);
    answer += x + "^" + n;

    answer += writeSecondAddendumCoefficient(a, b, n, coefficients);
    answer += x + "^" + (n - 1);

    for (let px = n - 2, py = 2, i = 2; px > 1; px--, py++, i++) {
      // power of x, power of y, index of the binomial coefficient in the row of Pascal's triangle
      const binomialC = coefficients[i];
      const C = binomialC * a ** px * b ** py;
      answer += writeIntermediateAddendumCoefficient(C);
      answer += x + "^" + px;
    }

    answer += writeSecondToLastAddendumCoefficient(a, b, n, coefficients);
    answer += x;

    const bn = b ** n; // last addendum
    if (bn > 0) answer += "+";
    answer += bn;
    return answer;
  }

  const ax = analyzeFirstPart();
  const bn = analyzeSecondPart(ax.end);
  const a = ax.a,
    x = ax.x,
    b = bn.b,
    n = bn.n;
  delete ax, bn;

  // special/trivial cases
  if (n === 0) return "1";

  let answer = "";

  if (b === 0) {
    if (a != 1 && a != -1) answer += a ** n;
    else if (a === -1 && n % 2 === 1) answer += "-"; // if a^n = -1
    answer += x + "^" + n;
    return answer;
  }

  if (n === 1) {
    if (a != 1 && a != -1) answer += a;
    else if (a === -1) answer += "-"; // if a^n = -1
    answer += x;
    if (b >= 0) answer += "+";
    answer += b;
    return answer;
  }

  if (n === 2) {
    if (a != 1 && a != -1) answer += a * a;
    answer += x + "^" + "2";
    const ab2 = 2 * a * b;
    if (ab2 > 0) answer += "+";
    answer += ab2 + x;
    const bsqr = b * b;
    if (bsqr > 0) answer += "+";
    answer += bsqr;
    return answer;
  }

  const coefficients = getBinomialCoefficients(n);
  answer = synthesiseAnswer(a, x, b, n, coefficients);
  return answer;
}
