import React from 'react'
import { motion } from 'framer-motion'

export default function InternetError(props) {
    return (
        <>
            <div className="container m-auto text-center border-b-2 border-white mb-40 border-spacing-2 py-3 scale-[0.8] md:scale-100">
                <div className="md:h-[320px] px-5 h-[380px] overflow-hidden bg-black rounded-lg">
                    <i className="fa-regular fa-face-grin-beam-sweat text-6xl text-[#c1daff] m-10 mb-5"></i>
                    <h2 className='text-4xl font-bold text-center pb-3 '>Internet Connection lost.</h2>
                    <p className='text-lg text-center pb-3'>A disruption in the network connection preventing access to the internet.</p>

                    <motion.button className='border-white border-2 px-8 py-2 rounded-[30px] font-semibold mt-5'

                        initial={{
                            scale: 3,
                            opacity: 0,
                            y: "10vh"
                        }}
                        animate={{
                            opacity: 1,
                            transition: { type: 'spring', stiffness: 50 },
                            scale: 1.2,
                            y: 0
                        }}
                        whileHover={{
                            scale: 1.4,
                            transition: { type: 'tween', duration: 1 },
                        }}
                        whileTap={{
                            scale: 1,
                            transition: { type: 'tween', duration: 1 },
                        }}
                        onClick={props.tryAgain}
                    >Try Again.</motion.button>
                </div>
            </div>
        </>
    )
}
