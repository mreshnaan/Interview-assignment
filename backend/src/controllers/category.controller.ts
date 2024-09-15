import { type Request, type Response } from 'express'

import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../helpers/responseHelpers'
import {
  COMMON_VALIDATION_MESSAGES,
  HTTP_STATUS_CODE,
} from '../utils/constants'
import { getAllCategories } from '../services/category.service'

export const getCategories = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const categories = await getAllCategories()
    if (categories.length <= 0 || !categories) {
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.NOT_FOUND_RESPONSE_CODE,
        COMMON_VALIDATION_MESSAGES.PRODUCT_NOT_FOUND,
      )
    }
    return SUCCESS_RESPONSE(
      res,
      true,
      HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
      categories,
      COMMON_VALIDATION_MESSAGES.SUCCESS_RETRIEVED,
    )
  } catch (error: any | unknown) {
    console.log('Error ocuured in get categories :', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE,
      errorMessage,
    )
  }
}
