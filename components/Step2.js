"use client"
import React, { useContext } from 'react'
import { Contexts } from '@/context/Store';
import { FaPlay } from 'react-icons/fa'
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Step2() {
    // document.title = "Otaku : Step 2";

    const { rating, setRating } = useContext(Contexts);

    let handleSelect = (event) => {
        const selectedChoice = event.target.textContent;
        const selectedRating = selectedChoice === "8+" ? "G" : selectedChoice === "12+" ? "PG" : selectedChoice === "17+" ? "R" : ""
        if (rating.includes(selectedRating)) {
            let newChoice = rating.filter((value) => {
                return value !== selectedRating;
            })
            setRating(newChoice)
        }
        else {
            setRating([...rating, selectedRating])
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
        <div className="mx-auto text-center w-[300px] mt-24 scale-90 sm:scale-100">

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
                Select Age.
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
                    <FaPlay className={`${rating.includes("G") ? 'block text-[#91fcfc]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`} />
                    <h2 className=''>8+</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${rating.includes("PG") ? 'block text-[#d8ef55]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>12+</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${rating.includes("R") ? 'block text-[#ec4426]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>17+</h2>
                </motion.div>

            </div>

            {
                <Link href={'/step3'}><motion.button className='border-black mt-2 mx-5 border-2 px-6 py-2 mr-10 rounded-[30px] font-bold bg-white text-black mb-4 m-auto'

                    initial={{
                        scale: 3,
                        opacity: 0,
                        y: "10vh"
                    }}
                    animate={{
                        opacity: rating.length !== 0 ? 1 : 0,
                        transition: { type: 'spring', stiffness: 50 },
                        scale: rating.length !== 0 ? 1.2 : 2,
                        y: rating.length !== 0 ? 0 : "10vh"
                    }}
                    whileHover={{
                        scale: 1.4,
                        transition: { type: 'tween', duration: 1 },
                    }}

                >Next! ✨🚶‍♂️</motion.button></Link>
            }
        </div >
    )
}
