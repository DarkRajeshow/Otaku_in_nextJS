import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Contexts } from '@/context/Store';
import { useRouter } from 'next/navigation';
import blurImage from '@/public/blurImage2.png'
import { FaBroadcastTower, FaCalendar, FaCalendarAlt, FaCheckCircle, FaClock, FaFilm, FaHistory, FaPlay, FaPlayCircle, FaStar } from 'react-icons/fa';
import Image from 'next/image';

export default function Card(props) {
    const { setAnimeId, calculateMatchPercentage, searchedAnimeName } = useContext(Contexts);
    const [isCardHovered, setIsCardHovered] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const navigate = useRouter();


    const openOverview = async () => {
        await setAnimeId(props.card.id)
        navigate.push(`search/${props.card.id}`)
    }


    const gradienttest = {
        backgroundImage: `url(${blurImage.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const textGradient = {
        background: 'linear-gradient(180deg,hsla(0, 0%, 0%, 0) 0%,hsla(0, 0%, 0%, 0.3) 10%,hsl(0, 0%, 0%) 100%)'
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchAnime();
        }
    };

    const handleCardClick = () => {
        if (window.innerWidth <= 640) {
            setIsCardHovered(!isCardHovered);
        }
        else {
            openOverview()
        }
    }

    const handleMousehover = () => {
        console.log(window.innerWidth);
        if (window.innerWidth >= 640) {
            setIsCardHovered(true);
        }
    }

    const handleMouseDown = () => {
        if (window.innerWidth >= 640) {
            setIsCardHovered(false);
        }
    }


    const TransitionStyle = isImageLoaded ? {} : { type: "just", duration: 2, repeat: Infinity }
    const title = props.card.attributes.titles.en ? props.card.attributes.titles.en : props.card.attributes.titles.en_us ? props.card.attributes.titles.en_us : props.card.attributes.titles.en_jp ? props.card.attributes.titles.en_jp : props.card.attributes.titles.ja_jp ? props.card.attributes.titles.ja_jp : "Not Registered Yet"

    return (
        <>
            <motion.div className="relative card h-[550px] text-white rounded-md overflow-hidden border-[1px] border-light sm:cursor-pointer"
                // style={gradiettest}
                onClick={handleCardClick}
                onHoverStart={handleMousehover}
                onHoverEnd={handleMouseDown}
                initial={{
                    opacity: 0,
                }}
                whileInView={{
                    opacity: 1,
                    transition: {
                        type: "just",
                        delay: 0.2,
                        duration: 0.5,
                    }
                }}
                viewport={{
                    once: true
                }}
            >
                <motion.div className='h-full w-full overflow-hidden bg-transparent m-auto rounded-t-xl'
                    style={gradienttest}
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: isImageLoaded ? 1 : [0.1, 0.3, 0.1],
                        transition: TransitionStyle
                    }}
                    whileHover={{
                        scale: 1.1,
                        opacity: 0.6
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    transition={{
                        type: "just",
                        duration: 0.3,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image className="image h-[550px] w-full overflow-hidden bg-transparent m-auto rounded-t-xl bg-cover bg-no-repeat bg-center"
                            onLoad={() => { setIsImageLoaded(true) }}
                            src={props.card.attributes.posterImage.original}
                            width={400}
                            height={1000}
                            alt='Anime Poster'
                        />
                    </motion.div>
                </motion.div>

                <div className="text py-4 px-5 absolute bottom-0 w-full"
                    style={textGradient}
                >
                    <div className='mb-3'>
                        <h2 className='text-lg min-[400px]:text-xl sm:text-lg lg:text-xl font-bold pb-1 '>{title}</h2>
                        {searchedAnimeName !== "" && <p
                            className='text-lg md:text-base lg:text-lg font-bold pb-1 text-comedy'
                        ><span className='text-romance'>{calculateMatchPercentage(searchedAnimeName, title)}%</span> Match</p>}
                        <p className='flex items-center text-yellow-300 font-bold text-lg md:text-base lg:text-lg'><FaStar className='mr-1' /> {(Number(props.card.attributes.averageRating) / 10).toFixed(1)}</p>

                    </div>
                    {<motion.div
                        animate={{
                            opacity: isCardHovered ? 1 : 0,
                            height: isCardHovered ? "auto" : "0",
                            transition: {
                                type: "just",
                                duration: 0.5
                            }
                        }}
                    >
                        <motion.p className='h-[2px] bg-light w-[50%] rounded-md mb-2'
                            animate={{
                                width: isCardHovered ? "50%" : "0",
                                transition: {
                                    type: "just",
                                    duration: 0.5
                                }
                            }}
                        ></motion.p>

                        <div className='flex items-center text-base md:text-sm lg:text-base'>

                            <p className='font-semibold flex items-center mr-3'>
                                {props.card.attributes.status === 'finished' && <FaCheckCircle className="text-green" />}
                                {props.card.attributes.status === 'current' && <FaBroadcastTower className="text-blue" />}
                                {props.card.attributes.status === 'upcoming' && <FaCalendarAlt className="text-orange" />}
                                <span className='ml-1'>{props.card.attributes.status.charAt(0).toUpperCase() + props.card.attributes.status.slice(1)}</span>
                            </p>

                            <p className='font-semibold flex items-center mr-3'><FaCalendar className='text-comedy mr-1' /> {props.card.attributes.startDate}</p>

                        </div>


                        <div className='flex items-center text-base md:text-sm lg:text-base'>

                            <p className='font-semibold flex items-center mr-3'><FaPlayCircle className='text-comedy mr-1' /> {props.card.attributes.subtype}</p>

                            <p className='font-semibold flex items-center mr-3'><FaFilm className='text-comedy mr-1' /> {props.card.attributes.episodeCount}</p>

                            <p className='font-semibold flex items-center mr-3'><FaClock className='text-comedy mr-1' /> {props.card.attributes.episodeLength}m</p>


                        </div>
                        <p className='py-2 font-semibold text-base sm:text-sm md:text-xs lg:text-sm flex items-center mr-3'>{props.card.attributes.description.split(" ").length > 20 ? `${props.card.attributes.description.split(" ").slice(0, 20).join(" ")}...` : props.card.attributes.description}</p>

                        <button onClick={openOverview} className='text-xs md:text-sm lg:text-base font-bold p-2 md:px-2 md:py-1 bg-light text-dark rounded-md my-2 flex items-center'>More..</button>
                    </motion.div>}

                </div>

            </motion.div >
        </>
    )
}


{/* {<motion.h2
                        className="absolute text-overlay top-0 left-0 flex items-center justify-center m-auto w-full h-full text-center my-auto text-white font-bold text-[1.1rem]"

                        onHoverStart={() => {
                            setImageOpacity(0.4)
                        }}
                        onHoverEnd={() => {
                            setImageOpacity(1)
                        }}

                        initial={{
                            opacity: 0,
                        }}
                        whileHover={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                    >{calculateMatchPercentage(searchedAnimeName, (props.card.attributes.titles.en ? props.card.attributes.titles.en : props.card.attributes.titles.en_us ? props.card.attributes.titles.en_us : props.card.attributes.titles.en_jp ? props.card.attributes.titles.en_jp : props.card.attributes.titles.ja_jp ? props.card.attributes.titles.ja_jp : ""))}
                    </motion.h2>} */}
