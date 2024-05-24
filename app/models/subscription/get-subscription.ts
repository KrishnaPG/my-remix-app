import type { User, Subscription } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function getSubscriptionById(id: Subscription['id']) {
  return db.subscription.findUnique({
    where: { id },
  })
}

export async function getSubscriptionByUserId(userId: User['id']) {
  return db.subscription.findUnique({
    where: { userId },
  })
}
