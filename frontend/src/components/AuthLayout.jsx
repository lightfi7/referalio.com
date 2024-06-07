import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="flex min-h-full pt-16 sm:py-28">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
        <Link href="https://referalio.com/" aria-label="Home">
          <Logo className="mx-auto h-10 w-auto" />
        </Link>
        <div className="relative mt-12 sm:mt-16">
          <h1 className="text-center text-2xl font-medium tracking-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-center text-lg text-gray-600">{subtitle}</p>
          )}
        </div>
        <div className="-mx-4 mt-10 flex-auto bg-white px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24">
          {children}
        </div>
      </div>
    </main>
  )
}
