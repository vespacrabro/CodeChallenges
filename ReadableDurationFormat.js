// Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way. The function must accept a non-negative integer. If it is zero, it just returns "now". Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds. For the purpose of this Kata, a year is 365 days and a day is 24 hours.
// * For seconds = 62, your function should return
//     "1 minute and 2 seconds"
// * For seconds = 3662, your function should return
//     "1 hour, 1 minute and 2 seconds"

function formatDuration(duration) {
  function calculate(seconds) {
    // returns a map, containing uformatted pairs [interval, quantity], like [year, 3], quantity != 0.
    const constants = new Map([
      ["year", 31536000],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1],
    ]);
    let results = new Map();
    for (let timeConstant of constants.keys()) {
      const interval = constants.get(timeConstant);
      if (seconds < interval) continue;
      const intDivRes = Math.trunc(seconds / interval);
      const remainder = seconds % interval;

      results.set(timeConstant, intDivRes);
      if (remainder === 0) break;
      seconds = remainder;
    }
    return results;
  }
  function format(results) {
    function getKeys(_map) {
      let keys = [];
      for (let key of _map.keys()) keys.push(key);

      return keys;
    }
    const keys = getKeys(results);

    let result = "";
    for (let i = 0; i < keys.length; i++) {
      const interval = keys[i];
      const quantity = results.get(interval);
      const resultsLeft = keys.length - 1 - i;

      result += quantity + " " + interval;

      if (quantity != 1) result += "s";
      if (resultsLeft > 1) result += ", ";
      else if (resultsLeft === 1) result += " and ";
    }

    return result;
  }

  if (!Number.isInteger(duration)) return;
  if (duration < 0) return;
  if (duration === 0) return "now";

  return format(calculate(duration));
}
