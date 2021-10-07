export default {
  auth: {
    login: '/auth/login',
  },
  feedback: {
    create: '/feedback/create',
    detail: {
      edit: (slug) => `/feedback/${slug}/edit`,
      index: (slug) => `/feedback/${slug}`,
    },
    index: '/feedback',
    roadmap: '/feedback/roadmap',
  },
  user: {
    edit: 'user/edit',
    register: 'user/register',
  },
};
