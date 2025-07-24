import Image from 'next/image'
import Link from 'next/link'
import NavItems from './NavItems'
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link href='/'>
            <div className='flex items-center gap-2.5 cursor-pointer'>
                <Image src='/images/logo.svg' alt='Logo' width={46} height={44} />
            </div>
        </Link>
        <div className='flex gap-8 items-center'>
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
    </nav>
  )
}

export default Navbar