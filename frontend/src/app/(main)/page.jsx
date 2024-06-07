'use client'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import CustomComponent from './components/customComponent'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IsLogined } from '@/utils/utils'
import { SearchProvider } from '@/provider/searchProvider'

export default function Page() {

    const router = useRouter()

    useEffect(() => {
        if (!IsLogined) router.push('/sign-in');
    }, [])

    return (
        <SearchProvider>
            <Header />
            <CustomComponent />
            <Footer />
        </SearchProvider>
    )
}
