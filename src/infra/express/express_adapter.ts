import { Router, Request, Response } from "express";
import { IHttpContext } from "./i_http_context";

export type typeReq = Request
export type typeRes = Response

export class ExpressAdapter implements IHttpContext {
  
  constructor(
    private req: Request, 
    private res: Response
  ) {}

  getRequest(): Request {
    return this.req
  }

  sendResponse(status: number, data: any): void {
    this.res.status(status).json(data)
  }

  sendResponseWithCookieToken(
    token: string, 
    options: object
  ): void {
    this.res.cookie('token', token, options)
  }
}

export class RouterAdapter {
  init() {
    return Router()
  }
}