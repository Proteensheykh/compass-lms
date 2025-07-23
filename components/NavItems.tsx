"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Companions', href: '/companions'},
    {label: 'My Journey', href: '/profile'},
]

const NavItems = () => {

    const pathName = usePathname()

  return (
    <nav className='flex gap-8 items-center'>
        {navItems.map((item) => (
            <Link 
            key={item.label} 
            href={item.href} 
            className={cn(pathName === item.href && 'text-primary font-semibold')}
            >
                {item.label}
            </Link>
        ))}
    </nav>
  )
}

export default NavItems