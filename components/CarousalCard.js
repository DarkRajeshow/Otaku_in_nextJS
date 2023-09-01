import { Contexts } from '@/context/Store'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FaCalendar, FaClock, FaFilm, FaPlayCircle, FaInfoCircle, FaStar, FaDotCircle } from 'react-icons/fa'

export default function CarousalCard({ anime, gradientStyle, title, index, openOverview, CategoryColors }) {

    const genreData = anime.relationships.genres.data
    const genreBaseUrl = 'https://kitsu.io/api/edge/genres/'
    const [genres, setGenres] = useState([]);

    // fetchAnimeLinks
    const fetchAnimeGenres = async () => {
        try {
            const unParsedGenresList = await Promise.all(
                genreData.map((genre) => fetch(`${genreBaseUrl}${genre.id}`).then(response => response.json()))
            );

            const genresArray = unParsedGenresList.map(data => data.data.attributes.name);
            setGenres(genresArray);
        }
        catch (error) {
            console.error('An error occurred while fetching genres:', error);
        }
    };

    useEffect(() => {
        fetchAnimeGenres();
    }, [])

    return (
        <div className="embla__slide" key={anime.id}>
            <div className="image">
                <div
                    className="w-screen h-[70vh] md:h-[100vh] flex items-center"
                    style={gradientStyle}
                >
                    <div className='gradientDiv text-light relative left-6 sm:left-10 w-[70%] sm:w-[60%] md:w-[50%]'>
                        <p className='text-base sm:text-lg md:text-xl lg:text-[24px] font-bold'><span className='text-primaryDark'>#{index + 1}</span>Rank</p>
                        <h1 className='text-[26px] leading-7 min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-1 sm:mt-2 mb-2 sm:mb-5'>{title}</h1>
                        <div className="smallinfo flex font-medium sm:font-semibold mb-2 sm:mb-5 text-sm sm:text-base md:text-lg text-light ">
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
                        <p className='hidden sm:block md:text-base mb-3 sm:mb-5 mt-3 font-medium'>{anime.attributes.description.length > 200 ? `${anime.attributes.description.split(" ").slice(0, 40).join(" ")}...` : anime.attributes.description}</p>
                        {genres.length !== 0 && <motion.div className={`hidden sm:flex text-[12px] md:text-sm lg:text-base mb-4`}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition:{
                                    type:"just",
                                    duration: 1
                                }
                            }}
                        >
                            {genres.map((genre, index) => {
                                return (
                                    <p key={index} className={`mr-3 ${CategoryColors[index]} flex items-center font-medium`}><FaDotCircle className='mr-[2px]' />{genre}</p>
                                )
                            })}
                        </motion.div>}
                        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex items-center '><FaStar className='mr-2 text-fantasy' /> {Math.round(anime.attributes.averageRating) / 10}</p>
                        <button className='text-sm md:text-base font-bold p-2 md:px-4 md:py-3 bg-light text-dark rounded-lg my-2 sm:my-4 flex items-center '
                            onClick={openOverview.bind(null, anime.id)}
                        >More Details <FaInfoCircle className='ml-2 text-xl' /> </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
