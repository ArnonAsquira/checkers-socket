const arrayEqual = (firstArr: any[], secondArr: any[]): boolean => {
  if (firstArr.length !== secondArr.length) return false;
  for (let i = 0; i < firstArr.length; i++) {
    if (firstArr[i] !== secondArr[i]) {
      return false;
    }
  }
  return true;
};

export default arrayEqual;
