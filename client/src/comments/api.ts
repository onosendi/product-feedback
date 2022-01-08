import type { APICreateComment } from '@t/api';
import type { DBId } from '@t/database';
import type { CommentResponse } from '@t/response';
import qs from 'qs';
import baseApi from '../project/api';

const commentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<CommentResponse[], string>({
      query: (feedbackId) => `/comments?feedback_id=${feedbackId}`,
      providesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
    createComment: build.mutation<
    CommentResponse,
    {
      body: APICreateComment,
      meta: {
        parentId?: DBId,
        feedbackId: DBId,
      },
    }
    >({
      query: (obj) => {
        const querystring = qs.stringify({
          ...(obj.meta.parentId && { parent_id: obj.meta.parentId }),
          feedback_id: obj.meta.feedbackId,
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

export const { useGetCommentsQuery, useCreateCommentMutation } = commentsApi;

export default commentsApi;
