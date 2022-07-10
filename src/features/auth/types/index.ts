export type AuthUser = {
  id: string;
  sessionId: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  email_verified: boolean;
  gravatarEmail?: string;
  phone_number: string;
  phone_number_verified: boolean;
  roles: string[];
  logoutUrl: string;
  updated_at: string;
  created_at: string;
};
