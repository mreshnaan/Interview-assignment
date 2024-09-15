export const STATUS_MESSAGE = {
  SUCCESS: 'Success',
  FAILED: 'Failed',
  SERVER_ERROR: 'Server error',
}

export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

export const HTTP_STATUS_CODE = {
  SUCCESS_RESPONSE_CODE: 200,
  CREATE_RESPONSE_CODE: 201,
  BAD_REQUEST_RESPONSE_CODE: 400,
  UNAUTHORIZED_RESPONSE_CODE: 401,
  FORBIDDEN_RESPONSE_CODE: 403,
  NOT_FOUND_RESPONSE_CODE: 404,
  CONFLICT_RESPONSE_CODE: 409,
  SERVER_INTERNAL_ERROR_RESPONSE_CODE: 500,
  NOT_IMPLEMENTED_RESPONSE_CODE: 500,
  BAD_GATEWAY_RESPONSE_CODE: 502,
}

export const COMMON_VALIDATION_MESSAGES = {
  SUCCESS_RETRIEVED: 'Product successfully retrieved.',
  PRODUCT_EXIST: 'This product name already exist.',
  INVALID_CATEGORY: 'Invalid category.',
  PRODUCT_CREATED: 'Product successfully created.',
  PRODUCT_UPDATED: 'Product successfully updated.',
  PRODUCT_DELETED: 'Product successfully deleted.',
  PRODUCT_NOT_FOUND: 'Product not found.',
}
