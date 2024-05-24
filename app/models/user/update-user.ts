import type { User } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function updateUserById(id: User['id'], user: Partial<User>) {
  return db.user.update({
    where: { id },
    data: { ...user },
  })
}
