import { User } from '../../../entities/users'
import { IDatabaseAuth } from './i_database_auth'

export class ModelAuth implements IDatabaseAuth {

  constructor(
    private databaseAdapter: IDatabaseAuth
  ) {}

  // USERS
  async findUser (email: string){
    return this.databaseAdapter.findUser(email)
  }

  addUser(user: User): void {
    this.databaseAdapter.addUser(user)
    // Add novo usuario no DB
  }

  userAlreadyExists(user: User): Promise<Boolean> {
    return this.databaseAdapter.userAlreadyExists(user)
  }
}