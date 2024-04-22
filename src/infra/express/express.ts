import express from "express";
import { config } from "dotenv";
import { router } from "../routers/router";

import cookieParser from 'cookie-parser'

config()
export const app = express()

app.use(cookieParser())
app.use(express.json())

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5503')
  res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE'])
  res.setHeader('Access-Control-Allow-Headers', ['Content-Type'])
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  next()
})

// app.get('/cookie', (req, res) => {

//   res.cookie('cookieTest', 'test', { httpOnly: true, maxAge: 30 * 60 * 10000 })


//   const { cookies } = req
//   // console.log(req)
//   console.log(cookies)
//   res.status(200).json({ 'cookie': cookies })
// })

app.use(router)
