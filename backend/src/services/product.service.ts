import { type Product } from '@prisma/client'
import prisma from '../utils/prisma-client'

export const getAllProducts = async (
  skip: number,
  pageSize: number,
  query: string,
  minPrice: number,
  maxPrice: number,
  categoryIds?: string[] | any,
): Promise<{ totalCount: number; products: Product[] }> => {
  // Construct filters based on provided query parameters
  const filters = {
    AND: [
      query
        ? {
            OR: [
              { name: { contains: query.toLocaleLowerCase() } },
              { description: { contains: query.toLocaleLowerCase() } },
            ],
          }
        : {},
      minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined && minPrice >= 0
                ? { gte: minPrice }
                : {}),
              ...(maxPrice !== undefined && maxPrice >= 0
                ? { lte: maxPrice }
                : {}),
            },
          }
        : {},
      categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0
        ? { categoryId: { in: categoryIds } }
        : {},
    ],
  }

  // Remove empty filters
  const ischeckFilterEmpty = Object.keys(filters).length === 0 ? {} : filters

  const [totalCount, products] = await prisma.$transaction([
    prisma.product.count({
      where: ischeckFilterEmpty,
    }),
    prisma.product.findMany({
      where: ischeckFilterEmpty,
      include: { category: true },
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return { totalCount, products }
}

export const getProductById = async (id: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  })
}

export const checkCategoryExist = async (
  categoryId: string,
): Promise<boolean> => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  })

  return category !== null
}

export const checkProductExistByName = async (
  name: string,
): Promise<boolean> => {
  const product = await prisma.product.findUnique({
    where: { name },
  })

  return product !== null
}

export const createProduct = async (
  name: string,
  description: string,
  price: number,
  categoryId: string,
  image: string,
): Promise<Product> => {
  return await prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId,
      image,
    },
  })
}
