"use client"
import React, { useContext, useEffect, useState } from 'react'
import Card from './Card';
import InternetError from './InternetError';
import NoResultFound from './NoResultFound';
import { motion } from 'framer-motion';
import { Contexts } from '@/context/Store';

export default function Choice() {
    // document.title = "Otaku : Recommended";
    const { genres, status, rating, year, handleStart, loading, setLoading, internetError, setInternetError, noResult, setNoResult } = useContext(Contexts);
    const [data, setData] = useState([]);

    let fetchAnime = async () => {
        try {
            setLoading(true);
            setInternetError(false);
            setNoResult(false);
            let animeData = await fetch(`https://kitsu.io/api/edge/anime?${genres.length !== 0 ? `&filter[genres]=${genres.join(",")}` : ""}${status.length !== 0 ? `&filter[status]=${status.join(",")}` : ""}${rating.length !== 0 ? `&filter[ageRating]=${rating.join(",")}` : ""}${year !== "" ? `&filter[seasonYear]=${year}` : ""}&sort=popularityRank&page[limit]=20&fields[anime]=titles,description,posterImage,averageRating,episodeCount,status,youtubeVideoId,showType`);

            let parsedAnimeData = await animeData.json();
            setLoading(false);
            if (parsedAnimeData.data.length === 0) {
                setNoResult(true);
                setData([])
                return;
            }
            setData(parsedAnimeData.data)
        }
        catch {
            setLoading(false);
            setInternetError(true)
        }
    }

    useEffect(() => {
        fetchAnime();
    }, [genres, status, rating, year])

    return (
        <>
            <div className="heading m-auto w-2/3 text-center my-16">
                <motion.h1 className='text-3xl sm:text-4xl font-bold lg:text-6xl md:text-5xl '
                    initial={{
                        y: "-15vh",
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1

                    }}

                >Discover Your Perfect Match.</motion.h1>
                <motion.p className='text-md my-4 lg:text-xl md:text-lg'
                    initial={{
                        y: "15vh",
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1

                    }}
                >Recommendations Derived from Your Unique Preferences</motion.p>
            </div>
            {(!noResult && !internetError) && (
                <>
                    <div className="grid md:grid-col-2 w-10/12 m-auto gap-2 pb-10 lg:grid-cols-3 grid-cols-1 mb-28">
                        {data.map((card, index) => (
                            <Card card={card} index={index} key={card.id} />
                        ))}
                        {(!loading) && <motion.button className='border-white border-2 px-8 py-2 rounded-[30px] font-semibold mt-5 m-auto md:col-span-3 '

                            initial={{
                                scale: 3,
                                opacity: 0,
                                y: "10vh"
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1.2,
                                y: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 200,
                                    duration: 0.7,
                                    delay: 0.1,
                                }
                            }}
                            whileHover={{
                                scale: 1.4,
                                transition: { type: 'tween', delay: 0 },
                            }}
                            whileTap={{
                                scale: 1,
                                transition: { type: 'tween', duration: 1 },
                            }}
                            onClick={handleStart}
                        >Try Again.</motion.button>}
                    </div>

                </>
            )}
            {((internetError && noResult) || (internetError)) && <InternetError tryAgain={handleStart} />}
            {(!internetError && noResult) && <NoResultFound errorMessage="Sorry! We can't able find Your dream Otaku." tryAgain={handleStart} />}
            {(loading) && <motion.div className='border-dotted border-r-4 border-l-4 border-t-4 w-14 m-auto h-14 border-white rounded-[100%]'
                whileInView={{
                    rotate: 360,
                    transition: {
                        duration: 2,
                        repeat: Infinity
                    }
                }}
            >
            </motion.div>}


        </>
    );
}
