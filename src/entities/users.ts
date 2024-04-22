
export type DataPassword = {
  hash: string
  salt: string
} 

export class User {
  constructor(
    readonly name: string,
    readonly email: string,
    public password: DataPassword | string
  ) {}
}