"use client"
import React from 'react'
import AnimateText from './AnimateText'
import { motion } from 'framer-motion'
import { FaArrowAltCircleRight, FaIndent, FaSearch } from 'react-icons/fa'
import Link from 'next/link'
export default function LinkToPages() {
    return (
        <div className='py-32 w-full flex flex-col items-center justify-center'>
            <div className='text-center w-[80%] sm:w-[60%]'>
                <AnimateText className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-3 mt-10' text={"Discover the anime you're looking for!"} />
                <motion.p className='text-sm sm:text-base md:text-md lg:text-lg'
                >Helping you find the perfect anime for your taste.</motion.p>
            </div>
            <div className='relative grid lg:grid-cols-2 w-[80%] gap-10 my-20 '>
                <div className="px-10 py-8 rounded-[20px] text-left bg-black relative border-2 border-light">
                    {/* //this div-->> */}
                    <div className="col-span-4 p-5 top-0 left-0 inset-0.5 z-[-1] absolute w-[103%] sm:w-[102%] md:w-[101.3%] lg:w-[103%] h-[103%] border-2 border-dark rounded-[30px] bg-light" />
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-primaryDark'><FaArrowAltCircleRight className='mb-3 text-green' />Find anime recommendations by answering a few simple questions.</h1>
                    <p className='text-[12px] sm:text-sm md:text-base lg:text-md mb-5'>Looking for some great anime series to watch? Anime Finder can help! With our easy-to-use tool, you can find the perfect show to match your interests, age rating, and other preferences. start your exiting adventure now!</p>
                    <Link href={"/step1"}>
                        <button className='border-2 border-light flex items-center bg-redBlack text-light font-bold p-3 rounded-lg text-sm sm:text-base md:text-md lg:text-lg my-5 hover:text-dark hover:bg-pinkBlue transition-[300ms]'><FaIndent className='mr-2 ' /> Discover Anime </button>
                    </Link>
                </div>
                <div className="px-10 py-8 rounded-[20px] text-left bg-black border-2 border-light relative">
                    {/* //and this div-->> */}
                    <div className="col-span-4 p-5 bg-light top-0 left-0 absolute w-[103%] sm:w-[102%] md:w-[101.3%] lg:w-[103%] h-[103%] border-2 border-dark rounded-[30px] inset-0.5 z-[-1]" />
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-primaryDark'><FaArrowAltCircleRight className='mb-3 text-green' />Easily Serach, browse and discover anime in various categories.</h1>
                    <p className='text-[12px] sm:text-sm md:text-base lg:text-md mb-5'>Excited to explore the awesome universe of anime series? No worries - our helpful search tool makes it a breeze to discover what you want! You can easily search by category, title, or release year. Let&apos;s embark on your anime journey together!</p>
                    <Link href={"/search"} >
                        <button className='relative z-50 flex items-center bg-light text-dark font-bold p-3 rounded-lg text-sm sm:text-base md:text-md lg:text-lg my-5 border-2 border-light hover:text-light hover:bg-dark transition-[300ms]'>
                            <FaSearch className='mr-2 text-primary' />Search Anime</button></Link>
                </div>
            </div>
            {/* <button className='relative flex items-center bg-light text-dark font-bold p-3 rounded-lg text-sm sm:text-base md:text-md lg:text-lg my-5 border-2 border-light'>
                        <div className="col-span-4 p-5 bg-dark top-0 left-0 absolute -z-10 w-[103%] h-[110%] rounded-xl border-[1px] border-light" />
                        <FaSearch className='mr-2 text-primary' />Search Anime</button> */}
        </div>
    )
}
