"use client"
import React, { useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion";
import ReviewCard from './ReviewCard';
import InternetError from './InternetError';
import NoResultFound from './NoResultFound';
import AddComment from './Comment';
import { Contexts } from '@/context/Store';
import { FaArrowCircleDown, FaArrowUp, FaBroadcastTower, FaCalendarAlt, FaCaretDown, FaCaretUp, FaCheckCircle, FaChild, FaClock, FaDotCircle, FaFilm, FaFire, FaHeart, FaInfoCircle, FaPlayCircle, FaSort, FaStar, FaUserGraduate, FaVideo } from 'react-icons/fa';
import SmartLoader from './SmartLoader';
import Image from 'next/image';
import blurImage from '@/public/blurImage2.png'
import { useRouter } from 'next/navigation';
import ShareLinks from './ShareLinks';

export default function OverviewPage({ id }) {

    const { fetchOverviewData, animeOverviewData, internetError, loading, noResult, handleStart, reviewsData, setSelectedCategory } = useContext(Contexts);

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [reviewsOpened, setReviewsOpened] = useState(false)
    const [isTrailerOpen, setisTrailerOpen] = useState(false)
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false)

    const paraExpanded = animeOverviewData.description ? animeOverviewData.description.split(".") : [];
    const paraNotExpanded = animeOverviewData.description ? animeOverviewData.description.split(".").slice(0, 4) : [];
    const paradata = isExpanded ? paraExpanded : paraNotExpanded

    // const animeDetails = {
    //     id,
    //     type,
    //     title,
    //     userCount,
    //     episodeLength,
    //     description,
    //     animeImage,
    //     averageRating,
    //     episodeCount,
    //     status,
    //     popularityRank,
    //     startDate,
    //     endDate,
    //     ageRating,
    //     youtubeVideoId,
    //     subtype,
    //     favoritesCount,
    //     guidance:ageRatingGuide,
    //     shortForms: abbreviatedTitles,
    //     genres: genresArray,
    // };


    const router = useRouter();
    const CategoryColors = [
        "text-all",        // All
        "text-action",     // Action
        "text-comedy",     // Comedy
        "text-drama",      // Drama
        "text-mystery",    // Mystery
        "text-romance",    // Romance
        "text-shounen",    // Shounen
        "text-future",     // Future
        "text-thriller",   // Thriller
        "text-adventure",   // Thriller
        "text-fantasy",   // fantasy
        "text-school",   // school
    ];

    const colorCodes = [
        // "#f5f5f5",     // light
        // "#1b1b1b",     // dark
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

    const bgGradientImage = {
        backgroundImage: `linear-gradient(to right, #1b1b1b, rgb(0, 0, 0, 0.9)), url(${animeOverviewData.animeImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const blurImageGradient = {
        backgroundImage: `url(${blurImage.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };


    useEffect(() => {
        fetchOverviewData(id);
    }, [])

    return (
        <>
            {(animeOverviewData !== {} && !loading) && <div style={bgGradientImage} className='px-6 sm:px-12 md:px-16 lg:px-20 m-0 py-5 md:py-10'>
                <div className='fixed cursor-pointer right-4 bottom-6 text-2xl bg-light text-dark p-2 rounded-full z-20'
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })
                    }}
                >
                    <FaArrowUp className='text-dark' />
                </div>
                <div className='information grid lg:grid-cols-3 p-4 sm:p-6 md:p-8 lg:p-10 rounded-md bg-light/5 backdrop-blur-md border-none'>

                    <motion.div className='relative w-full posterImage bg-center bg-cover bg-no-repeat rounded-md overflow-hidden h-auto lg:h-[90vh] cursor-pointer' style={blurImageGradient}
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: isImageLoaded ? 1 : [0.1, 0.3, 0.1],
                            transition: {
                                type: "just",
                                duration: isImageLoaded ? 0.3 : 1,
                                repeat: isImageLoaded ? false : Infinity
                            }
                        }}
                    >

                        <div className={`flex flex-col absolute left-1 top-1 bg-action p-2 rounded-md font-bold justify-center items-center ${animeOverviewData.ageRating === "R" ? "bg-red-700" : animeOverviewData.ageRating === "PG" ? "bg-emerald-600" : "bg-emerald-400"}`}>
                            {
                                animeOverviewData.ageRating === "R" ? <> <span>17+</span></> : animeOverviewData.ageRating === "PG" ? <><FaUserGraduate className='mr-1 cursor-pointer' /><span>13+</span></> : <>
                                    <FaChild className='mr-1 cursor-pointer' /> <span>5+</span></>
                            }
                        </div>
                        {animeOverviewData.animeImage && (
                            <Image
                                src={animeOverviewData.animeImage}
                                onLoad={() => setIsImageLoaded(true)}
                                height={1500}
                                width={600}
                                alt='anime poster'
                                className='w-full h-full bg-center bg-cover bg-no-repeat hover:scale-[1.05] transition-[1.3s]'
                            />
                        )}
                    </motion.div>

                    <motion.div className='lg:col-span-2 lg:ml-10 mt-10 lg:mt-0'
                        initial={{
                            x: "10vw",
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                staggerChildren: 1,
                                type: "just",
                                duration: 1
                            }
                        }}
                    >

                        <div className="smallinfo flex md:font-semibold mb-3 text-xs sm:text-sm md:text-base text-light">
                            <div className="type flex items-center mr-3 capitalize ">
                                <FaVideo className='mr-[6px] text-action' />
                                {animeOverviewData.type}
                            </div>
                            <div className="type flex items-center capitalize">
                                <FaPlayCircle className='mr-[6px] text-action' />
                                {animeOverviewData.subtype}
                            </div>
                        </div>

                        <div className='text-xl font-bold text-gray-600'>
                            <p><span className='text-primaryDark'>#{animeOverviewData.popularityRank}</span>Rank</p>
                        </div>
                        <motion.h1 className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'

                        >{animeOverviewData.title}</motion.h1>
                        <div className="smallinfo flex md:font-semibold mb-5 text-xs sm:text-sm md:text-base text-gray-500 ">
                            <div className="type flex items-center mr-5">
                                From <span className='text-mecha mx-2'>{animeOverviewData.startDate}</span> to <span className='text-action mx-2'>{animeOverviewData.endDate ? animeOverviewData.endDate : "?"}</span>
                            </div>
                        </div>
                        <motion.h1 className='flex items-center text-2xl md:text-3xl lg:text-4xl font-bold mb-6'

                        >Rating : {(animeOverviewData.averageRating / 10).toFixed(1)} <FaStar className='ml-1 text-yellow-300' /></motion.h1>
                        <div className="smallinfo flex md:font-semibold mb-2  text-xs sm:text-sm md:text-base text-light ">
                            <p className='md:font-semibold flex items-center mr-6'>
                                <FaSort className='text-[8px] sm:text-[10px] md:text-xs rounded-full bg-action text-dark mr-1 ' />
                                <span className='mr-1 capitalize'>Status : <span className='text-sliceOfLife'>{animeOverviewData.status}</span></span>
                                {animeOverviewData.status === 'finished' && <FaCheckCircle className="text-green cursor-pointer" />}
                                {animeOverviewData.status === 'current' && <FaBroadcastTower className="text-blue cursor-pointer" />}
                                {animeOverviewData.status === 'upcoming' && <FaCalendarAlt className="text-orange cursor-pointer" />}
                            </p>
                            <div className="type flex items-center">
                                <FaSort className='text-[8px] sm:text-[10px] md:text-xs rounded-full bg-action text-dark mr-1 ' />
                                <span>Episodes : <span className='text-sliceOfLife'>{animeOverviewData.episodeCount}</span></span>
                                <FaFilm className='ml-[6px] text-thriller' />
                            </div>
                        </div>
                        <div className="smallinfo flex md:font-semibold mb-2  text-xs sm:text-sm md:text-base text-light ">
                            <div className="type flex items-center mr-5">
                                <FaSort className='text-[8px] sm:text-[10px] md:text-xs rounded-full bg-action text-dark mr-1 ' />
                                <span>Episodes length : <span className='text-sliceOfLife'>{animeOverviewData.episodeLength}</span></span>
                                <FaClock className='ml-[6px] text-yellow-300' />
                            </div>
                        </div>
                        <div className="smallinfo flex md:font-semibold mb-2  text-xs sm:text-sm md:text-base text-light ">
                            <div className="type flex items-center mr-5">
                                <FaSort className='text-[8px] sm:text-[10px] md:text-xs rounded-full bg-action text-dark mr-1 ' />
                                <span>Guidance : <span className='text-sliceOfLife'>{animeOverviewData.guidance}</span></span>
                                <FaInfoCircle className='ml-[6px] text-blue-300 cursor-pointer' />
                            </div>
                        </div>
                        <div className="smallinfo min-[400px]:flex md:font-semibold mb-2  text-xs sm:text-sm md:text-base text-light ">
                            <div className="type flex items-center mr-5 mb-2">
                                <FaSort className='text-[8px] sm:text-[10px] md:text-xs rounded-full bg-action text-dark mr-1 ' />
                                <span>Total Views : <span className='text-sliceOfLife'>{animeOverviewData.userCount}</span></span>
                                <FaFire className='ml-[6px] text-[#FF5733] cursor-pointer' />
                            </div>
                            <div className="type flex items-center mr-5">
                                <FaSort className='text-[8px] sm:text-[10px] md:text-xs rounded-full bg-action text-dark mr-1 ' />
                                <span>Likes : <span className='text-sliceOfLife'>{animeOverviewData.favoritesCount}</span></span>
                                <FaHeart className='ml-[6px] text-thriller cursor-pointer' />
                            </div>
                        </div>
                        {animeOverviewData.genres !== undefined && <div
                            className='my-4'
                        >
                            <h1 className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-2'>Genres: </h1>
                            <motion.div className={`genres grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1300px]:grid-cols-5 text-[12px] md:text-sm lg:text-base gap-1`}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        type: "just",
                                        duration: 1
                                    }
                                }}
                            >
                                {animeOverviewData.genres.map((genre, index) => {
                                    if (genre.length <= 10) {
                                        return (
                                            <p key={index} className={`relative genre ${CategoryColors[index]} flex items-center border-[1px] border-light font-bold py-1 rounded-[20px] cursor-pointer capitalize justify-center bg-light/20`}
                                                onClick={() => {
                                                    setSelectedCategory(genre);
                                                    router.push("/search");
                                                }}
                                            ><FaDotCircle className='mr-[3px]' />{genre}</p>
                                        )
                                    }
                                })}
                            </motion.div>
                        </div>}


                        <div className="description my-5" >
                            <h1 className='text-base md:text-xl lg:text-2xl font-bold text-[#b7ffec]'>Story : </h1>
                            <ul className='text-xs lg:text-sm lg:font-semibold cursor-pointer ' onClick={() => { setIsExpanded(!isExpanded) }}>
                                {
                                    paradata.length !== 0 && paradata.map((para, index) => {
                                        if (index % 2 === 0) {
                                            return (
                                                <li key={index} className='pb-1 text-[#f9f9f9c4]'>{para + ". " + paradata[index + 1]}.{((index + 1) == 3 && !isExpanded) ? "...." : ""}</li>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <div></div>

                <div className='reviews'>
                    <div className='rounded-md bg-light/5 backdrop-blur-md my-1 flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10 capitalize text-lg md:text-2xl lg:text-3xl font-bold cursor-pointer'
                        onClick={() => {
                            setisTrailerOpen(!isTrailerOpen);
                        }}
                    >Trailer {isTrailerOpen ? <><FaCaretDown /></> : <><FaCaretUp /></>} </div>
                    {isTrailerOpen && <motion.div className='relative w-full pb-[56.25%] rounded-md overflow-hidden'
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
                            src={`https://www.youtube.com/embed/${animeOverviewData.youtubeVideoId}`}
                            title="Anime Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>

                    </motion.div>}
                </div>


                <div className='reviews'>
                    <div className='rounded-md bg-light/5 backdrop-blur-md my-1 flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10 font-bold text-lg md:text-2xl lg:text-3xl cursor-pointer'
                        onClick={() => {
                            setReviewsOpened(!reviewsOpened);
                        }}
                    >Reviews{reviewsOpened ? <><FaCaretDown /></> : <><FaCaretUp /></>} </div>
                    <div className={`${reviewsOpened ? "block" : "hidden"} rounded-md bg-light/5 backdrop-blur-md p-4`}>
                        {reviewsData !== undefined && reviewsData.map((review, index) => {
                            return <ReviewCard review={review} key={index} />
                        })}
                        {reviewsData.length === 0 &&
                            <NoResultFound errorMessage={"Reviews are not available yet, become the first one to share your thoughts by writing the review now."} isTryAgainRequired={false} />
                        }
                    </div>
                </div>

                <div className='reviews'>
                    <div className='rounded-md bg-light/5 backdrop-blur-md my-1 flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10 capitalize text-lg md:text-2xl lg:text-3xl font-bold cursor-pointer'
                        onClick={() => {
                            setIsAddReviewOpen(!isAddReviewOpen);
                        }}
                    >Add Review {isAddReviewOpen ? <><FaCaretDown /></> : <><FaCaretUp /></>} </div>
                    {isAddReviewOpen && <AddComment />}
                </div>

                <ShareLinks title={animeOverviewData.title} OverviewPageLink={window.location.href} />
            </div>}

            {(animeOverviewData === {} || loading) &&
                <SmartLoader />
            }
        </>
    )
}

