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
      providesTags: (result) => (
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Suggestions' as const, id })),
            { type: 'Suggestions', id: 'LIST' },
          ]
          : [{ type: 'Suggestions', id: 'LIST' }]
      ),
    }),
    getSuggestionDetail: build.query<SuggestionResponse, any>({
      query: (slug: string) => `/suggestions/${slug}`,
      providesTags: (result, error, id) => [{ type: 'Suggestions', id }],
    }),
    createSuggestion: build.mutation<void, any>({
      query: (body: APICreateOrUpdateSuggestion) => ({
        method: 'post',
        url: '/suggestions',
        body,
      }),
      invalidatesTags: [{ type: 'Suggestions', id: 'LIST' }],
    }),
    deleteSuggestion: build.mutation<void, any>({
      query: (suggestionId: string) => ({
        method: 'delete',
        url: `/suggestions/${suggestionId}`,
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Suggestions', id }],
    }),
  }),
});

export const {
  useGetSuggestionsQuery,
  useGetSuggestionDetailQuery,
  useCreateSuggestionMutation,
  useDeleteSuggestionMutation,
} = suggestionsApi;

export default suggestionsApi;
