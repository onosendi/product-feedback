import type {
  DBFeedbackStatus,
  DBFeedbackStatusSuggestion,
  DBId,
  DBUser,
  DBUserRole,
} from './database';

//
// Error
//
export type ErrorResponse = {
  error: string,
  message: string,
  statusCode: number,
};

//
// Auth
//
export type AuthResponse = {
  role: DBUserRole,
  token: string,
  userId: DBId,
  username: string,
};

//
// Feedback
//
type BaseFeedbackResponse = {
  category: DBFeedbackStatusSuggestion,
  commentCount: number,
  description: string,
  hasVoted: boolean,
  id: DBId,
  slug: string,
  title: string,
  userId: DBId,
  votes: number,
};

export type FeedbackResponse = BaseFeedbackResponse & {
  status: DBFeedbackStatus,
};

export type SuggestionsResponse = BaseFeedbackResponse & {
  status: DBFeedbackStatusSuggestion,
};

export type RoadmapStatusResponseKeys = Exclude<
DBFeedbackStatus, DBFeedbackStatusSuggestion
>;

export type RoadmapCountResponse = {
  [K in RoadmapStatusResponseKeys]: number;
};

export type RoadmapResponse = BaseFeedbackResponse & {
  status: RoadmapStatusResponseKeys,
};

//
// Comments
//
export type CommentResponse = {
  content: string,
  email: string,
  emailHash: string,
  firstName: string,
  id: DBId,
  lastName: string,
  feedbackCommentParentId: DBId | null,
  feedbackId: DBId,
  replies: CommentResponse[] | null,
  username: string,
};

//
// User
//
export type UserResponse = Omit<DBUser, 'password'>;
