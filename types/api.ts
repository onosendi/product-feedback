import type { DBSuggestionCategories, DBSuggestionStatus } from './database';

export interface APILogin {
  username: string;
  password: string;
}

export interface APIRegister {
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface APICreateOrUpdateSuggestion {
  category: DBSuggestionCategories;
  description: string;
  status?: DBSuggestionStatus;
  title: string;
}

export interface APICreateComment {
  commentParentId?: string;
  content: string;
  suggestionId: string;
}
