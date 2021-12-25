import {
  DBSuggestionCategoryDisplay,
  DBSuggestionStatus,
  DBUserRole,
} from './database';

//
// Auth
//
export interface AuthResponse {
  role: DBUserRole;
  token: string;
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
// Votes
//
export interface ModifyVoteResponse {
  suggestionId: string;
}
