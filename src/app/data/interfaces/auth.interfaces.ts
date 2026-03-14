export interface TokenResponse {
  accessToken: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface loginRequest {
  email: string;
  password: string;
}
