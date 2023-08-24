"use client"
import React, { useContext } from 'react'
import Card from './Card';
import InternetError from './InternetError';
import NoResultFound from './NoResultFound';
import { motion } from 'framer-motion';
import { Contexts } from '@/context/Store';
import SmartLoader from './SmartLoader';
import AnimateText from './AnimateText';
import { FaArrowAltCircleUp } from 'react-icons/fa';

export default function Search() {

  const { searchedAnimeList, loading, noResult, internetError, searchAnime } = useContext(Contexts);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Add smooth scrolling animation
    });
  };



  return (
    <>
      <div className="heading m-auto w-2/3 text-center my-16">
        <div className='text-center'>
          <AnimateText className='text-3xl min-[400px]:text-4xl md:text-5xl xl:text-6xl font-bold pb-3 mt-10' text={"Explore Anime Gallery."} />
          <motion.p className='text-xs sm:text-sm md:text-base lg:text-lg'
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
          >Unveil the Epic World of Animated Wonders through Seamless Search! 🌟✨</motion.p>
        </div>
      </div>
      {(!noResult && !internetError && !loading) && (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-[90%] mx-auto gap-1 pb-10 mb-28">
            {searchedAnimeList.map((card, index) => (
              <Card card={card} index={index} key={card.id} />
            ))}
          </div>
          {(!loading && searchedAnimeList.length !== 0) && <div className='flex items-center justify-center mb-32'>
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
              onClick={scrollToTop}
            ><FaArrowAltCircleUp className='mr-1' /> Go To Top.</motion.button>
          </div>}

        </>
      )}
      {(loading) && <SmartLoader height='[70vh]' />}
      {((internetError && noResult) || (internetError)) && <InternetError isTryAgainRequired={false} />}
      {((!internetError && noResult)) && <NoResultFound errorMessage="Result Not Found." tryAgain={searchAnime} />}

    </>
  )
}


//https://kitsu.io/api/edge/anime?filter[text]=${nameOftheAnime}