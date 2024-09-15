import Joi, { type SchemaMap } from '@hapi/joi'

const loginSchema: SchemaMap = {
  body: Joi.object({
    email: Joi.string().email().required(), // Validates email format and ensures it's required
    password: Joi.string().min(6).required(), // Ensures password is at least 6 characters long and required
  }),
}

export { loginSchema }
