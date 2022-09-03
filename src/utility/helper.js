export const getDate = input => {
  return `${
    parseInt(input.getDate(), 10) > 9 ? input.getDate() : '0' + input.getDate()
  }/${
    parseInt(input.getMonth(), 10) > 9
      ? input.getMonth()
      : '0' + input.getMonth()
  }/${input.getFullYear()}`;
};
