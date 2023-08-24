
"use client"
import React from 'react'
import Link from 'next/link'
import Logo from '@/public/logo.jpeg'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
    const MotionLink = motion(Link);

    const iconMotionVariants = {
        animate: {
            opacity: [0, 1],
            transition: {
                type: "just",
                duration: 1
            }
        },
        hover: {
            y: -3,
            scale: 1.2,
            transition: {
                type: "spring",
                duration: 0.3
            }
        }
    }

    return (
        <div className="py-10 border-t-4 border-light px-6 md:px-16 lg:px-32 bg-dark grid grid-cols-9 gap-3">
            <div className='flex items-center justify-center col-span-3 min-[400px]:col-span-2 lg:col-span-1'>
                <Link href={"/"} >
                    <Image src={Logo} alt='Logo' className='h-20 w-20 rounded-full border-2 border-light' />
                </Link>
            </div>
            <div className="contacttext font-medium text-xs min-[400px]:text-sm sm:text-base col-span-6 min-[400px]:col-span-7 lg:col-span-8 flex flex-col justify-center">
                <h1 className='font-bold'>© <Link href={"/"} className='underline underline-offset-4 text-adventure'>otakuuniverse.vercel.app</Link> All rights reserved.</h1>
                <p className='hidden md:block'>we do not store any files on our server. Our website only provides links to media content that is hosted on third-party services. A big credit goes to <strong>kitsuApi</strong> which provides valuable data for free.</p>
            </div>
        </div>
    )
}
