"use client"
import React from 'react'
import AnimateText from './AnimateText'
import { motion } from 'framer-motion'
import { FaArrowAltCircleRight, FaIndent, FaSearch } from 'react-icons/fa'
import Link from 'next/link'
export default function LinkToPages() {
    return (
        <div className='pt-24 md:py-32 w-full flex flex-col items-center justify-center'>
            <div className='text-center w-[80%] sm:w-[60%]'>
                <AnimateText className='text-[26px] leading-8 min-[450px]:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-3 mt-10' text={"Discover the anime you're looking for!"} />
                <motion.p className='hidden min-[450px]:block font-medium text-sm sm:text-base md:text-md lg:text-lg'
                >Helping you find the perfect anime for your taste.</motion.p>
            </div>
            <div className='relative grid lg:grid-cols-2 w-[80%] gap-4 sm:gap-6 md:gap-10 mb-20 mt-5 sm:my-12 md:my-16 lg:my-20 '>
                <div className="p-4 sm:p-6 md:px-10 md:py-8 rounded-[20px] text-left bg-dark relative border-2 border-light">
                    {/* //this div-->> */}
                    <div className="col-span-4 p-5 top-0 left-0 inset-0.5 z-[-1] absolute w-[103%] sm:w-[102%] md:w-[101.3%] lg:w-[103%] h-[103%] border-2 border-dark rounded-[30px] bg-light" />
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-5'>Find anime recommendations by answering a few simple questions.</h1>
                    <p className='font-medium text-[12px] sm:text-sm md:text-base lg:text-md mb-3 sm:mb-5'>Looking for some great anime series to watch? Anime Finder can help! With our easy-to-use tool, you can find the perfect show to match your interests, age rating, and other preferences. start your exiting adventure now!</p>
                    <Link href={"/step1"}>
                        <button className='z-50 flex items-center bg-light text-dark font-bold p-2 sm:p-3 rounded-lg text-sm sm:text-base md:text-md lg:text-lg my-1 sm:my-2 md:my-5 border-2 border-light hover:text-light hover:bg-dark transition-[300ms]'><FaIndent className='mr-1 sm:mr-2 ' /> Discover Anime </button>
                    </Link>
                </div>
                <div className="p-4 sm:p-6 md:px-10 md:py-8 rounded-[20px] text-left bg-dark border-2 border-light relative">
                    {/* //and this div-->> */}
                    <div className="col-span-4 p-5 bg-light top-0 left-0 absolute w-[103%] sm:w-[102%] md:w-[101.3%] lg:w-[103%] h-[103%] border-2 border-dark rounded-[30px] inset-0.5 z-[-1]" />
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-5 '>Easily Serach, browse and discover anime in various categories.</h1>
                    <p className='font-medium text-[12px] sm:text-sm md:text-base lg:text-md mb-3 sm:mb-5'>Excited to explore the awesome universe of anime series? No worries - our helpful search tool makes it a breeze to discover what you want! You can easily search by category, title, or release year. Let&apos;s embark on your anime journey together!</p>
                    <Link href={"/search"} >
                        <button className='z-50 flex items-center bg-light text-dark font-bold p-2 sm:p-3 rounded-lg text-sm sm:text-base md:text-md lg:text-lg my-1 sm:my-2 md:my-5 border-2 border-light hover:text-light hover:bg-dark transition-[300ms]'>
                            <FaSearch className='mr-1 sm:mr-2 text-primary' />Search Anime</button></Link>
                </div>
            </div>
        </div>
    )
}
