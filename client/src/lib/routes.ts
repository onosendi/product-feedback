const appRoutes = {
  auth: {
    login: '/auth/login',
  },
  index: '/',
  roadmap: {
    list: '/roadmap',
  },
  suggestions: {
    create: '/suggestions/create',
    detail: (slug: string) => `/suggestions/${slug}`,
    edit: (slug: string) => `/suggestions/${slug}/edit`,
    list: '/suggestions',
  },
  user: {
    edit: '/users/edit',
    register: '/users/register',
  },
};

export default appRoutes;
