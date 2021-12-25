import baseApi from '../lib/api';

const votesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVote: build.mutation<string, any>({
      query: (suggestionId: string) => ({
        method: 'post',
        url: `/votes/${suggestionId}`,
      }),
    }),
    deleteVote: build.mutation<string, any>({
      query: (suggestionId: string) => ({
        method: 'delete',
        url: `/votes/${suggestionId}`,
      }),
    }),
  }),
});

export const { useCreateVoteMutation, useDeleteVoteMutation } = votesApi;

export default votesApi;
