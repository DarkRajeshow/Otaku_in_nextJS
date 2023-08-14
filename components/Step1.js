"use client"
import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { Contexts } from '@/context/Store';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa'



export default function Step1() {
    // document.title = "Otaku : Step 1";
    const {genres, setGenres} = useContext(Contexts);

    let handleSelect = (event) => {
        const selectedChoice = event.target.textContent;
        if (genres.includes(selectedChoice)) {
            const newChoice = genres.filter((value) => {
                return value !== selectedChoice;
            })
            setGenres(newChoice)
        }
        else {
            setGenres([...genres, selectedChoice])
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
                Select Geners.
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
                    <FaPlay className={`${genres.includes("Action") ? 'block text-[#fe2323]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>Action</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${genres.includes("Adventure") ? 'block text-[#5dff8d]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>Adventure</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${genres.includes("Comedy") ? 'block text-[#e47633]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>Comedy</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${genres.includes("Fantasy") ? 'block text-[#ff74ff]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>Fantasy</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${genres.includes("Thriller") ? 'block text-[#0b6ded]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>Thriller</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${genres.includes("Mystery") ? 'block text-[#a70bb9]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>Mystery</h2>
                </motion.div>

                <motion.div className="option1 flex py-2"
                    variants={optionSyling}
                    initial='initial'
                    animate='animate'
                    whileHover="whileHover"
                    whileTap='whileTap'
                    onClick={handleSelect}

                >
                    <FaPlay className={`${genres.includes("Romance") ? 'block text-[#a70bb9]' : "hidden"} fa-solid fa-play my-auto w-5 mr-1`}/>
                    <h2 className=''>Romance</h2>
                </motion.div>
            </div>

            {
                <Link href={'/step2'}><motion.button className='border-black mt-2 mx-5 border-2 px-6 py-2 mr-10 rounded-[30px] font-bold bg-white text-black mb-4 m-auto'

                    initial={{
                        scale: 3,
                        opacity: 0,
                        y: "5vh"
                    }}
                    animate={{
                        opacity: genres.length !== 0 ? 1 : 0,
                        transition: { type: 'spring', stiffness: 50 },
                        scale: genres.length !== 0 ? 1.2 : 2,
                        y: genres.length !== 0 ? 0 : "5vh"
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
