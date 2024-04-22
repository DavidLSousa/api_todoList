import jwt from 'jsonwebtoken'
import { IAuth } from './i_authenticator'

export class JWTAdapter implements IAuth {
  private secret = String(process.env.SECRET)
  private exp = '1d'

  sign(email: string): string {
    try {
      return jwt.sign(
        { email }, 
        this.secret, 
        { expiresIn: this.exp}
      )
      
    } catch (error) {
      throw new Error('ERRO na criação do token')
    }
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, this.secret)

    } catch (error) {
      return null
    }
  }
}
