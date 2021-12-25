import type { ModifyVoteResponse } from '@t/response';
import baseApi from '../lib/api';

const votesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVote: build.mutation<ModifyVoteResponse, any>({
      query: (suggestionId: string) => ({
        method: 'post',
        url: `/votes/${suggestionId}`,
      }),
    }),
    deleteVote: build.mutation<ModifyVoteResponse, any>({
      query: (suggestionId: string) => ({
        method: 'delete',
        url: `/votes/${suggestionId}`,
      }),
    }),
  }),
});

export const { useCreateVoteMutation, useDeleteVoteMutation } = votesApi;

export default votesApi;
