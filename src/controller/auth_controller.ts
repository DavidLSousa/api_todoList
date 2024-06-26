import { DataPassword, User } from "../entities/users";
import { IHttpContext } from "../infra/express/i_http_context";
import { ModelAuth } from "../modules/auth/model/auth_model";
import { MongoDBApapterAuth } from "../modules/auth/model/mongodb_adapter_auth";
import { AuthUser } from "../modules/auth/services/auth_services";
import { JWTAdapter } from "../modules/auth/services/jwt_adapter";
import { EncrypterService } from "../modules/encrypter/encrypter_service";
import { ScryptAdaper } from "../modules/encrypter/scrypt_adapter";


export class ControllerAuth {
  constructor(
    private express: IHttpContext
  ) {}

  private optionsCookies = {
    httpOnly: true,
    maxAge: 30 * 60 * 10000,
    sameSite: 'none',
    secure: true
  }

  async login () {
    const user = this.express.getRequest().body

    const DBAdapterAuth = new MongoDBApapterAuth()
    const userDB = await new ModelAuth(DBAdapterAuth).findUser(user.email)


    if (!userDB) return this.express
      .sendResponse(404, { userRegistered: Boolean(userDB) })

    // Checking Password is correct
    const scryptAdapter = new ScryptAdaper()
    const passwordIsValid = new EncrypterService(scryptAdapter)
      .checkPassword(String(user.password), userDB.password)
      
    if (!passwordIsValid)
      return this.express.sendResponse(401, { passwordInvalid: true }) 

    // Get new token
    const authAdapter = new JWTAdapter()
    const newToken = await new AuthUser(authAdapter).auth(user.email)

    // Send Response
    this.express.sendResponseWithCookieToken(
      newToken,
      this.optionsCookies
    )
    this.express.sendResponse(200, { userRegistered: Boolean(userDB) })
  }

  async signUp () {
    const user: User = this.express.getRequest().body

    // Checking if the user exists in the database 
    const DBAdapterAuth = new MongoDBApapterAuth()
    const userExists = await new ModelAuth(DBAdapterAuth).userAlreadyExists(user)

    if (userExists) return this.express
      .sendResponse(422, { userRegistered: userExists })
    
    // Encrypting password
    const scryptAdapter = new ScryptAdaper()
    const dataPassword: DataPassword = new EncrypterService(scryptAdapter)
      .hashPassword(String(user.password))

    user.password = dataPassword

    // Add User to database
    new ModelAuth(DBAdapterAuth).addUser(user)

    // Getting token
    const authAdapter = new JWTAdapter()
    const newToken = await new AuthUser(authAdapter).auth(user.email)

    this.express.sendResponseWithCookieToken(
      newToken,
      this.optionsCookies
    )
    this.express.sendResponse(200, { userRegistered: userExists })
  }

  async verifyToken () {
    const { token } = this.express.getRequest().cookies
    console.log('token: ', token)

    if (!token) return this.express.sendResponse(422, { tokenIsValid: false })
    
    const authAdapter = new JWTAdapter()
    const tokenIsValid = await new AuthUser(authAdapter).isAuth(token)
    console.log('tokenIsValid: ', tokenIsValid)

    return this.express.sendResponse(200, { tokenIsValid: true })
  }

  async logOut () {
    this.express.sendResponseWithCookieToken(
      'tokenInvalido',
      this.optionsCookies
    )
    return this.express.sendResponse(422, { userLogout: true })
  }
}