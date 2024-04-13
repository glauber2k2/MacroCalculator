import MacroCalculator from '@/components/MacroCalculator'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="md:p-10 flex justify-center items-center h-full flex-col">
      <MacroCalculator />
      <p className="mt-4 text-xs opacity-80">
        &copy; Desenvolvido por{' '}
        <Link href={'https://glauber.vercel.app/'} className="underline">
          DevGlauber.
        </Link>
      </p>
    </div>
  )
}
