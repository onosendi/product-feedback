import type { DBSuggestionCategories, DBSuggestionStatus } from './database';

export interface APILogin {
  username: string;
  password: string;
}

export interface APICreateOrUpdateSuggestion {
  category: DBSuggestionCategories;
  description: string;
  status?: DBSuggestionStatus,
  title: string;
}
