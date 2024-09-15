import { type Request, type Response } from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  checkProductExistByName,
  checkCategoryExist,
} from '../services/product.service'
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../helpers/responseHelpers'
import {
  COMMON_VALIDATION_MESSAGES,
  HTTP_STATUS_CODE,
} from '../utils/constants'
import { type ICreateRequest } from '../types/products.type'

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const {
      page = 1,
      pageSize = 10,
      query,
      minPrice,
      maxPrice,
      categoryIds,
    } = req.query
    const parsedPage = Number(page)
    const parsedPageSize = Number(pageSize)
    const skip = (parsedPage - 1) * parsedPageSize

    const parsedMinPrice = Number(minPrice)
    const parsedMaxPrice = Number(maxPrice)

    const { products, totalCount } = await getAllProducts(
      skip,
      parsedPageSize,
      query as string,
      parsedMinPrice,
      parsedMaxPrice,
      categoryIds,
    )
    if (products.length <= 0 || !products) {
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.NOT_FOUND_RESPONSE_CODE,
        COMMON_VALIDATION_MESSAGES.PRODUCT_NOT_FOUND,
      )
    }
    const totalPages = Math.ceil(totalCount / parsedPageSize)

    return SUCCESS_RESPONSE(
      res,
      true,
      HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
      products,
      COMMON_VALIDATION_MESSAGES.SUCCESS_RETRIEVED,
      {
        totalPages,
        currentPage: parsedPage,
        totalResults: totalCount,
        resultsPerPage: parsedPageSize,
      },
    )
  } catch (error: any | unknown) {
    console.log('Error ocuured in get products :', error)
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

export const getProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
    const products = await getProductById(id)
    if (!products) {
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
      products,
      COMMON_VALIDATION_MESSAGES.SUCCESS_RETRIEVED,
    )
  } catch (error: any | unknown) {
    console.log('Error ocuured in get product :', error)
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

export const createNewProduct = async (
  req: ICreateRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { name, description, price, categoryId, image } = req.body
    const isCategoryExists = await checkCategoryExist(categoryId)
    if (!isCategoryExists) {
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE,
        COMMON_VALIDATION_MESSAGES.INVALID_CATEGORY,
      )
    }
    const isProductExists = await checkProductExistByName(name)
    if (isProductExists) {
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE,
        COMMON_VALIDATION_MESSAGES.PRODUCT_EXIST,
      )
    }
    const newProduct = await createProduct(
      name,
      description,
      price,
      categoryId,
      image,
    )

    return SUCCESS_RESPONSE(
      res,
      true,
      HTTP_STATUS_CODE.CREATE_RESPONSE_CODE,
      newProduct,
      COMMON_VALIDATION_MESSAGES.PRODUCT_CREATED,
    )
  } catch (error: any | unknown) {
    console.log('Error ocuured in create product :', error)
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
