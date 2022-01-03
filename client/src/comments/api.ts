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
    createComment: build.mutation<DBComment, any>({
      query: (obj: CreateCommentObject) => ({
        method: 'POST',
        url: `/comments?${obj.querystring}`,
        body: { content: obj.content },
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
} = commentsApi;

export default commentsApi;
