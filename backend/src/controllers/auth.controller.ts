import { type Request, type Response } from 'express'
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../helpers/responseHelpers'
import {
  checkUserExist,
  generateToken,
  isPasswordValid,
} from '../services/auth.service'
import {
  COMMON_VALIDATION_MESSAGES,
  HTTP_STATUS_CODE,
} from '../utils/constants'

interface IRequestLogin extends Request {
  body: {
    email: string
    password: string
  }
}

export const loginUser = async (
  req: IRequestLogin,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body

    // Check if the user exists
    const user = await checkUserExist(email)
    if (!user) {
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.UNAUTHORIZED_RESPONSE_CODE,
        'Incorrect Email or Password. Please try again.',
      )
    }

    // Check if the password is valid
    const isValid = await isPasswordValid(password, user.password)
    if (!isValid) {
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.UNAUTHORIZED_RESPONSE_CODE,
        'Incorrect Email or Password. Please try again.',
      )
    }

    // Generate a token
    const token = generateToken({ id: user.id, email: user.email })

    return SUCCESS_RESPONSE(
      res,
      true,
      HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
      {
        token,
        user: {
          email: user.email,
        },
      },
      COMMON_VALIDATION_MESSAGES.SUCCESS_RETRIEVED,
    )
  } catch (error: any) {
    console.error('Error occurred during user login:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE,
      errorMessage,
    )
  }
}
