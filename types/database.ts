export type DBId = string;

export type DBUserRole = 'admin' | 'user';
export type DBUser = {
  id: DBId,
  createdAt: Date,
  lastLogin: Date,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  picture: string,
  role: DBUserRole,
};

export type DBFeedbackStatusSuggestion = 'suggestion';
export type DBFeedbackStatus =
  DBFeedbackStatusSuggestion
  | 'planned'
  | 'in-progress'
  | 'live';
export type DBFeedback = {
  id: DBId,
  createdAt?: Date,
  title: string,
  slug: string,
  description: string,
  status: DBFeedbackStatus,
  userId: DBId,
  categoryId: DBId,
};

export type DBCategoryCategory = 'feature' | 'ui' | 'ux' | 'enhancemenet' | 'bug';
export type DBCategoryDisplay = 'Feature' | 'UI' | 'UX' | 'Enhancement' | 'Bug';
export type DBCategory = {
  id: DBId,
  category: DBCategoryCategory,
  display: DBCategoryDisplay,
};

export type DBComment = {
  id: DBId,
  createdAt?: Date,
  content: string,
  userId: DBId,
  feedbackId: DBId,
  feedbackCommentParentId: DBId | null,
};
