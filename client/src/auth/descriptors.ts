const routes = {
  token: (username: string, password: string) => ({
    data: { username, password },
    method: 'post',
    url: '/auth/token',
  }),
  refresh: '/auth/token/refresh',
};

export default routes;
