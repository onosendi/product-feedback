import { DBUserRole } from './database';

//
// Auth
//
export interface AuthResponse {
  role: DBUserRole;
  token: string;
  username: string;
}
