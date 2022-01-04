import type { APICreateOrUpdateSuggestion } from '@t/api';
import type { RoadmapCountResponse, SuggestionResponse } from '@t/response';
import baseApi from '../lib/api';

interface EditSuggestionObject {
  body: APICreateOrUpdateSuggestion;
  meta: {
    suggestionId: string,
  };
}

const suggestionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSuggestions: build.query<SuggestionResponse[], string>({
      query: (querystring) => {
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
    getSuggestionDetail: build.query<SuggestionResponse, string>({
      query: (slug) => `/suggestions/${slug}`,
      providesTags: (result) => [
        { type: 'Suggestions', id: result?.id },
        { type: 'Suggestions', id: 'DETAIL' },
      ],
    }),
    createSuggestion: build.mutation<void, APICreateOrUpdateSuggestion>({
      query: (body) => ({
        method: 'POST',
        url: '/suggestions',
        body,
      }),
      invalidatesTags: [{ type: 'Suggestions', id: 'LIST' }],
    }),
    editSuggestion: build.mutation<void, EditSuggestionObject>({
      query: (obj) => ({
        method: 'PATCH',
        url: `/suggestions/${obj.meta.suggestionId}`,
        body: obj.body,
      }),
      invalidatesTags: (result, error, obj) => [
        { type: 'Suggestions', id: obj.meta.suggestionId },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),
    deleteSuggestion: build.mutation<void, string>({
      query: (suggestionId) => ({
        method: 'DELETE',
        url: `/suggestions/${suggestionId}`,
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Suggestions', id },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),
    getRoadmapCount: build.query<RoadmapCountResponse, void>({
      query: () => '/suggestions/roadmap/count',
      providesTags: [{ type: 'Suggestions', id: 'ROADMAP_COUNT' }],
    }),
  }),
});

export function selectSuggestionCount(querystring: string) {
  return suggestionsApi.endpoints.getSuggestions.select(querystring);
}

export const {
  useGetSuggestionsQuery,
  useGetSuggestionDetailQuery,
  useCreateSuggestionMutation,
  useEditSuggestionMutation,
  useDeleteSuggestionMutation,
  useGetRoadmapCountQuery,
} = suggestionsApi;

export default suggestionsApi;
