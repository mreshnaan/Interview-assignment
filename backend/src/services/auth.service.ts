import prisma from '../utils/prisma-client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { type User } from '@prisma/client'

interface ITokenUser {
  id?: any
  email?: string
}

export const generateToken = (user: ITokenUser): string | null => {
  try {
    // Generate a JWT token with user details
    const token = jwt.sign(user, config.api.jwtSecret, {
      expiresIn: '1d',
    })

    return token
  } catch (error) {
    console.error(error)
    return null
  }
}

export const checkUserExist = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  console.log('user :', user)

  return user
}

export const isPasswordValid = async (
  userInputPassword: string,
  userDbpassword: string,
): Promise<any> => {
  console.log(userInputPassword)
  console.log(userDbpassword)
  const isValid = await bcrypt.compare(userInputPassword, userDbpassword)
  console.log('isValid :', isValid)
  return isValid
}
