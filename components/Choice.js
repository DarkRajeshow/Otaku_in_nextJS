"use client"
import React, { useContext, useEffect, useState } from 'react'
import Card from './Card';
import InternetError from './InternetError';
import NoResultFound from './NoResultFound';
import { motion } from 'framer-motion';
import { Contexts } from '@/context/Store';
import AnimateText from './AnimateText';
import SmartLoader from './SmartLoader';
import { FaArrowAltCircleUp } from 'react-icons/fa';

export default function Choice() {
    // document.title = "Otaku : Recommended";
    const { genres, status, rating, year, handleStart, loading, setLoading, internetError, setInternetError, noResult, setNoResult } = useContext(Contexts);
    const [data, setData] = useState([]);

    const fetchAnime = async () => {
        try {
            setLoading(true);
            setInternetError(false);
            setNoResult(false);
            const apiUrl = "https://kitsu.io/api/edge/anime";
            const queryParams = new URLSearchParams();

            if (genres.length !== 0) {
                queryParams.append("filter[genres]", genres.join(","));
            }

            if (status.length !== 0) {
                queryParams.append("filter[status]", status.join(","));
            }

            if (rating.length !== 0) {
                queryParams.append("filter[ageRating]", rating.join(","));
            }

            if (year !== "") {
                queryParams.append("filter[seasonYear]", year);
            }

            queryParams.append("sort", "popularityRank");
            queryParams.append("page[limit]", "20");
            queryParams.append("fields[anime]", "titles,description,posterImage,averageRating,episodeCount,status,youtubeVideoId,showType");

            const fullUrl = `${apiUrl}?${queryParams}`;

            let animeData = await fetch(fullUrl);
            
            // `https://kitsu.io/api/edge/anime?${genres.length !== 0 ? `&filter[genres]=${genres.join(",")}` : ""}${status.length !== 0 ? `&filter[status]=${status.join(",")}` : ""}${rating.length !== 0 ? `&filter[ageRating]=${rating.join(",")}` : ""}${year !== "" ? `&filter[seasonYear]=${year}` : ""}&sort=popularityRank&page[limit]=20&fields[anime]=titles,description,posterImage,averageRating,episodeCount,status,youtubeVideoId,showType`

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
                <div className='text-center'>
                    <AnimateText className='text-3xl min-[400px]:text-4xl md:text-5xl xl:text-6xl font-bold pb-3 mt-10' text={"Discover Your Perfect Match."} />
                    <motion.p className='text-xs sm:text-sm md:text-base lg:text-lg font-medium'
                        initial={{
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: [0, 1],
                            transition: {
                                type: "just",
                                duration: 2
                            }
                        }}
                    >Recommendations Derived from Your Unique Preferences! 🌟✨</motion.p>
                </div>
            </div>
            {(!noResult && !internetError && !loading) && (
                <>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-[90%] mx-auto gap-1 pb-10 mb-28">
                        {data.map((card, index) => (
                            <Card card={card} index={index} key={card.id} />
                        ))}
                    </div>
                    {(!loading && data.length !== 0) && <div className='flex items-center justify-center mb-32'>
                        <motion.button className='border-white border-2 p-2 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-[30px] font-semibold mx-auto text-xs sm:text-sm lg:text-base flex items-center'

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
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                })
                            }}
                        ><FaArrowAltCircleUp className='mr-1' /> Go To Top.</motion.button>
                    </div>}

                </>
            )}
            {(loading) && <SmartLoader height='[70vh]' />}
            {((internetError && noResult) || (internetError)) && <InternetError isTryAgainRequired={false} />}
            {((!internetError && noResult)) && <NoResultFound errorMessage="Result Not Found." isTryAgainRequired={false} />}
        </>
    );
}
