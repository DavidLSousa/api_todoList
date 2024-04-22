import { DataPassword } from "../../entities/users";
import { IEncrypter } from "./i_encrypter";

export class EncrypterService implements IEncrypter {
  constructor (
    private encrypter: IEncrypter
  ) {}

  hashPassword(password: string): DataPassword {
    try {
      return this.encrypter.hashPassword(password)

    } catch (error) {
      return error.message
    }
  }

  checkPassword(password: string, dataPassword: DataPassword): Boolean {
    try {
      return this.encrypter.checkPassword(password, dataPassword)

    } catch (error) {
      return error.message
    }
  }
}