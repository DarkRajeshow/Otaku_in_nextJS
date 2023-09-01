import React, { useState } from 'react'
import { motion } from 'framer-motion'


export default function TextWidthAnimation({ index, className = "", setImageIndex, imageIndex,offSetPage }) {
    return (
        <div className='flex items-center my-20 min-[500px]:my-28 sm:my-32 w-[20vw]'>
            <div className='overflow-hidden flex w-[25vw] sm:w-[20vw] items-center cursor-pointer' 
            
            onMouseOver={() => {
                if(window.innerWidth >= 450) setImageIndex(index);
                else return;
            }}
            
            onClick={()=>{
                if(window.innerWidth < 450) setImageIndex(index);
                else return;
            }}
            >
                <motion.h1 className={`font-bold capitalize overflow-hidden absolute flex ${className}`}
                    initial={{
                        width: 0,
                    }}
                    animate={{
                        width: (imageIndex === index) ? "auto" : "0px",
                        scale: (imageIndex === index) ? 1.1 : 1,
                        originX: 0,
                        originY: 0,
                        zIndex: 10,
                        transition: {
                            duration: 0.5
                        }
                    }}
                ><span className='text-primaryDark'>#{index + 1 + offSetPage}</span><span className='hidden min-[450px]:block'>Rank</span></motion.h1>

                <motion.h1 className={`font-bold absolute ${className} capitalize !text-[#ffffff4f] flex`}
                    animate={{
                        scale: (imageIndex === index) ? 1.1 : 1,
                        originX: 0,
                        originY: 0,
                        transition: {
                            duration: 0.5
                        }
                    }}
                ><span>#{index + 1 + offSetPage}</span><span className='hidden min-[450px]:block'>Rank</span></motion.h1>
            </div>
        </div>
    )
}
