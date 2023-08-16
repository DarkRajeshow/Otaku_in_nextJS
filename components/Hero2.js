import Image from 'next/image'
import React from 'react'
import AnimePoster from '@/public/Animetheme.webp'
import AnimateText from './AnimateText'

export default function Hero2() {
    return (
        <>
            <div
                className='w-full h-[200vh] bg-texturedBgDark flex flex-col items-center'
            >
                <div className='text-center my-20'>
                    <AnimateText className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold pb-3' text={"Welcome to Otaku Universe!"} />
                    <p className='text-sm sm:text-base md:text-lg lg:text-xl'>Recommondations derived from your unique prefferences.</p>
                </div>
                <div className="image w-[50vw]">
                    <Image src={AnimePoster} alt='Anime Poster'/>
                </div>
               
            </div>
        </>
    )
}
