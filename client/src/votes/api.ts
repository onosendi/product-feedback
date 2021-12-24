import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQuery from '../lib/baseQuery';

const votesApi = createApi({
  reducerPath: 'votesApi',
  baseQuery,
  endpoints: (build) => ({
    createVote: build.mutation<void, any>({
      query: (suggestionId: string) => ({
        method: 'post',
        url: `/votes/${suggestionId}`,
      }),
    }),
    deleteVote: build.mutation<void, any>({
      query: (suggestionId: string) => ({
        method: 'delete',
        url: `/votes/${suggestionId}`,
      }),
    }),
  }),
});

export const { useCreateVoteMutation, useDeleteVoteMutation } = votesApi;

export default votesApi;
