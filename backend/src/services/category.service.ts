import prisma from '../utils/prisma-client'

export const getAllCategories = async (): Promise<
  Array<{ id: string; name: string; createdAt: Date; updatedAt: Date }>
> => {
  return await prisma.category.findMany({ orderBy: { name: 'asc' } })
}
