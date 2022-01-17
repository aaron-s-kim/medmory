export const getFilteredBondUsers = (authUserId, bondUserArr) =>
  bondUserArr.map(user => user.id !== authUserId);

export const getFilteredUsers = (authUserId, searchWord, allUsers) =>
  allUsers.filter(user => {
    if (authUserId === user.id) return false;
    return user.email.includes(searchWord);
  });
