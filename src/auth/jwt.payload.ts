export interface JwtPayload {
    username: string;
    role: 'admin' | 'manager' | 'user';
    userId: string;
  }
  