import { DataPassword } from "../../entities/users"

export interface IEncrypter {
  hashPassword (password: string ): DataPassword
  checkPassword(password: string, dataPassword: DataPassword): Boolean
}