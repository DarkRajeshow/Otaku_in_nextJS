import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Contexts } from '@/context/Store';
import { useRouter } from 'next/navigation';

export default function Card(props) {
    const { setAnimeId, setvideoId, setShortDescription, setCurrentRating, searchedAnimeName, calculateMatchPercentage, setCurrentAnimeOverview } = useContext(Contexts);
    const [imageOpacity, setImageOpacity] = useState(1)
    const navigate = useRouter();


    const openOverview = async () => {
        await setCurrentAnimeOverview((props.card.attributes.titles.en ? props.card.attributes.titles.en : props.card.attributes.titles.en_us ? props.card.attributes.titles.en_us : props.card.attributes.titles.en_jp ? props.card.attributes.titles.en_jp : props.card.attributes.titles.ja_jp ? props.card.attributes.titles.ja_jp : ""))
        await setAnimeId(props.card.id);
        await setvideoId(props.card.attributes.youtubeVideoId);
        await setShortDescription(props.card.attributes.description);
        await setCurrentRating(props.card.attributes.averageRating);
        navigate.push("/overview")
    }

    return (
        <>
            <motion.div className="custom-shadow card gap-8 text-white rounded-md overflow-hidden cursor-pointer lg:h-auto md:h-[750px]"
                onClick={openOverview}
                initial={{
                    opacity: 0,
                    y: "50vh"
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        duration: 0.7,
                        delay: 0.3 * (props.index),
                    }
                }}
                whileTap={{
                    scale: 0.95,
                }}
            >
                <div className="image h-[530px] overflow-hidden bg-black m-auto">
                    <motion.img
                        className='rounded-md h-full w-full'
                        src={props.card.attributes.posterImage.original}
                        alt="Anime Poster"
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: imageOpacity,
                            scale: (imageOpacity === 1 ? imageOpacity : 1.05)
                        }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        transition={{
                            type: "spring",
                            duration: 0.6,
                        }}

                    />
                    {<motion.h2
                        className="text-overlay absolute top-0 left-0 flex items-center justify-center m-auto w-full h-[75%] text-center z-10 my-auto text-white font-bold text-[1.1rem]"

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
                    </motion.h2>}

                </div>

                <div className="text py-4 px-5">
                    <h2 className='text-2xl font-bold text-center pb-3 border-b-2 border-white mb-3'>{props.card.attributes.titles.en ? props.card.attributes.titles.en : props.card.attributes.titles.en_us ? props.card.attributes.titles.en_us : props.card.attributes.titles.en_jp ? props.card.attributes.titles.en_jp : props.card.attributes.titles.ja_jp ? props.card.attributes.titles.ja_jp : "Not Registered Yet"}</h2>
                    <p className='font-semibold text-xl text-[#baffcf]'><span className='text-white'>Status</span> : {props.card.attributes.status.charAt(0).toUpperCase() + props.card.attributes.status.slice(1)}</p>
                    <p className='font-semibold text-xl text-[#baffcf]'><span className='text-white'>No. Of Episodes</span> : {props.card.attributes.episodeCount}</p>
                    <p className='font-semibold text-xl text-[#baffcf]'><span className='text-white'>Rating</span> : {(Number(props.card.attributes.averageRating) / 10).toFixed(1)} <i className="fa-solid fa-star text-yellow-300"></i></p>
                </div>
            </motion.div >
        </>
    )
}
