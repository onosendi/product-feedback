import type { APICreateComment } from '@t/api';
import type { DBComment } from '@t/database';
import qs from 'qs';
import baseApi from '../lib/api';

interface CreateCommentObject {
  body: APICreateComment;
  meta: {
    parentId?: string,
    suggestionId: string,
  };
}

const commentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<DBComment[], string>({
      query: (suggestionId) => `/comments?suggestion_id=${suggestionId}`,
      providesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
    createComment: build.mutation<DBComment, CreateCommentObject>({
      query: (obj) => {
        const querystring = qs.stringify({
          suggestion_id: obj.meta.suggestionId,
        });
        return {
          method: 'POST',
          url: `/comments?${querystring}`,
          body: obj.body,
        };
      },
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
} = commentsApi;

export default commentsApi;
