export const getFilteredBondUsers = (authUserId, bondUserArr) =>
  bondUserArr.filter(user => user.id !== authUserId);

export const getFilteredUsers = (authUserId, searchWord, allUsers) =>
  allUsers.filter(user => {
    if (authUserId === user.id) return false;
    return user.email.includes(searchWord);
  });

export const getCurrentMedGroup = (medGroupId, medGroupArr) =>
  medGroupArr.filter(medGroup => medGroup.id === medGroupId)[0];
