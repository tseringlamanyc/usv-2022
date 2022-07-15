function decideMarker(input) {
  let reservationTime = input.time.split("T")[1].slice(0, 2);
  let reservationTimeInt = parseInt(reservationTime);

  let res = "";

  switch (true) {
    case 11 <= reservationTimeInt && reservationTime <= 15:
      res = "Lunch";
      break;
    case 17 <= reservationTime && reservationTime <= 21:
      res = "Dinner";
      break;
    default:
      res = "Other";
      break;
  }

  return res;
}

module.exports = { decideMarker };
