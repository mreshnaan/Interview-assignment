import { type Request } from 'express'

export interface ICreateRequest extends Request {
  body: {
    name: string
    description: string
    price: number
    categoryId: string
    image: string
  }
}
