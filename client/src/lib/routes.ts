const appRoutes = {
  auth: {
    login: '/auth/login',
  },
  feedback: {
    create: '/feedback/create',
    detail: {
      edit: (slug: string) => `/feedback/${slug}/edit`,
      index: (slug: string) => `/feedback/${slug}`,
    },
    index: '/feedback',
    roadmap: '/feedback/roadmap',
  },
  index: '/',
  roadmap: {
    list: '/roadmap',
  },
  suggestions: {
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
