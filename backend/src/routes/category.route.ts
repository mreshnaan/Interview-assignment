import express from 'express'
import { getCategories } from '../controllers/category.controller'
import authMiddleware from '../middleware/auth.middleware'

const router = express.Router()

/**
 * @swagger
 * /api/v1/category/all:
 *   get:
 *     summary: Retrieve all categories
 *     tags:
 *       - Category Endpoints
 *     responses:
 *       200:
 *         description: Successful retrieval of all categories
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

router.get('/all', authMiddleware, getCategories)

export default router
