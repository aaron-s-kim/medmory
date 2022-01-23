export const setItemLocalStorage = state => {
  localStorage.setItem('medmory', JSON.stringify({ ...state }));
};

export const getItemLocalStorage = () => {
  return JSON.parse(localStorage.getItem('medmory'));
};

export const clearLocalStorage = () => {
  localStorage.removeItem('medmory');
};
