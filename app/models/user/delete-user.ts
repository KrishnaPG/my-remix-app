import type { User } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function deleteUserById(id: User['id']) {
  return db.user.delete({
    where: { id },
  })
}
