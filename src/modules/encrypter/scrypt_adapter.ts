import { randomBytes, scryptSync } from "crypto";
import { IEncrypter } from "./i_encrypter";
import { DataPassword } from "../../entities/users";

export class ScryptAdaper implements IEncrypter {

  private KEYLEN_SCRYPT = Number(process.env.KEYLEN_SCRYPT)
  
  hashPassword(password: string ): DataPassword {
    const salt = randomBytes(this.KEYLEN_SCRYPT).toString('base64')
    
    const derivedKey = scryptSync(password, salt, this.KEYLEN_SCRYPT)
      .toString('base64')

    return { 
      hash: derivedKey,
      salt: salt
    }
  }

  checkPassword(password: string, dataPassword: DataPassword): Boolean {

    const derivedNewKey = scryptSync(password, dataPassword.salt, this.KEYLEN_SCRYPT)
      .toString('base64')

    return derivedNewKey === dataPassword.hash
  }
}