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
    list: '/suggestions',
  },
  user: {
    edit: '/user/edit',
    register: '/user/register',
  },
};

export default appRoutes;
