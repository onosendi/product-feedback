import type { DBComment } from '@t/database';
import baseApi from '../lib/api';

const commentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<DBComment[], any>({
      query: (suggestionId: string) => `/comments?suggestion_id=${suggestionId}`,
    }),
  }),
});

export const {
  useGetCommentsQuery,
} = commentsApi;

export default commentsApi;
