"use client"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { FaChevronLeft, FaChevronRight, FaTv, FaCaretDown, FaCaretUp, FaCheckCircle } from 'react-icons/fa'
import { Contexts } from '@/context/Store'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CarousalCard from './CarousalCard'
import SmartLoader from './SmartLoader'

export default function Hero() {
    const { setAnimeId, loading, setLoading } = useContext(Contexts)
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
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])


    const openOverview = async (id) => {
        await setAnimeId(id)
        navigate.push(`/search/${id}`)
    }

    const fetchHeroAnimeList = async () => {
        try {
            setLoading(true);


            const apiUrl = "https://kitsu.io/api/edge/anime";
            const queryParams = new URLSearchParams({
                include: "genres",
                sort: "popularityRank",
                "page[limit]": 10,
                "filter[categories]": `${generForHero}`,
            });

            const animeData = await fetch(`${apiUrl}?${queryParams}`);


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
            {heroData.length !== 0 && <motion.div className={`${isExpanded ? "h-auto" : "h-[110px]"} md:h-auto overflow-hidden category grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-20 md:px-[5%] lg:px-[10%] w-full mx-auto pt-4 text-center text-sm xl:text-base gap-1 bg-[rgba(255,255,255,.05)] relative pb-4`}
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
                            className={`font-bold rounded-sm flex items-center justify-center cursor-pointer hover:bg-dark/50 transition-[1s] p-3 ${CategoryColors[index]} ${Category === generForHero ? 'bg-dark hover:bg-none border-light' : ''}`}
                            key={index}
                            onClick={() => {
                                setgenerForHero(Category);
                            }}
                        >
                            {Category === generForHero ? <FaCheckCircle className='mr-2 text-light' /> : ""}
                            {Category}
                        </span>
                    );
                })}
                <span className='left-6 md:left-2 top-4 w-5 lg:hidden absolute text-xl bg-light text-dark rounded-md' onClick={() => { setIsExpanded(!isExpanded) }}>{isExpanded ? <FaCaretUp /> : <FaCaretDown />}</span>

            </motion.div >}
            {loading && <SmartLoader />}
            {
                (heroData.length !== 0 && !loading) && <motion.div className="embla" ref={emblaRef}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 1
                        }
                    }}
                >
                    <div className="embla__container h-screen">
                        {heroData.length !== 0 && heroData.map((anime, index) => {
                            const title = anime.attributes.titles.en || anime.attributes.titles.en_us || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp || "";

                            const gradientStyle = {
                                backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.891281512605042) 30%, rgba(78, 78, 91, 0) 100%, rgba(28, 23, 23, 1) 100%), url(${anime.attributes.coverImage.original})`,
                                backgroundPosition: 'center top',
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
                                <CarousalCard CategoryColors={CategoryColors} key={anime.id} index={index} anime={anime} gradientStyle={gradientStyle} title={title} openOverview={openOverview} />
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
