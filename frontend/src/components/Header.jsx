'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import { useRouter, redirect } from 'next/navigation'
import { ChevronUpIcon, MenuIcon } from '@/assets/icons'
import { jwtDecode, setSession } from '@/app/(auth)/utils'
import Banner from './Banner'
import { setOffline } from '@/api'

export function Header() {

  const [isLogined, setIsLogined] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const currentUserToken = localStorage.getItem('accessToken');
    if (currentUserToken) {
      setIsLogined(true);
    }
  }, [isLogined])

  const doAuth = async () => {
    if (isLogined == true) {
      const { sub } = jwtDecode(localStorage.getItem('accessToken'))
      await setOffline({ email: sub })
      setSession(null, null);
      setIsLogined(false);
      router.push('./sign-in')
    }
    else {
      router.push("./sign-in")
    }
  }
  const MobileNavLink = (props) => {
    return (
      <Popover.Button
        as={Link}
        className="block text-base leading-7 tracking-tight text-gray-700"
        {...props}
      />
    )
  }

  return (
    <>
      <Banner />
      <header>
        <nav>
          <Container className="relative flex justify-between py-8">
            <div className="relative z-30 flex items-center gap-16">
              <Link href="https://referalio.com/" aria-label="Home">
                <Logo className="h-10 w-auto" />
              </Link>
              <div className="hidden lg:flex lg:gap-10">
                <NavLinks />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Popover className="lg:hidden">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className="relative z-30 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                      aria-label="Toggle site navigation"
                    >
                      {({ open }) =>
                        open ? (
                          <ChevronUpIcon className="h-6 w-6" />
                        ) : (
                          <MenuIcon className="h-6 w-6" />
                        )
                      }
                    </Popover.Button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <>
                          <Popover.Overlay
                            static
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                          />
                          <Popover.Panel
                            static
                            as={motion.div}
                            initial={{ opacity: 0, y: -32 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              y: -32,
                              transition: { duration: 0.2 },
                            }}
                            className="absolute inset-x-0 top-0 z-20 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                          >
                            <div className="space-y-4">
                              <MobileNavLink href="/#features">
                                Features
                              </MobileNavLink>
                              <MobileNavLink href="/reviews">
                                Reviews
                              </MobileNavLink>
                              <MobileNavLink href="/#pricing">
                                Pricing
                              </MobileNavLink>
                              <MobileNavLink href="/#faqs">FAQs</MobileNavLink>
                              <MobileNavLink href="/">List</MobileNavLink>
                            </div>
                            <div className="mt-8 flex flex-col gap-4">
                              <Button onClick={() => doAuth()} variant="outline">
                                {isLogined ? "Logout" : "Log in"}
                              </Button>
                            </div>
                          </Popover.Panel>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Popover>
              {/* <p>{localStorage.getItem("currentUserName")}</p> */}
              <Button onClick={() => doAuth()} className="hidden lg:block">
                {isLogined ? localStorage.getItem("currentUserName") + " Logout" : "Log in"}
              </Button>
            </div>
          </Container>
        </nav>
      </header>
    </>
  )
}
