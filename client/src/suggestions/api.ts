import { createApi } from '@reduxjs/toolkit/dist/query/react';
// eslint-disable-next-line import/no-cycle
import baseQuery from '../lib/baseQuery';

const postApi = createApi({
  reducerPath: 'suggestionsApi',
  baseQuery,
  tagTypes: ['Suggestions'],
  endpoints: (build) => ({
    getSuggestions: build.query({
      query: () => '/suggestions',
      providesTags: ['Suggestions'],
    }),
  }),
});

export const { useGetSuggestionsQuery } = postApi;

export default postApi;
