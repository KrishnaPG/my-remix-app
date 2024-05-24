import type { Plan } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function createPlan(plan: Omit<Plan, 'createdAt' | 'updatedAt'>) {
  return db.plan.create({
    data: { ...plan },
  })
}
