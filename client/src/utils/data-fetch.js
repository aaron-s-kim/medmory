import axios from 'axios';

export const getAuthUserData = setState => {
  axios
    .get('/auth/user')
    .then(res =>
      setState({
        ...res.data,
        isAuth: true,
        isLoading: false,
      })
    )
    .catch(err => console.log(err.response.data.error));
};
