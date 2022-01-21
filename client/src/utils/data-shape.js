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
      if (authUser.bondId === user.bondId) return false;
      return user.lastName.includes(authUser.lastName);
    })
    .slice(0, 3);

export const getCurrentMedGroup = (medGroupId, medGroupArr) =>
  medGroupArr.filter(medGroup => medGroup.id === medGroupId)[0];

export const getEncryptedEmail = email => {
  const emailParts = email.split('@');
  const user = emailParts[0];
  const emailDomain = emailParts[1].split('.')[0];
  const emailEnding = emailParts[1].split('.')[1];
  const encryptedUser = `${user.substring(0, 2)}***`;
  const encryptedEmail = `${emailDomain.substring(
    0,
    2
  )}***${emailDomain.substring(5, 7)}.**${emailEnding.substring(0, 2)}`;

  return `${encryptedUser}@${encryptedEmail}`;
};
