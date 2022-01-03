import type {
  DBSuggestionCategoryDisplay,
  DBSuggestionStatus,
  DBUserRole,
} from './database';

//
// Error
//
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

//
// Auth
//
export interface AuthResponse {
  role: DBUserRole;
  token: string;
  userId: string;
  username: string;
}

//
// Suggestions
//
export interface SuggestionResponse {
  category: DBSuggestionCategoryDisplay;
  commentCount: number;
  description: string;
  hasVoted: boolean;
  id: string;
  slug: string;
  status: DBSuggestionStatus;
  title: string;
  userId: string;
  votes: number;
}

//
// Comments
//
export interface CommentResponse {
  content: string;
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  replies: CommentResponse[];
  suggestionCommentParentId: string;
  suggestionId: string;
  username: string;
}
