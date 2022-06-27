function addDashes(f) {
  if (!f) {
    return "No number";
  }
  return f.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

module.exports = { addDashes };
