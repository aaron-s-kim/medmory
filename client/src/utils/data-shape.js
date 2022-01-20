export const getFilteredBondUsers = (authUserId, bondUserArr) =>
  bondUserArr.filter(user => user.id !== authUserId);

export const getFilteredUsersByEmail = (authUserId, searchWord, allUsers) =>
  allUsers
    .filter(user => {
      if (authUserId === user.id) return false;
      return user.email.includes(searchWord);
    })
    .slice(0, 6);

export const getFilteredUsersByLastName = (authUser, allUsers) =>
  allUsers
    .filter(user => {
      if (authUser.id === user.id) return false;
      if (authUser.bondId === user.bond_id) return false;
      return user.lastName.includes(authUser.lastName);
    })
    .slice(0, 3);

export const getCurrentMedGroup = (medGroupId, medGroupArr) =>
  medGroupArr.filter(medGroup => medGroup.id === medGroupId)[0];
