import type { APICreateOrUpdateFeedback } from '@t/api';
import type { DBId } from '@t/database';
import type {
  FeedbackResponse,
  RoadmapCountResponse,
  RoadmapResponse,
  SuggestionsResponse,
} from '@t/response';
import baseApi from '../lib/api';

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getSuggestions: build.query<SuggestionsResponse[], string>({
      query: (querystring) => {
        let url = '/feedback';
        if (querystring) {
          url += `?${querystring}`;
        }
        return url;
      },
      providesTags: (result) => (
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Feedback' as const, id })),
            { type: 'Feedback', id: 'LIST' },
          ]
          : [{ type: 'Feedback', id: 'LIST' }]
      ),
    }),

    getFeedbackDetail: build.query<FeedbackResponse, string>({
      query: (slug) => `/feedback/${slug}`,
      providesTags: (result) => [
        { type: 'Feedback', id: result?.id },
        { type: 'Feedback', id: 'DETAIL' },
      ],
    }),

    createFeedback: build.mutation<void, APICreateOrUpdateFeedback>({
      query: (body) => ({
        method: 'POST',
        url: '/feedback',
        body,
      }),
      invalidatesTags: [
        { type: 'Feedback', id: 'LIST' },
        { type: 'Feedback', id: 'ROADMAP' },
      ],
    }),

    editFeedback: build.mutation<
    void,
    {
      body: APICreateOrUpdateFeedback,
      meta: {
        feedbackId: DBId,
      },
    }
    >({
      query: (obj) => ({
        method: 'PATCH',
        url: `/feedback/${obj.meta.feedbackId}`,
        body: obj.body,
      }),
      invalidatesTags: (result, error, obj) => [
        { type: 'Feedback', id: obj.meta.feedbackId },
        { type: 'Feedback', id: 'LIST' },
        { type: 'Feedback', id: 'ROADMAP' },
      ],
    }),

    deleteFeedback: build.mutation<void, string>({
      query: (feedbackId) => ({
        method: 'DELETE',
        url: `/feedback/${feedbackId}`,
      }),
      invalidatesTags: [
        { type: 'Feedback', id: 'LIST' },
        { type: 'Feedback', id: 'ROADMAP' },
      ],
    }),

    getRoadmapCount: build.query<RoadmapCountResponse, void>({
      query: () => '/feedback/roadmap-count',
      providesTags: [{ type: 'Feedback', id: 'ROADMAP' }],
    }),

    getRoadmap: build.query<RoadmapResponse[], void>({
      query: () => '/feedback/roadmap',
      providesTags: [{ type: 'Feedback', id: 'ROADMAP' }],
    }),

  }),
});

export const {
  useGetSuggestionsQuery,
  useGetFeedbackDetailQuery,
  useCreateFeedbackMutation,
  useEditFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetRoadmapCountQuery,
  useGetRoadmapQuery,
} = feedbackApi;

export default feedbackApi;
