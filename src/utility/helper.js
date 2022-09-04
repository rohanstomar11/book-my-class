export const getDate = input => {
  return `${
    parseInt(input.getDate(), 10) > 9 ? input.getDate() : '0' + input.getDate()
  }/${
    parseInt(input.getMonth(), 10) + 1 > 9
      ? (parseInt(input.getMonth(), 10) + 1).toString()
      : '0' + (parseInt(input.getMonth(), 10) + 1).toString()
  }/${input.getFullYear()}`;
};
