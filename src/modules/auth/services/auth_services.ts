import { IAuth } from "./i_authenticator"

export class AuthUser {
  constructor(
    private authenticator: IAuth
  ) {}

  auth = async (emailUser: string): Promise<string> => 
    this.authenticator.sign(emailUser)

  isAuth = async (token: string): Promise<string | undefined> => 
    this.authenticator.verify(token)
  
}