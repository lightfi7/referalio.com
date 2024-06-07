import { Container } from '@/components/Container'
import { Logomark } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 md:flex-row lg:items-center lg:py-8">
          <div>
            <div className="flex items-center text-gray-900">
              <Logomark className="h-10 w-10 flex-none fill-cyan-500" />
              <div className="ml-4">
                <p className="text-base font-semibold">Referalio</p>
                <p className="mt-1 text-sm">Proivde best solution to find the affiliate programs</p>
              </div>
            </div>
          </div>
          <div className='pb-2'>
            <nav className="mt-11 flex-wrap flex gap-8">
              <NavLinks />
            </nav>
          </div>
          {/* <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6 sm:flex-row flex-col gap-4">
            <form className="flex w-full justify-center md:w-auto">
              <TextField
                type="email"
                aria-label="Email address"
                placeholder="Email address"
                autoComplete="email"
                required
                className="w-60 min-w-0 shrink"
              />
            </form>
            <Button type="submit" color="cyan" className="flex-none">
              <span className="hidden lg:inline">Join our newsletter</span>
              <span className="lg:hidden">Join newsletter</span>
            </Button>
          </div> */}
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
