"use client"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { FaCalendar, FaChevronLeft, FaChevronRight, FaClock, FaFilm, FaPlayCircle, FaInfoCircle, FaTv, FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { Contexts } from '@/context/Store'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
export default function Hero() {
    const { setCurrentAnimeOverview, setAnimeId, setvideoId, setShortDescription, setCurrentRating, loading, setLoading } = useContext(Contexts)


    const navigate = useRouter();

    const Categories = [
        "All",
        "Action",
        "Comedy",
        "Drama",
        "Mystery",
        "Romance",
        "Shounen",
        "Future",
        "Thriller",
        "Adventure",
        "Fantasy",
        "School"
    ]

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

    const [heroData, setHeroData] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false)
    const [generForHero, setgenerForHero] = useState("All");
    // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])


    const openOverview = async (index) => {
        await setCurrentAnimeOverview((heroData[index].attributes.titles.en ? heroData[index].attributes.titles.en : heroData[index].attributes.titles.en_us ? heroData[index].attributes.titles.en_us : heroData[index].attributes.titles.en_jp ? heroData[index].attributes.titles.en_jp : heroData[index].attributes.titles.ja_jp ? heroData[index].attributes.titles.ja_jp : ""))
        await setAnimeId(heroData[index].id);
        await setvideoId(heroData[index].attributes.youtubeVideoId);
        await setShortDescription(heroData[index].attributes.description);
        await setCurrentRating(heroData[index].attributes.averageRating);
        navigate.push("/overview")
    }


    const fetchHeroAnimeList = async () => {
        try {
            setLoading(true);
            let animeData = await fetch(`https://kitsu.io/api/edge/anime?${generForHero !== "" ? `&filter[categories]=${generForHero}` : ""}&sort=popularityRank&page[limit]=10&fields[anime]=titles,description,coverImage,episodeCount,showType,episodeLength,startDate,youtubeVideoId,showType,averageRating`);

            let parsedanimeData = await animeData.json();

            if (parsedanimeData.data.length === 0) {
                setHeroData([])
                return;
            }
            setHeroData(parsedanimeData.data)
            setLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchHeroAnimeList();
    }, [generForHero])

    return (
        <>

            <motion.div className={`${isExpanded ? "h-auto" : "h-[110px]"} sm:h-auto overflow-hidden category grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-20 md:px-[5%] lg:px-[10%] w-full mx-auto pt-4 text-center text-sm xl:text-base gap-1 bg-texturedBgDark`}
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: [0, 1],
                    transition: {
                        type: "just",
                        duration: 1.5
                    }
                }}
            >
                {Categories.map((Category, index) => {
                    return (
                        <span
                            className={`font-bold rounded-lg flex items-center justify-center cursor-pointer p-3 ${CategoryColors[index]} ${Category === generForHero ? 'bg-black border-[1px] border-light' : ''}`}
                            key={index}
                            onClick={() => {
                                setgenerForHero(Category);
                            }}
                        >
                            <FaTv className="mr-2 text-light" />
                            {Category}
                        </span>
                    );
                })}
                <span className='-left-10 w-5 bottom-64 relative text-xl bg-light text-dark rounded-md' onClick={() => { setIsExpanded(!isExpanded) }}>{isExpanded ? <FaCaretUp /> : <FaCaretDown />}</span>


            </motion.div >
            {loading &&
                <div className='h-screen w-full flex items-center justify-center'>
                    <motion.div className="flex "
                        initial={{
                            opacity: 0.1
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 1
                            }
                        }}
                    >
                        <motion.div className="rounded-full bg-light h-6 w-6 mr-1"
                            animate={{
                                scale: [1, 0.6, 1],
                                transition: {
                                    duration: 1.5,
                                    repeat: Infinity
                                }
                            }}
                        />
                        <motion.div className="rounded-full bg-light h-6 w-6 mr-1"
                            animate={{
                                scale: [1, 0.6, 1],
                                transition: {
                                    delay: 0.5,
                                    duration: 1.5,
                                    repeat: Infinity
                                }
                            }}
                        />
                        <motion.div className="rounded-full bg-light h-6 w-6 "
                            animate={{
                                scale: [1, 0.6, 1],
                                transition: {
                                    delay: 1,
                                    duration: 1.5,
                                    repeat: Infinity
                                }
                            }}
                        />

                    </motion.div>
                </div>
            }
            {
                (heroData.length !== 0 && !loading) && <motion.div className="embla" ref={emblaRef}
                    initial={{
                        opacity: 0,

                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 1,

                        }
                    }}
                >
                    <div className="embla__container h-screen">
                        {heroData.length !== 0 && heroData.map((anime, index) => {
                            const title = anime.attributes.titles.en || anime.attributes.titles.en_us || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp || "";

                            const gradientStyle = {
                                backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.891281512605042) 30%, rgba(78, 78, 91, 0) 100%, rgba(28, 23, 23, 1) 100%), url(${anime.attributes.coverImage.original})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            };

                            const gradientStyleForMobile = {
                                backgroundImage: `linear - gradient(90deg, rgba(0, 0, 0, 0.891281512605042) 30 %, rgba(78, 78, 91, 0) 100 %, rgba(28, 23, 23, 1) 100 %), url(${anime.attributes.coverImage.original})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            };

                            return (
                                <div className="embla__slide" key={anime.id}>
                                    <div className="image">
                                        <div
                                            className="w-screen h-[70vh] md:h-screen"
                                            style={gradientStyle}
                                        >
                                            <div className='gradientDiv text-light relative top-[50%] sm:-top-[10%] md:top-0 sm:translate-y-[40%] left-10 w-[60%] md:w-[50%]'>
                                                <p className='text-base sm:text-lg md:text-xl lg:text-[24px] font-bold'><span className='text-primaryDark'>#{index + 1}</span>Rank</p>
                                                <h1 className='text-[26px] min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-5'>{title}</h1>
                                                <div className="smallinfo flex md:font-semibold mb-5 text-sm sm:text-base md:text-lg text-light ">
                                                    <div className="type flex items-center mr-5">
                                                        <FaPlayCircle className='mr-[6px] text-green' />
                                                        {anime.attributes.showType}
                                                    </div>
                                                    <div className="type flex items-center mr-5">
                                                        <FaClock className='mr-[6px] text-green' />
                                                        {anime.attributes.episodeLength}
                                                    </div>
                                                    <div className="type flex items-center mr-5">
                                                        <FaFilm className='mr-[6px] text-green' />
                                                        {anime.attributes.episodeCount}
                                                    </div>
                                                    <div className="hidden md:flex type items-center">
                                                        <FaCalendar className='mr-[6px] text-green' />
                                                        {anime.attributes.startDate}
                                                    </div>
                                                </div>
                                                <p className='hidden sm:block md:text-base mb-5 mt-3'>{anime.attributes.description.length > 200 ? `${anime.attributes.description.split(" ").slice(0, 40).join(" ")}...` : anime.attributes.description}</p>
                                                <button className='text-sm md:text-base font-bold p-2 md:px-4 md:py-3 bg-light text-dark rounded-lg my-4 flex items-center '
                                                    onClick={openOverview.bind(null, index)}
                                                >More Details <FaInfoCircle className='ml-2 text-xl' /> </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <motion.div className='right-2 bottom-4 sm:bottom-[42%] md:bottom-[45%] lg:bottom-[51%] absolute text-lg flex flex-col '
                        initial={{
                            opacity: 0,
                            x: "50vw"
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: "just",
                                duration: 1
                            }
                        }}
                    >
                        <button className="embla__next -mb-2 md:mb-1 bg-black/75 rounded-lg p-4 scale-75 md:scale-100 " onClick={scrollNext}>
                            <FaChevronRight />
                        </button>
                        <button className="embla__prev bg-black/75 rounded-lg p-4 scale-75 md:scale-100 " onClick={scrollPrev}>
                            <FaChevronLeft />
                        </button>
                    </motion.div>
                </motion.div>
            }
        </>
    )
}
