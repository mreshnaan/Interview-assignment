import prisma from '../utils/prisma-client'
import bcrypt from 'bcrypt'

async function main(): Promise<any> {
  const electronicsCategory = await prisma.category.create({
    data: {
      id: 'b4a2b40c-4bfa-4c1a-936f-81d8b02d5728',
      name: 'Electronics',
    },
  })

  const clothingCategory = await prisma.category.create({
    data: {
      id: 'c5d6d58e-3e5f-42f7-88a0-49055c3b073b',
      name: 'Clothing',
    },
  })

  const product = await prisma.product.createMany({
    data: [
      {
        id: '8a9c87a1-ade7-4f0e-bb7e-60fd15a89c8a',
        name: 'Smartphone',
        description: 'A high-end smartphone with a great camera',
        price: 699.99,
        categoryId: electronicsCategory.id,
        image: 'https://picsum.photos/300/300',
      },
      {
        id: 'c845bc46-20e5-4aeb-b372-2c6c84dc0f64',
        name: 'Laptop',
        description: 'A powerful laptop for gaming and productivity',
        price: 1299.99,
        categoryId: electronicsCategory.id,
        image: 'https://picsum.photos/300/300',
      },
      {
        name: 'T-Shirt',
        description: 'A comfortable cotton t-shirt',
        price: 19.99,
        categoryId: clothingCategory.id,
        image: 'https://picsum.photos/300/300',
      },
      {
        name: 'Jeans',
        description: 'Stylish denim jeans',
        price: 49.99,
        categoryId: clothingCategory.id,
        image: 'https://picsum.photos/300/300',
      },
    ],
  })
  const hashedPassowrd = await bcrypt.hash('password123' as string, 10)

  // Create some users
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'user1@example.com',
        password: hashedPassowrd,
      },
      {
        email: 'user2@example.com',
        password: hashedPassowrd,
      },
    ],
  })

  console.log(
    'Seed data has been created.',
    users,
    product,
    electronicsCategory,
    clothingCategory,
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
