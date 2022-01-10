import { UserData } from './twitter';

export interface AuthUserType extends UserData {
  email?: string;
  provider: string;
  iat: number;
  exp: number;
}
