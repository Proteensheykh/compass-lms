'use client'

import Image from 'next/image'
import Link from 'next/link'
import NavItems from './NavItems'
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className='navbar relative'>
        <Link href='/'>
            <div className='flex items-center gap-2.5 cursor-pointer'>
                <Image src='/images/logo.svg' alt='Logo' width={46} height={44} />
            </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-8 items-center'>
            <NavItems />
            <SignedOut>
                <div className='flex gap-4'>
                    <SignInButton>
                        <button className='cursor-pointer btn-signin hover:bg-gray-900 hover:text-white'>Sign In</button>
                    </SignInButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center gap-4'>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <button
                onClick={toggleMobileMenu}
                className='flex flex-col justify-center items-center w-6 h-6 space-y-1'
                aria-label='Toggle mobile menu'
            >
                <span className={cn(
                    'block w-5 h-0.5 bg-current transition-all duration-300',
                    isMobileMenuOpen && 'rotate-45 translate-y-1.5'
                )}></span>
                <span className={cn(
                    'block w-5 h-0.5 bg-current transition-all duration-300',
                    isMobileMenuOpen && 'opacity-0'
                )}></span>
                <span className={cn(
                    'block w-5 h-0.5 bg-current transition-all duration-300',
                    isMobileMenuOpen && '-rotate-45 -translate-y-1.5'
                )}></span>
            </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className='md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50'>
                <div className='flex flex-col p-4 space-y-4'>
                    <NavItems 
                        className='flex-col items-start gap-4' 
                        onItemClick={closeMobileMenu}
                    />
                    <SignedOut>
                        <div className='pt-4 border-t border-gray-200'>
                            <SignInButton>
                                <button 
                                    className='cursor-pointer btn-signin hover:bg-gray-900 hover:text-white w-full'
                                    onClick={closeMobileMenu}
                                >
                                    Sign In
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </div>
            </div>
        )}
    </nav>
  )
}

export default Navbar