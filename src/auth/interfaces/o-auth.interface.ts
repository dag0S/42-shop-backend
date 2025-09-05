import { Request } from "express";

interface OAuthUser {
  email: string;
  name: string;
  picture: string;
}

export interface OAuthRequest extends Request {
  user: OAuthUser;
}
