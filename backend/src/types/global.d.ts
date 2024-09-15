// custom.d.ts
import { type JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      jwt?: JwtPayload // Use JwtPayload directly here
    }
  }
}
