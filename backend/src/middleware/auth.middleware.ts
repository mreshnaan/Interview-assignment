/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type Request, type Response, type NextFunction } from 'express'
import { ERROR_RESPONSE } from '../helpers/responseHelpers'
import { HTTP_STATUS_CODE } from '../utils/constants'
import jwt from 'jsonwebtoken'
import { config } from '../config'

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const token = req.headers.authorization?.split('Bearer ')[1]?.trim()

  if (token) {
    jwt.verify(token, config.api.jwtSecret, (err, user) => {
      if (err) {
        return ERROR_RESPONSE(
          res,
          false,
          HTTP_STATUS_CODE.FORBIDDEN_RESPONSE_CODE,
          'Forbidden',
        )
      }

      console.log('Valid user:', user)
      return next()
    })
  } else {
    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.UNAUTHORIZED_RESPONSE_CODE,
      'Unauthorized',
    )
  }
}

export default authMiddleware
