"use client"

import React, { useContext } from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Contexts } from '@/context/Store';
import { FaPlay } from 'react-icons/fa'


export default function Step3() {

    let { year, setYear } = useContext(Contexts);

    let handleSelect = (event) => {
        let userChoice = event.target.textContent;
        if (userChoice === year) {
            setYear("")
        }
        else {
            setYear(userChoice === "All Time." ? "" : userChoice);
        }
    }

    let optionSyling = {
        initial: {
            opacity: 0,
            scale: 2,
            x: "-50vh"
        },
        animate: {
            opacity: 1,
            x: 0,
            originX: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 300 }
        },
        whileHover: {
            color: "#aeffec",
            scale: 1.2,
            originX: 0,
        },
        whileTap: { scale: 1 }
    }


    return (
        <div className="mx-auto text-center h-[80vh] md:h-screen w-[300px] mt-24 scale-90 sm:scale-100">
            <motion.div className="heading text-3xl font-semibold border-b-2 border-white pb-4"
                initial={{
                    y: "-10vh",
                    opacity: 0
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: 'tween',
                        duration: 1
                    }
                }}
            >
                Select Year.
            </motion.div>
            <div className="option py-5 text-left text-xl font-medium" >

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${year === "" ? 'block text-[#5dff8d]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>All Time.</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${year === "2023" ? 'block text-[#e47633]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>2023</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${year === "2022" ? 'block text-[#ff74ff]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>2022</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${year === "2021" ? 'block text-[#ff74ff]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>2021</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${year === "2020" ? 'block text-[#ff74ff]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>2020</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${year === "2019" ? 'block text-[#ff74ff]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>2019</h2>
                </motion.div>

            </div>

            {
                <Link href={'/choice'}><motion.button className='border-black mt-2 mx-5 border-2 px-6 py-2 mr-10 rounded-[30px] font-bold bg-white text-black mb-4 m-auto'

                    initial={{
                        scale: 3,
                        opacity: 0,
                        y: "10vh"
                    }}
                    animate={{
                        opacity: 1,
                        transition: { type: 'spring', stiffness: 50 },
                        y: 0,
                        scale: 1.2
                    }}
                    whileHover={{
                        y: 0,
                        scale: 1.4,
                        transition: { type: 'tween', duration: 1 },
                    }}

                >Final Step! 🏁✨</motion.button></Link>
            }
        </div >
    )
}
