import { MongoClient } from 'mongodb'
import { IDatabaseAuth } from './i_database_auth'
import { User } from '../../../entities/users'

export class MongoDBApapterAuth implements IDatabaseAuth {
  private PASSWORD_BD = process.env.PASSWORD_BD
  private USER_BD = process.env.USER_BD

  private urlConnectionBD = `mongodb+srv://${this.USER_BD}:${this.PASSWORD_BD}@users.kodntjx.mongodb.net/?retryWrites=true&w=majority`

  private client = new MongoClient(this.urlConnectionBD)
  private db = 'userData'
  private collection = 'users' 

  // USERS
  async findUser (email: string): Promise<User> {
    try {
      const database = this.client.db(this.db)
      const users = database.collection(this.collection)

      return await users.findOne({ email: email })

    } catch (error) {
      throw new Error('Não foi possivel achar no BD')
    }
  }

  async addUser(user: User): Promise<void> {
    try {
      const { email, password, name } = user
      const newUser = new User(name, email, password)

      const database = this.client.db(this.db)
      const users = database.collection(this.collection)

      await users.insertOne(newUser)
    } catch (error) {
      throw new Error('Não foi add user ao BD')
    }
  }

  async userAlreadyExists(user: User): Promise<Boolean> {
    try {
      const { email } = user
      const database = this.client.db(this.db)
      const users = database.collection(this.collection)
      
      const userExists = await users.findOne({ email: email })

      return userExists ? true : false

    } catch (error) {
      throw new Error('Não foi possivel achar no BD')
    }
  }
}