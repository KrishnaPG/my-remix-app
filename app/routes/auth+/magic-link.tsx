import type { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '#app/services/auth/auth.server'

import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/account+/_layout.js'
import { ROUTE_PATH as LOGIN_PATH } from '#app/routes/auth+/login'

export const ROUTE_PATH = '/auth/magic-link' as const

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate('TOTP', request, {
    successRedirect: DASHBOARD_PATH,
    failureRedirect: LOGIN_PATH,
  })
}
