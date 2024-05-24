import type { Subscription } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function updateSubscriptionById(
  id: Subscription['id'],
  subscription: Partial<Subscription>,
) {
  return db.subscription.update({
    where: { id },
    data: { ...subscription },
  })
}

export async function updateSubscriptionByUserId(
  userId: Subscription['userId'],
  subscription: Partial<Subscription>,
) {
  return db.subscription.update({
    where: { userId },
    data: { ...subscription },
  })
}
