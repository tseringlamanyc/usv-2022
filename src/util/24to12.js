const change12To24 = (str) => {
  const timeString12hr = new Date("1970-01-01T" + str + "Z").toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return timeString12hr;
};

module.exports = { change12To24 };
