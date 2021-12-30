import type { APICreateOrUpdateSuggestion } from '@t/api';
import type { SuggestionResponse } from '@t/response';
import baseApi from '../lib/api';

const suggestionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSuggestions: build.query<SuggestionResponse[], any>({
      query: (querystring: string) => {
        let url = '/suggestions';
        if (querystring) {
          url += `?${querystring}`;
        }
        return url;
      },
      providesTags: ['Suggestions'],
    }),
    getSuggestionDetail: build.query<SuggestionResponse, any>({
      query: (slug: string) => `/suggestions/${slug}`,
    }),
    createSuggestion: build.mutation<void, any>({
      query: (body: APICreateOrUpdateSuggestion) => ({
        method: 'post',
        url: '/suggestions',
        body,
      }),
      invalidatesTags: ['Suggestions'],
    }),
  }),
});

export const {
  useGetSuggestionsQuery,
  useGetSuggestionDetailQuery,
  useCreateSuggestionMutation,
} = suggestionsApi;

export default suggestionsApi;
