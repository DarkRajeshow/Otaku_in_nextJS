import React, { useState } from 'react'
import { motion } from 'framer-motion'


export default function TextWidthAnimationForAll({ index, className = "", text = "" }) {

    const [isHover, setIsHover] = useState(false)
    return (
        <div className='flex items-center my-32 w-[20vw] text-right'>
            <div className='overflow-hidden flex w-[25vw] sm:w-[20vw] items-center ' onMouseOver={() => {
                setIsHover(true);
            }} 
            onMouseLeave={() => {
                setIsHover(false);
            }}
            >
                <motion.h1 className={`font-bold capitalize overflow-hidden absolute ${className} text-right`}
                    initial={{
                        width: 0,
                    }}
                    animate={{
                        width: (isHover) ? "auto" : "0px",
                        // scale: (isHover) ? 1.1 : 1,
                        originX: 0,
                        originY: 0,
                        zIndex: 10,
                        transition: {
                            duration: 0.5
                        }
                    }}
                >{text}</motion.h1>

                <motion.h1 className={`font-bold absolute ${className} capitalize !text-[#ffffff4f]`}
                    animate={{
                        // scale: (isHover) ? 1.1 : 1,
                        originX: 0,
                        originY: 0,
                        transition: {
                            duration: 0.5
                        }
                    }}
                >{text}</motion.h1>
            </div>
        </div>
    )
}

