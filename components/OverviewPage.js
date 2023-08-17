"use client"
import React, { useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion";
import ReviewCard from './ReviewCard';
import InternetError from './InternetError';
import NoResultFound from './NoResultFound';
import AddComment from './Comment';
import { Contexts } from '@/context/Store';

export default function OverviewPage() {

    const { AnimeId, videoId, shortDescription, setNoResult, setInternetError, setLoading, setReviews, reviews, internetError, loading, noResult, handleStart, currentRating, currentAnimeOverview } = useContext(Contexts);

    const paradata = shortDescription.split(". ");
    const [Names, setNames] = useState([])

    let RandomNames = [];


    const firstNames = [
        "James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Isabella", "Ethan", "Sophia",
        // Add more first names here...
    ];

    const lastNames = [
        "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
        // Add more last names here...
    ];


    function getRandomFullName() {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return {
            firstName: randomFirstName,
            lastName: randomLastName
        };
    }

    // Generate and print 10 random names and surnames




    const fetchReviews = async () => {
        try {
            setLoading(true);
            setInternetError(false);
            setNoResult(false);
            setNames([])
            const animeData = await fetch(`https://kitsu.io/api/edge/anime/${AnimeId}/reviews?fields[reviews]=likesCount,contentFormatted,rating,createdAt,source`);

            const parsedAnimeReviews = await animeData.json();

            setLoading(false);
            if (parsedAnimeReviews.data.length === 0) {
                setNoResult(true);
                setReviews([]);
                return;
            }

            for (let i = 0; i < parsedAnimeReviews.data.length; i++) {
                const randomName = getRandomFullName();
                RandomNames.push(randomName);
            }

            setNames(RandomNames);

            setReviews(parsedAnimeReviews.data)
        }
        catch {
            setLoading(false);
            setInternetError(true)
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [AnimeId])



    return (
        <>
            <h1 className='md:text-[3rem] sm:text-[2rem] text-3xl font-bold text-[#b7ffec] text-center pb-10 pt-20 leading-snug px-5'>{currentAnimeOverview}</h1>
            <div className='lg:mx-[15%] mt-4 lg:rounded-xl overflow-hidden'>
                <motion.div className='relative w-full pb-[56.25%]'
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 2
                        }
                    }}
                >
                    <iframe
                        className='absolute top-0 left-0 w-full h-full'
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Anime Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>

                </motion.div>
                <motion.div className="description my-14 lg:px-0 px-5"
                    initial={{
                        opacity: 0,
                        x: "50vh"
                    }}
                    whileInView={{
                        x: 0,
                        opacity: 1,
                        transition: {
                            type: "just",
                            duration: 1
                        }
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            type: "just",
                            duration: 1
                        }
                    }}
                >
                    <h1 className='md:text-[4rem] sm:text-[3rem] text-4xl font-bold text-[#b7ffec]'>Story </h1>
                    <ul className='py-10'>
                        {
                            paradata.map((para, index) => {
                                if (index % 2 === 0) {
                                    return (
                                        <li key={index} className='pb-3 lg:text-base text-base font-medium text-[#f9f9f9c4]'>{para + ". " + paradata[index + 1]}.</li>
                                    )
                                }
                                return null;
                            })
                        }
                    </ul>
                </motion.div>

                <div className="reviews">
                    <motion.div className="heading"
                        initial={{
                            opacity: 0,
                            x: "-50vh"
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                type: "just",
                                duration: 1
                            }
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                type: "just",
                                duration: 1
                            }
                        }}
                    >
                        <h1 className='md:text-[4rem] sm:text-[3rem] text-4xl font-bold text-[#b7ffec] pt-5 lg:px-0 px-5'>Rating and Reviews </h1>

                        <div className="rating py-10 lg:px-0 px-5">
                            <span className='lg:text-[8rem] md:text-[6rem] text-[3rem] font-bold pr-5'>{(currentRating / 10).toFixed(1)}</span>
                            <span className="lg:text-[8rem] md:text-[6rem] text-[4rem] font-bold fa-solid fa-star text-yellow-300"></span>
                        </div>
                    </motion.div>
                    {(!noResult && !internetError && !loading && Names.length !== 0) && (
                        <>
                            <div className="w-full m-auto pb-10 mb-28 ">
                                {Array.isArray(reviews) && reviews.map((review, index) => (
                                    <ReviewCard review={review} index={index} key={index} RandomNames={Names} />
                                ))}
                            </div>
                        </>
                    )}


                    {((loading) && (!internetError)) && <motion.div className='border-dotted border-r-4 border-l-4 border-t-4 w-14 m-auto h-14 border-white rounded-[100%] mb-52'
                        whileInView={{
                            rotate: 360,
                            transition: {
                                duration: 2,
                                repeat: Infinity
                            }
                        }}
                    >
                    </motion.div>}

                    {((internetError && noResult) || (internetError)) && <InternetError tryAgain={fetchReviews} />}
                    {(!internetError && noResult) && <NoResultFound errorMessage="📝 Reviews not posted yet! Be the first one to share your thoughts. 🚀 Write a review now! 😄" tryAgain={fetchReviews} />}

                    {(!internetError) && <>
                        <AddComment />
                        <div className="button text-center py-10">
                            {(!loading) && <motion.button className='border-white border-2 px-8 py-2 rounded-[30px] font-semibold mx-auto md:col-span-3 '
                                onClick={
                                    () => {
                                        handleStart();
                                    }
                                }
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
                                        delay: 0.3,
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
                            >Try again from start.</motion.button>}
                        </div>
                    </>
                    }

                </div>
            </div >
        </>
    )
}

