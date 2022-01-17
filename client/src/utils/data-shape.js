export const getFilteredBondUsers = (authUserId, bondUserArr) =>
  bondUserArr.map(user => user.id !== authUserId);
