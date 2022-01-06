import type { DBCategoryCategory, DBFeedbackStatus } from './database';

export type APILogin = {
  username: string,
  password: string,
};

export type APIRegister = {
  username: string,
  password: string,
  passwordConfirm: string,
};

export type APICreateOrUpdateFeedback = {
  category: DBCategoryCategory,
  description: string,
  status?: DBFeedbackStatus,
  title: string,
};

export type APICreateComment = {
  content: string,
};
