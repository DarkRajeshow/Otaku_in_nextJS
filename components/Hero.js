"use client"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { FaCalendar, FaChevronLeft, FaChevronRight, FaClock, FaFilm, FaPlayCircle, FaInfoCircle } from 'react-icons/fa'
import { Contexts } from '@/context/Store'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
export default function Hero() {
    const { setCurrentAnimeOverview, setAnimeId, setvideoId, setShortDescription, setCurrentRating } = useContext(Contexts)


    const navigate = useRouter();

    const [heroData, setHeroData] = useState([]);
    const [generForHero, setgenerForHero] = useState("");
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

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
            let animeData = await fetch(`https://kitsu.io/api/edge/anime?${generForHero !== "" ? `&filter[genres]=${generForHero}` : ""}&sort=popularityRank&page[limit]=10&fields[anime]=titles,description,coverImage,episodeCount,showType,episodeLength,startDate,youtubeVideoId,showType`);

            let parsedanimeData = await animeData.json();

            console.log(parsedanimeData);
            if (parsedanimeData.data.length === 0) {
                setHeroData([])
                return;
            }
            setHeroData(parsedanimeData.data)
            console.log(parsedanimeData.data);
            console.log(heroData);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchHeroAnimeList();
    }, [])

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container h-screen">
                {heroData.length !== 0 && heroData.map((anime, index) => {
                    const title = anime.attributes.titles.en || anime.attributes.titles.en_us || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp || "";

                    const gradientStyle = {
                        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.891281512605042) 30%, rgba(78,78,91,0) 56%, rgba(28,23,23,1) 100%), url(${anime.attributes.coverImage.original})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    };

                    return (
                        <div className="embla__slide bg-light" key={anime.id}>
                            <div className="image">
                                <div
                                    className="w-full h-screen"
                                    style={gradientStyle}
                                >
                                    <div className='gradientDiv text-light relative top-[20%] left-10 w-[50%]'>
                                        <p className='text-[24px] font-bold'><span className='text-primaryDark'>#{index + 1}</span>Rank</p>
                                        <h1 className='text-6xl font-bold mt-2 mb-5'>{title}</h1>
                                        <div className="smallinfo flex font-semibold mb-5 text-lg text-light">
                                            <div className="type flex items-center mr-5">
                                                <FaPlayCircle className='mr-[6px] text-primaryDark' />
                                                {anime.attributes.showType}
                                            </div>
                                            <div className="type flex items-center mr-5">
                                                <FaClock className='mr-[6px] text-primaryDark' />
                                                {anime.attributes.episodeLength}
                                            </div>
                                            <div className="type flex items-center mr-5">
                                                <FaFilm className='mr-[6px] text-primaryDark' />
                                                {anime.attributes.episodeCount}
                                            </div>
                                            <div className="type flex items-center">
                                                <FaCalendar className='mr-[6px] text-primaryDark' />
                                                {anime.attributes.startDate}
                                            </div>
                                        </div>
                                        <p className='mb-4'>{anime.attributes.description.length > 200 ? `${anime.attributes.description.split(" ").slice(0, 40).join(" ")}...` : anime.attributes.description}</p>
                                        <button className='font-bold px-4 py-3 bg-light text-dark rounded-lg my-4 flex items-center '
                                            onClick={openOverview.bind(null, index)}
                                        >More Details <FaInfoCircle className='ml-2 text-xl' /> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="embla__next absolute right-10 -bottom-6 bg-black rounded-lg p-4 text-lg" onClick={scrollNext}>
                <FaChevronRight />
            </button>
            <button className="embla__prev absolute right-10 -bottom-20 bg-black rounded-lg p-4 text-lg" onClick={scrollPrev}>
                <FaChevronLeft />
            </button>
        </div>
    )
}
