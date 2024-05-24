import type { Subscription } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function createSubscription(
  subscription: Omit<Subscription, 'createdAt' | 'updatedAt'>,
) {
  return db.subscription.create({
    data: { ...subscription },
  })
}
