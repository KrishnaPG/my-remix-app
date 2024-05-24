import type { User } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function createUser(user: Pick<User, 'email'>) {
  return db.user.create({
    data: { ...user },
  })
}
