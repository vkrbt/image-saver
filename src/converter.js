export default {
  stringToBoolean(str) {
    if (str.toString().toLowerCase() === 'true') {
      return true;
    }
    return false;
  },

  booleanToString(condition) {
    return (!!condition).toString().toUpperCase();
  }
}