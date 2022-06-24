function getDateFromHours(time) {
  if (time === null) {
    return new Date();
  }

  time = time.split(":");
  let now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

module.exports = { getDateFromHours };
