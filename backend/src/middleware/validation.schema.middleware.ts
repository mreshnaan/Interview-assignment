import {
  type Handler,
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import Joi, { type SchemaMap } from '@hapi/joi'
import { ERROR_RESPONSE } from '../helpers/responseHelpers'
import { HTTP_STATUS_CODE } from '../utils/constants'

type SuppertedKeys = 'params' | 'body' | 'query'

interface Options {
  params?: SchemaMap
  body?: SchemaMap
  query?: SchemaMap
}
type ExpressJoiValidate = (schemaOptions: Options) => Handler

const schemaSupportKeys = ['params', 'body', 'query']

const validationSchema: ExpressJoiValidate = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      next()
      return
    }
    const obj: Options = {}

    schemaSupportKeys.forEach((key) => {
      const k: SuppertedKeys = key as SuppertedKeys

      if (schema[k]) {
        obj[k] = req[k]
      }
    })
    const joiSchema = Joi.object(schema)
    const { error } = joiSchema.validate(obj)

    const valid = error == null
    if (valid) {
      next()
      return
    }
    const { details } = error
    const message: string = details
      .map((i: { message: string }) => i.message)
      .join(',')

    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE,
      message,
    )
  }
}

export default validationSchema
