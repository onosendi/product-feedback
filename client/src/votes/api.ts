import type { DBId } from '@t/database';
import baseApi from '../project/api';

const votesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVote: build.mutation<void, DBId>({
      query: (feedbackId) => ({
        method: 'post',
        url: `/votes/${feedbackId}`,
      }),
    }),
    deleteVote: build.mutation<void, DBId>({
      query: (feedbackId) => ({
        method: 'delete',
        url: `/votes/${feedbackId}`,
      }),
    }),
  }),
});

export const { useCreateVoteMutation, useDeleteVoteMutation } = votesApi;

export default votesApi;
