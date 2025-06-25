export interface LogInResponse {
  user: UserApi;
  token: string;
}

export interface UserApi {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}

export interface SignUpUserDto {
  fullName: string;
  email: string;
  password: string;
}
