import express from 'express'
import {
  getProduct,
  getProducts,
  createNewProduct,
} from '../controllers/product.controller'
import validationSchema from '../middleware/validation.schema.middleware'
import {
  getProductByIdSchema,
  createProductSchema,
  getProductsSchema,
} from '../validationSchema/product.schema'
import authMiddleware from '../middleware/auth.middleware'

const router = express.Router()

/**
 * @swagger
 * /api/v1/products/all:
 *   get:
 *     summary: Retrieve all products
 *     tags:
 *       - Product Endpoints
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search term to filter products by name or description
 *       - in: query
 *         name: categoryIds
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Filter products by category IDs (optional). Array of category IDs.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: float
 *           default: 0
 *         description: Minimum price for filtering products (optional)
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: float
 *           default: Infinity
 *         description: Maximum price for filtering products (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Successful retrieval of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 error:
 *                   type: string
 */

router.get(
  '/all',
  authMiddleware,
  validationSchema(getProductsSchema),
  getProducts,
)

/**
 * @swagger
 * /api/v1/products/by/{id}:
 *   get:
 *     summary: Retrieve a specific product by ID
 *     tags:
 *       - Product Endpoints
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successful retrieval of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
router.get(
  '/by/:id',
  authMiddleware,
  validationSchema(getProductByIdSchema),
  getProduct,
)

/**
 * @swagger
 * /api/v1/products/create:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product Endpoints
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: A brief description of the product
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category the product belongs to
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                       format: float
 *                     categoryId:
 *                       type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, possibly due to invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
router.post(
  '/create',
  authMiddleware,
  validationSchema(createProductSchema),
  createNewProduct,
)

export default router
