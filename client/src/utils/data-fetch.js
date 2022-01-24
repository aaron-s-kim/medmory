import axios from 'axios';

import { setItemLocalStorage } from './data-persist';

export const getAuthUserData = setState => {
  axios
    .get('/auth/user')
    .then(res => {
      setState({
        ...res.data,
        isAuth: true,
      });
      setItemLocalStorage({
        ...res.data,
        isAuth: true,
      });
    })
    .catch(err => console.log(err.response.data.error));
};
