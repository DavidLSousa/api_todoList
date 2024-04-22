export interface IAuth {
  sign(email: string): string
  verify(token: string): string
}