import { type Response } from 'express'

interface IPagination {
  totalPages: number
  currentPage: number
  totalResults: number
  resultsPerPage: number
}

/**
 * Handles a successful API response.
 *
 * @param {CustomResponse} res - The response object to send the response with.
 * @param {boolean} status - send true or false in the response.
 * @param {number} statusCode - The HTTP status code to send in the response.
 * @param {*} data - The data to include in the response.
 * @param {string} message - The message to include in the response.
 * @param {IPagination | undefined} pagination - Optional pagination data.
 * @returns {Response} - The Express response object.
 */
export const SUCCESS_RESPONSE = (
  res: Response,
  status: boolean,
  statusCode: number,
  data: any,
  message: string,
  pagination?: IPagination,
): Response => {
  return res.status(statusCode).json({
    status,
    data,
    message,
    pagination,
  })
}

/**
 * Handles an error API response.
 *
 * @param {CustomResponse} res - The response object to send the response with.
 * @param {boolean} status - send true or false in the response.
 * @param {number} statusCode - The HTTP status code to send in the response.
 * @param {string} message - The error message to include in the response.
 * @returns {Response} - The Express response object.
 */
export const ERROR_RESPONSE = (
  res: Response,
  status: boolean,
  statusCode: number,
  message: string,
): Response => {
  return res.status(statusCode).json({ status, error: message })
}
