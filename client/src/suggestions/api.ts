import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { SuggestionResponse } from '@t/response';
// eslint-disable-next-line import/no-cycle
import baseQuery from '../lib/baseQuery';

const postApi = createApi({
  reducerPath: 'suggestionsApi',
  baseQuery,
  tagTypes: ['Suggestions'],
  endpoints: (build) => ({
    getSuggestions: build.query<SuggestionResponse[], any>({
      query: () => '/suggestions',
      providesTags: ['Suggestions'],
    }),
  }),
});

export const { useGetSuggestionsQuery } = postApi;

export default postApi;
