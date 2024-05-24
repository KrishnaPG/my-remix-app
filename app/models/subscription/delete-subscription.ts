import type { Subscription } from '@prisma/client'
import { prisma as db } from '#app/utils/db.server'

export async function deleteSubscriptionById(id: Subscription['id']) {
  return db.subscription.delete({
    where: { id },
  })
}
