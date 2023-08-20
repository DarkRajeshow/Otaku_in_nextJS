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

    const { setCurrentAnimeOverview, setAnimeId, setvideoId, setShortDescription, setCurrentRating } = useContext(Contexts)
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

    const openOverview = async (index) => {
        await setCurrentAnimeOverview((topMoviesData[index].attributes.titles.en ? topMoviesData[index].attributes.titles.en : topMoviesData[index].attributes.titles.en_us ? topMoviesData[index].attributes.titles.en_us : topMoviesData[index].attributes.titles.en_jp ? topMoviesData[index].attributes.titles.en_jp : topMoviesData[index].attributes.titles.ja_jp ? topMoviesData[index].attributes.titles.ja_jp : ""))
        await setAnimeId(topMoviesData[index].id);
        await setvideoId(topMoviesData[index].attributes.youtubeVideoId);
        await setShortDescription(topMoviesData[index].attributes.description);
        await setCurrentRating(topMoviesData[index].attributes.averageRating);
        navigate.push("/overview")
    }


    useEffect(() => {
        fetchMovieData();
    }, [offSetPage])

    const [offSetValues, setoffSetValues] = useState([0, 5, 10, 15]);
    return (
        <>
            <div
                className='w-full flex flex-col items-center mt-[-20vh] md:mt-32 my-32'
            >
                <div className='text-center w-[80%] sm:w-[60%]'>
                    <AnimateText className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-3 mt-10' text={"Let's Dive into the colorful world of anime Movies!"} />
                    <motion.p className='text-sm sm:text-base md:text-md lg:text-lg'
                        
                    >Are you ready to explore the captivating world of anime movies?</motion.p>
                </div>
                <div className='flex items-center justify-center'>
                    <div className="titles">
                        {titlesForHero2.map((title, index) => {
                            return (
                                <TextWidthAnimation offSetPage={offSetPage} key={index} index={index} text={title} className='text-sm min-[540px]:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-light h-16' imageIndex={imageIndex} setImageIndex={setImageIndex} />
                            )
                        })}
                    </div>
                    <motion.div className="image w-[65vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw]">
                        {isLoading &&
                            <SmartLoader />
                        }
                        {(topMoviesData.length !== 0 && !isLoading) &&
                            topMoviesData.map((movie, index) => {
                                const title = movie.attributes.titles.en || movie.attributes.titles.en_us || movie.attributes.titles.en_jp || movie.attributes.titles.ja_jp || "";

                                const gradientStyleForMobile = {
                                    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.891281512605042) 0%, rgba(78, 78, 91, 0) 100%, rgba(28, 23, 23, 1) 30%), url(${movie.attributes.posterImage.original})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                };

                                return (
                                    <>
                                        <MovieCard imageIndex={imageIndex} key={movie.id} index={index} rating={(Math.round(movie.attributes.averageRating)) / 10} gradientStyleForMobile={gradientStyleForMobile} title={title} openOverview={openOverview} offSetPage={offSetPage} duration={movie.attributes.episodeLength} />
                                    </>
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
