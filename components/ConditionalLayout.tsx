'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navigation />}
      <PageTransition>
        {children}
      </PageTransition>
      {!isAdminRoute && <Footer />}
    </>
  )
}

