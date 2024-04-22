import { typeReq } from "./express_adapter"

export interface IHttpContext {
  getRequest(): typeReq
  sendResponse(status: number, data: any): void
  sendResponseWithCookieToken(token: string, options: object): void
}