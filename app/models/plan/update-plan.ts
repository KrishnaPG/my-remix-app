import type { Plan } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function updatePlanById(id: Plan['id'], plan: Partial<Plan>) {
  return db.plan.update({
    where: { id },
    data: { ...plan },
  })
}
