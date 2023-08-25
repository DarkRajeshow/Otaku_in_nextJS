import { motion } from 'framer-motion'
import React from 'react'
import { FaClock, FaInfoCircle, FaStar } from 'react-icons/fa'

export default function MovieCard({ gradientStyleForMobile, index, title, openOverview, imageIndex, rating, offSetPage, duration, id }) {
    return (
        <motion.div
            className={`w-full h-[50vh] min-[500px]:h-[70vh] sm:h-[80vh] ${imageIndex === index ? "block" : "hidden"} overflow-hidden rounded-r-[50px] rounded-l-[10px]`}
            style={gradientStyleForMobile}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: [0.6, 1],

                transition: {
                    type: "just",
                    duration: 2,

                }
            }}
            exit={{
                opacity: 0
            }}
        >
            <div className='gradientDiv w-[60%] relative top-[20%] sm:top-[35%] left-10'>
                <p className='text-base min-[400px]:text-xl lg:text-[24px] font-bold'><span className='text-primaryDark'>#{index + 1 + offSetPage}</span>Rank</p>
                <h1 className='text-xl min-[400px]:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-1'>{title}</h1>
                <p className='text-sm min-[400px]:text-md lg:text-lg font-bold flex items-center mb-2 sm:mb-4'><FaClock className='mr-1 text-primaryDark' /> {duration} min.</p>
                <p className='text-2xl min-[400px]:text-3xl lg:text-4xl font-bold flex items-center '><FaStar className='mr-2 text-fantasy' /> {rating}</p>
                <button className='text-[12px] min-[400px]:text-sm md:text-base font-bold p-2 md:px-4 md:py-3 bg-light text-dark rounded-lg my-2 sm:my-4 flex items-center'
                    onClick={openOverview.bind(null, id)}
                >More Details <FaInfoCircle className='ml-2 text-xl' /> </button>
            </div>
        </motion.div>
    )
}


// CategoryColors={CategoryColors} key={movie.id} index={index} movie={movie} gradientStyleForMobile={gradientStyleForMobile} title={title} openOverview={openOverview}