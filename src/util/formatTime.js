const formatTime = (e) => {
  let formattedHour = e.getHours().toString();
  let formattedMin = e.getMinutes().toString();
  let formattedSec = e.getSeconds().toString();
  let formattedTime = "";

  if (formattedHour.length === 1) {
    formattedHour = `0${formattedHour}`;
  }

  if (formattedMin.length === 1) {
    formattedMin = `0${formattedMin}`;
  }

  formattedTime = `${formattedHour}:${formattedMin}:${formattedSec}`;

  return formattedTime;
};

module.exports = { formatTime };
