//
// Database
//
type DBUsername = string;
type DBUserRole = 'user' | 'admin';
interface DBUser {
  id: string;
  createdAt: Date;
  lastLogin: Date;
  username: DBUsername;
  password: string;
  firstName: string;
  lastName: string;
  picture: string;
  role: DBUserRole;
}

//
// Auth
//
interface AuthResponse {
  role: DBUserRole;
  token: string;
  username: DBUsername;
}
