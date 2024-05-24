import type { Plan } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function deletePlanById(id: Plan['id']) {
  return db.plan.delete({
    where: { id },
  })
}
