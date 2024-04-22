import { User } from "../../../entities/users"

export interface IDatabaseAuth {
  findUser(email: string): Promise<User>
  // findUser(email: string): any
  addUser(user: User): void
  userAlreadyExists(user: User): Promise<Boolean>
}