import type { DBComment } from '@t/database';
import baseApi from '../lib/api';

interface CreateCommentObject {
  content: string;
  querystring: {
    parentId?: string,
    suggestionId: string,
  };
}

const commentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<DBComment[], any>({
      query: (suggestionId: string) => `/comments?suggestion_id=${suggestionId}`,
      providesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
    createComment: build.mutation<void, any>({
      query: (obj: CreateCommentObject) => ({
        method: 'POST',
        url: `/comments?${obj.querystring}`,
        body: { content: obj.content },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
} = commentsApi;

export default commentsApi;
