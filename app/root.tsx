import type { MetaFunction, LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import type { Theme } from '#app/utils/hooks/use-theme'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { json } from '@remix-run/node'
import { useChangeLanguage } from 'remix-i18next/react'
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { authenticator } from '#app/services/auth/auth.server'
import { useNonce } from '#app/utils/hooks/use-nonce'
import { getHints } from '#app/utils/hooks/use-hints'
import { prisma } from '#app/utils/db.server'
import { getTheme, useTheme } from '#app/utils/hooks/use-theme'
import { getToastSession } from '#app/utils/toast.server'
import { csrf } from '#app/utils/csrf.server'
import { honeypot } from '#app/utils/honeypot.server'
import { combineHeaders, getDomainUrl } from '#app/utils/misc.server'
import { siteConfig } from '#app/utils/constants/brand'
import { useToast } from '#app/components/toaster'
import { Toaster } from '#app/components/ui/sonner'
import { ClientHintCheck } from '#app/components/misc/client-hints'
import { GenericErrorBoundary } from '#app/components/misc/error-boundary'
import i18nServer, { localeCookie } from '#app/services/i18n/i18n.server'

//Ref: https://github.com/sergiodxa/remix-utils?tab=readme-ov-file#external-scripts
import { ExternalScripts } from 'remix-utils/external-scripts'

import TailwindCSS from './root.css?url'

export const handle = { i18n: ['translation'] }

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? `${siteConfig.siteTitle}` : `Error | ${siteConfig.siteTitle}` },
    {
      name: 'description',
      content: siteConfig.siteDescription,
    },
  ]
}

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: TailwindCSS },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await authenticator.isAuthenticated(request)
  const user = sessionUser?.id
    ? await prisma.user.findUnique({
        where: { id: sessionUser?.id },
        include: {
          image: { select: { id: true } },
          roles: { select: { name: true } },
        },
      })
    : null

  const locale = await i18nServer.getLocale(request)
  const { toast, headers: toastHeaders } = await getToastSession(request)
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken()

  return json(
    {
      user,
      locale,
      toast,
      csrfToken,
      honeypotProps: honeypot.getInputProps(),
      requestInfo: {
        hints: getHints(request),
        origin: getDomainUrl(request),
        path: new URL(request.url).pathname,
        userPrefs: { theme: getTheme(request) },
      },
    } as const,
    {
      headers: combineHeaders(
        { 'Set-Cookie': await localeCookie.serialize(locale) },
        toastHeaders,
        csrfCookieHeader ? { 'Set-Cookie': csrfCookieHeader } : null,
      ),
    },
  )
}

function Document({
  children,
  nonce,
  lang = 'en',
  dir = 'ltr',
  theme = 'light',
}: {
  children: React.ReactNode
  nonce: string
  lang?: string
  dir?: 'ltr' | 'rtl'
  theme?: Theme
}) {
  return (
    <html
      lang={lang}
      dir={dir}
      className={`${theme} overflow-x-hidden`}
      style={{ colorScheme: theme }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ClientHintCheck nonce={nonce} />
        <Meta />
        <Links />
        <script src="/settings.js"></script>
      </head>
      <body className="h-auto w-full">
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <Toaster closeButton position="bottom-center" theme={theme} />

        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&family=Press+Start+2P&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital@0;1&display=swap"
          rel="stylesheet"></link>
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const { locale, toast, csrfToken, honeypotProps } = useLoaderData<typeof loader>()

  const nonce = useNonce()
  const theme = useTheme()

  // Updates the i18n instance language.
  useChangeLanguage(locale)

  // Renders toast (if any).
  useToast(toast)

  return (
    <Document nonce={nonce} theme={theme} lang={locale ?? 'en'}>
      <AuthenticityTokenProvider token={csrfToken}>
        <HoneypotProvider {...honeypotProps}>
          <Outlet />
        </HoneypotProvider>
      </AuthenticityTokenProvider>
    </Document>
  )
}

export function ErrorBoundary() {
  const nonce = useNonce()
  const theme = useTheme()

  return (
    <Document nonce={nonce} theme={theme}>
      <GenericErrorBoundary
        statusHandlers={{
          403: ({ error }) => (
            <p>You are not allowed to do that: {error?.data.message}</p>
          ),
        }}
      />
    </Document>
  )
}
