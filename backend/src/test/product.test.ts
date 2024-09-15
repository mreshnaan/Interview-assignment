import request from 'supertest'
import app from '../index'
import {
  COMMON_VALIDATION_MESSAGES,
  HTTP_STATUS_CODE,
} from '../utils/constants'
import prisma from '../utils/prisma-client'

// please seed before testing
// catgory ids
const clothingCategoryId = 'c5d6d58e-3e5f-42f7-88a0-49055c3b073b'
// proudct ids
const smartphoneProductId = '8a9c87a1-ade7-4f0e-bb7e-60fd15a89c8a'
const productName = 'Laptop'
const productDescription = 'Laptop'
// Helper function to delete a product by ID using Prisma
const deleteProduct = async (name: string): Promise<void> => {
  await prisma.product.deleteMany({
    where: {
      name,
    },
  })
}

describe('Product API', () => {
  beforeAll(async () => {
    // Clean up any existing product with the name 'New Product1'
    await deleteProduct('New Product')
  })

  it('should create a new product', async () => {
    const newProduct = {
      name: 'New Product',
      description: 'Description of the new product',
      price: 100,
      categoryId: clothingCategoryId,
    }
    const response = await request(app)
      .post('/api/v1/products/create')
      .send(newProduct)

    expect(response.status).toBe(HTTP_STATUS_CODE.CREATE_RESPONSE_CODE)
    expect(response.body.status).toBe(true)
    expect(response.body.data).toHaveProperty('name', newProduct.name)
  })

  it('should return 400 for trying to create a product with an existing name', async () => {
    const newProduct = {
      name: productName,
      description: 'Description of the new product',
      price: 100,
      categoryId: clothingCategoryId,
    }
    const response = await request(app)
      .post('/api/v1/products/create')
      .send(newProduct)

    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE)
    expect(response.body.status).toBe(false)
    expect(response.body.error).toBe(COMMON_VALIDATION_MESSAGES.PRODUCT_EXIST)
  })

  it('should return 400 for invalid category creation data', async () => {
    const invalidProduct = {
      name: 'test',
      description: 'test',
      price: 100,
      categoryId: 'invalidCategoryId',
    }
    const response = await request(app)
      .post('/api/v1/products/create')
      .send(invalidProduct)

    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE)
    expect(response.body.status).toBe(false)
    expect(response.body.error).toBe(
      COMMON_VALIDATION_MESSAGES.INVALID_CATEGORY,
    )
  })

  it('should return 400 for negative value in price creation data', async () => {
    const invalidProduct = {
      name: 'test',
      description: 'test',
      price: -100,
      categoryId: clothingCategoryId,
    }
    const response = await request(app)
      .post('/api/v1/products/create')
      .send(invalidProduct)

    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE)
    expect(response.body.status).toBe(false)
    expect(response.body.error).toBe(
      '"body.price" must be larger than or equal to 0',
    )
  })

  it('should return 400 for empty string creation data', async () => {
    const invalidProduct = {
      name: '',
      description: '',
      price: 100,
      categoryId: '',
    }
    const response = await request(app)
      .post('/api/v1/products/create')
      .send(invalidProduct)

    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE)
    expect(response.body.status).toBe(false)
    expect(response.body.error).toBe('"body.name" is not allowed to be empty')
  })

  it('should retrieve all products with pagination', async () => {
    const response = await request(app)
      .get('/api/v1/products/all')
      .query({ page: 1, pageSize: 10 })

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(true)
    expect(response.body.data).toBeInstanceOf(Array)
  })
  it('should retrieve all products with pagination filter by name', async () => {
    const response = await request(app)
      .get('/api/v1/products/all')
      .query({ page: 1, pageSize: 10, query: productName })

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(true)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  it('should retrieve all products with pagination filter by description', async () => {
    const response = await request(app)
      .get('/api/v1/products/all')
      .query({ page: 1, pageSize: 10, query: productDescription })

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(true)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  it('should retrieve all products with pagination filter by mix and max', async () => {
    const response = await request(app)
      .get('/api/v1/products/all')
      .query({ page: 1, pageSize: 10, minPrice: 10, maxPrice: 100 })

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(true)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  it('should retrieve a specific product by ID', async () => {
    const response = await request(app).get(
      `/api/v1/products/by/${smartphoneProductId}`,
    )

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(true)
    expect(response.body.data).toHaveProperty('id', smartphoneProductId)
  })

  it('should return 404 for a non-existent product ID', async () => {
    const invalidProductId = 'invalidProductId'
    const response = await request(app).get(
      `/api/v1/products/by/${invalidProductId}`,
    )

    expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND_RESPONSE_CODE)
    expect(response.body.status).toBe(false)
    expect(response.body.error).toBe(
      COMMON_VALIDATION_MESSAGES.PRODUCT_NOT_FOUND,
    )
  })

  afterAll(async () => {})
})
