"use client"
import React, { useContext, useEffect, useState } from 'react'
import AnimateText from './AnimateText'
import TextWidthAnimation from './TextWidthAnimation'
import { motion } from 'framer-motion'
import MovieCard from './MovieCard'
import { Contexts } from '@/context/Store'
import { useRouter } from 'next/navigation'
import SmartLoader from './SmartLoader'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'


export default function Hero2() {

    const { setAnimeId } = useContext(Contexts)
    const navigate = useRouter();
    const titlesForHero2 = ["#1Rank", "#2Rank", "#3Rank", "#4Rank", "#5Rank"];
    const [topMoviesData, setTopMoviesData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [imageIndex, setImageIndex] = useState(0);
    const [offSetPage, setOffSetPage] = useState(0);

    const colorCodes = [
        "#f5f5f5",     // light
        "#1b1b1b",     // dark
        "#B63E96",     // primary
        "#58E6D9",     // primaryDark
        "#a4ffb1",     // green
        "#F87171",     // action
        "#60A5FA",     // adventure
        "#34D399",     // comedy
        "#A78BFA",     // drama
        "#FBBF24",     // fantasy
        "#EC4899",     // magic
        "#6EE7B7",     // mecha
        "#9333EA",     // music
        "#F472B6",     // mystery
        "#10B981",     // psychological
        "#FB923C",     // romance
        "#7C3AED",     // school
        "#8B5CF6",     // future
        "#60A5FA",     // sliceOfLife
        "#14B8A6",     // sports
        "#FBBF24",     // shounen
        "#DC2626",     // thriller
        "#EC4899"      // all
    ];

    const fetchMovieData = async () => {
        try {
            setIsLoading(true);
            const apiUrl = "https://kitsu.io/api/edge/anime";
            const queryParams = new URLSearchParams({
                sort: "popularityRank",
                "page[limit]": 5,
                "page[offset]": offSetPage,
                "fields[anime]": "titles,averageRating,episodeLength,posterImage,youtubeVideoId,description",
                "filter[subtype]": "movie",
            });
            const fullUrl = `${apiUrl}?${queryParams}`;
            const unParesedData = await fetch(fullUrl);
            const parsedData = await unParesedData.json();
            setTopMoviesData(parsedData.data);
            setIsLoading(false);
        } catch (error) {
            // Handle the error here, without logging anything to the console
        }
    };

    const openOverview = (id) => {
        setAnimeId(id);
        navigate.push(`/search/${id}`)
    }


    useEffect(() => {
        fetchMovieData();
    }, [offSetPage])

    const [offSetValues, setoffSetValues] = useState([0, 5, 10, 15]);
    return (
        <>
            <div
                className='w-full flex flex-col items-center mt-12 sm:mt-20 md:mt-32'
            >
                <div className='text-center w-[80%] sm:w-[60%]'>
                    <AnimateText className='text-2xl min-[450px]:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-1 sm:pb-3 mt-10' colorful={true} text={"Let's Dive into the colorful world of anime Movies!"} />
                    <motion.p className='hidden sm:block sm:text-base md:text-md lg:text-lg font-medium'
                    >Are you ready to explore the captivating world of anime movies?</motion.p>
                </div>
                <div className='flex items-center justify-center w-full px-[1%] sm:px-[4%] md:px-[6%] lg:px-[10%] xl:px-[20%]'>
                    <div className="titles w-[14%] min-[450px]:w-[20%] sm:w-[25%]">
                        {titlesForHero2.map((title, index) => {
                            return (
                                <TextWidthAnimation offSetPage={offSetPage} key={index} index={index} text={title} className='text-lg min-[500px]:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-light' imageIndex={imageIndex} setImageIndex={setImageIndex} />
                            )
                        })}
                    </div>
                    {/* w-[65vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] */}
                    <motion.div className="image w-[72%] sm:w-[75%]">
                        {isLoading &&
                            <SmartLoader className={'h-[10vh]'}/>
                        }
                        {(topMoviesData.length !== 0 && !isLoading) &&
                            topMoviesData.map((movie, index) => {
                                const title = movie.attributes.titles.en || movie.attributes.titles.en_us || movie.attributes.titles.en_jp || movie.attributes.titles.ja_jp || "";

                                const gradientStyleForMobile = {
                                    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.891281512605042) 0%, rgba(78, 78, 91, 0) 100%, rgba(28, 23, 23, 1) 30%)`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                };

                                return (
                                    <MovieCard imageIndex={imageIndex} bgImage={movie.attributes.posterImage.original} id={movie.id} key={movie.id} index={index} rating={(Math.round(movie.attributes.averageRating)) / 10} gradientStyleForMobile={gradientStyleForMobile} title={title} openOverview={openOverview} offSetPage={offSetPage} duration={movie.attributes.episodeLength} />
                                );
                            })
                        }
                    </motion.div>
                </div>
                <div className="more flex items-center justify-center scale-[0.7] sm:scale-[0.8] md:scale-[0.9] lg:scale-100">
                    <span className={`mr-5 bg-black/75 p-3 rounded-lg ${(offSetPage > 0 && offSetValues[0] > 0) ? "cursor-pointer border-[1px] border-light" : ""}`} onClick={() => {
                        if (offSetPage > 0 && offSetValues[0] > 0) {
                            setOffSetPage(offSetPage - 5)
                            const newValue = offSetValues.map((value) => {
                                return value - 5
                            })
                            setoffSetValues(newValue)
                        }
                    }} ><FaChevronLeft /></span>
                    <div className='flex items-center justify-center text-center'>
                        {offSetValues.map((value, index) => {
                            return (
                                <p key={index} className={`cursor-pointer text-xl font-bold ${offSetPage === value ? "bg-light" : "bg-light/25"} text-dark h-10 w-10 mx-1 p-2 rounded-full`}
                                    onClick={() => { setOffSetPage(value) }}
                                >{1 + (value / 5)}</p>
                            )
                        })}
                    </div>

                    <span className={`ml-5 bg-black/75 p-3 rounded-lg ${(offSetPage < 95 && offSetValues[3] < 95) ? "cursor-pointer border-[1px] border-light" : ""}`} onClick={() => {
                        if (offSetPage < 95 && offSetValues[3] < 95) {
                            setOffSetPage(offSetPage + 5)
                            const newValue = offSetValues.map((value) => {
                                return value + 5
                            })
                            setoffSetValues(newValue)
                        }
                    }}><FaChevronRight /></span>
                </div>
            </div>
        </>
    )
}
