export default {
  token: (username, password) => ({
    data: { username, password },
    method: 'post',
    url: '/auth/token',
  }),
  refresh: '/auth/token/refresh',
};
