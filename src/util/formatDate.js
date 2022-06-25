const formatDate = (e) => {
  let res = "";
  res = e.toISOString().split("T")[0];
  return res;
};

module.exports = { formatDate };
