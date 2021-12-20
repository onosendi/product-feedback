//
// Database
//
type DBUserRole = 'user' | 'admin';
interface DBUser {
  id: string;
  createdAt: Date;
  lastLogin: Date;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  picture: string;
  role: DBUserRole;
}

type DBSuggestionStatus = 'suggestion' | 'planned' | 'in-progress' | 'live';
interface DBSuggestion {
  id: string;
  createdAt: Date;
  title: string;
  slug: string;
  description: string;
  status: DBSuggestionStatus;
  userId: string;
  categoryId: string;
}

type DBSuggestionCategories = 'feature' | 'ui' | 'ux' | 'enhancemenet' | 'bug';
type DBSuggestionCategoryDisplay = 'Feature' | 'UI' | 'UX' | 'Enhancemenet' | 'Bug';
interface DBSuggestionCategory {
  id: string;
  category: DBSuggestionCategories;
  display: DBSuggestionCategoryDisplay;
}

//
// Auth
//
interface JWTDecodePayload {
  iat: string;
  token: string;
  userId: string;
}

interface AuthResponse {
  role: DBUserRole;
  token: string;
  username: string;
}
