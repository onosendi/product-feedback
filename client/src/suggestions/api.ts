import type { APICreateOrUpdateSuggestion } from '@t/api';
import type { EditSuggestionResponse, SuggestionResponse } from '@t/response';
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
      providesTags: (result) => [
        { type: 'Suggestions', id: result?.id },
        { type: 'Suggestions', id: 'DETAIL' },
      ],
    }),
    createSuggestion: build.mutation<void, any>({
      query: (body: APICreateOrUpdateSuggestion) => ({
        method: 'POST',
        url: '/suggestions',
        body,
      }),
      invalidatesTags: [{ type: 'Suggestions', id: 'LIST' }],
    }),
    editSuggestion: build.mutation<void, any>({
      query: (obj: {
        body: APICreateOrUpdateSuggestion,
        suggestionId: string,
      }) => ({
        method: 'PATCH',
        url: `/suggestions/${obj.suggestionId}`,
        body: obj.body,
      }),
      invalidatesTags: [{ type: 'Suggestions', id: 'LIST' }],
    }),
    deleteSuggestion: build.mutation<void, any>({
      query: (suggestionId: string) => ({
        method: 'DELETE',
        url: `/suggestions/${suggestionId}`,
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Suggestions', id },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetSuggestionsQuery,
  useGetSuggestionDetailQuery,
  useCreateSuggestionMutation,
  useEditSuggestionMutation,
  useDeleteSuggestionMutation,
} = suggestionsApi;

export default suggestionsApi;
