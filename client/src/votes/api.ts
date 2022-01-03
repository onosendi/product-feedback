import baseApi from '../lib/api';

const votesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVote: build.mutation<void, string>({
      query: (suggestionId) => ({
        method: 'post',
        url: `/votes/${suggestionId}`,
      }),
    }),
    deleteVote: build.mutation<void, string>({
      query: (suggestionId) => ({
        method: 'delete',
        url: `/votes/${suggestionId}`,
      }),
    }),
  }),
});

export const { useCreateVoteMutation, useDeleteVoteMutation } = votesApi;

export default votesApi;
