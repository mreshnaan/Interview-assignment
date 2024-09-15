import Joi, { type SchemaMap } from '@hapi/joi'

const getProductsSchema: SchemaMap = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1).optional(),
    pageSize: Joi.number().integer().min(1).default(10).optional(),
    query: Joi.string().optional().allow(''),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    categoryIds: Joi.array().items(Joi.string()).optional(),
  }),
}

const createProductSchema: SchemaMap = {
  body: Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    price: Joi.number().min(0).precision(2).required(), // Allows 0 and positive numbers
    categoryId: Joi.string().required(),
    image: Joi.string().uri().optional().allow(''),
  }),
}
const getProductByIdSchema: SchemaMap = {
  params: {
    id: Joi.string().min(1).required(),
  },
}

export { createProductSchema, getProductByIdSchema, getProductsSchema }
