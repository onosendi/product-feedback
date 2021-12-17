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
type AuthUserID = string | undefined;

interface JWTDecodePayload {
  iat: string;
  token: string;
  userId: string;
}

interface AuthResponse {
  role: DBUserRole;
  token: string;
  username: DBUsername;
}
