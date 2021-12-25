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
    }),
  }),
});

export const { useGetSuggestionsQuery } = suggestionsApi;

export default suggestionsApi;
