const appRoutes = {
  auth: {
    login: '/auth/login',
  },
  index: '/',
  roadmap: {
    list: '/roadmap',
  },
  feedback: {
    create: '/feedback/create',
    detail: (slug: string) => `/feedback/${slug}`,
    edit: (slug: string) => `/feedback/${slug}/edit`,
    list: '/feedback',
  },
  user: {
    edit: '/users/edit',
    register: '/users/register',
  },
};

export default appRoutes;
