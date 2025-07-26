"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Companions', href: '/companions'},
    {label: 'My Journey', href: '/profile'},
    {label: 'Subscription', href: '/subscription'},
]

interface NavItemsProps {
  className?: string
  onItemClick?: () => void
}

const NavItems = ({ className, onItemClick }: NavItemsProps) => {
    const pathName = usePathname()

    return (
        <nav className={cn('flex gap-8 items-center', className)}>
            {navItems.map((item) => (
                <Link 
                    key={item.label} 
                    href={item.href} 
                    className={cn(
                        'hover:text-primary transition-colors',
                        pathName === item.href && 'text-primary font-semibold'
                    )}
                    onClick={onItemClick}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems