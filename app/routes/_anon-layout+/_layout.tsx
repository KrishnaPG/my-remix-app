import type { LoaderFunctionArgs } from '@remix-run/node'
import type { User } from '@prisma/client'

import { redirect, json } from '@remix-run/node'
import { useLoaderData, Outlet } from '@remix-run/react'
import { authenticator } from '#app/services/auth/auth.server'

import { Navigation } from '#app/components/navigation'
import { Footer } from '#app/components/footer'

type LoaderData = {
  user: User | null
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await authenticator.isAuthenticated(request)

  // Force redirect to /account on authenticated user.
  const url = new URL(request.url)
  if (session && url.pathname === '/') return redirect('/dashboard')

  return json<LoaderData>({ user: session })
}

export default function Layout() {
  // Check bellow info about why we are force casting <LoaderData>
  // https://github.com/remix-run/remix/issues/3931
  const { user } = useLoaderData() as LoaderData

  return (
    <div className="mx-auto flex h-screen flex-col items-center">
      {/* Background. */}
      <div className="blobs" />

      {/* Navigation. */}
      <Navigation user={user} />

      {/* Outlet. */}
      <Outlet />

      {/* Footer. */}
      <Footer />
    </div>
  )
}
