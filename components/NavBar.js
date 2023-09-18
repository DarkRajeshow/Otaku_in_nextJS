"use client"
import React, { useContext, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Contexts } from '@/context/Store';
import { FaFilter, FaPowerOff, FaSearch } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import logo from '@/public/logo.jpeg'


export default function NavBar() {

    const currentYear = new Date().getFullYear();
    const last10Years = Array.from({ length: 10 }, (_, index) => currentYear - index);
    const episodeCounts = Array.from({ length: 10 }, (_, index) => (index + 1) * 12);
    const ageRatings = [
        { value: 'G', label: 'G - All Ages' },
        { value: 'PG', label: 'PG - Above 13' },
        { value: 'R', label: 'R - 17+ violence' },
    ];
    const { NavigateHome, navigateSearchPage, searchedAnimeName, searchAnime, setSearchedAnimeName, selectedGenres, setSelectedGenres, selectedYear, setSelectedYear, selectedAgeRating, setSelectedAgeRating, selectedEpisodeCount, setSelectedEpisodeCount, selectedType, setSelectedType, selectedSortType, setSelectedSortType, setSelectedCategory, selectedCategory } = useContext(Contexts);

    const pathname = usePathname();

    const [InputBarWidth, setInputBarWidth] = useState(240);
    const inputRef = useRef(null);
    const [isFilterOpened, setIsFilterOpened] = useState(false)

    const colorCodes = [
        "#1b1b1b",     // dark
        // "#887171",     // action
        // "#8B5CF6",     // future
        // "#60A5FA",     // sliceOfLife
        // "#14B8A6",     // sports
        // "#FBBF24",     // shounen
        // "#DC2626",     // thriller
        "#EC4899",    // all
        "#1b1b1b",     // dark
    ];

    const sortOptions = [
        { value: 'popularityRank', label: 'Popularity Rank' },
        { value: '-averageRating', label: 'Average Rating' },
        { value: '-favoritesCount', label: 'Favorites Count' },
        // Add more sort options here
    ];

    const subtypes = [
        { value: 'TV', label: 'TV Series' },
        { value: 'movie', label: 'Movies' },
        { value: 'special', label: 'Specials' },
        { value: 'OVA', label: 'OVA' },
        { value: 'ONA', label: 'ONA' },
        { value: 'music', label: 'Music Videos' }
    ];

    const genres = [
        { value: 'action', title: 'Action' },
        { value: 'adventure', title: 'Adventure' },
        { value: 'comedy', title: 'Comedy' },
        { value: 'drama', title: 'Drama' },
        { value: 'ecchi', title: 'Ecchi' },
        { value: 'fantasy', title: 'Fantasy' },
        { value: 'historical', title: 'Historical' },
        { value: 'horror', title: 'Horror' },
        { value: 'mystery', title: 'Mystery' },
        { value: 'romance', title: 'Romance' },
        { value: 'school', title: 'School' },
        { value: 'sci-fi', title: 'Sci-Fi' },
        { value: 'shoujo', title: 'Shoujo' },
        { value: 'shounen', title: 'Shounen' },
        { value: 'sports', title: 'Sports' },
        { value: 'supernatural', title: 'Supernatural' },
        { value: 'thriller', title: 'Thriller' },
        { value: 'yaoi', title: 'Yaoi' },
        { value: 'yuri', title: 'Yuri' },
    ];

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSortTypeChange = (event) => {
        setSelectedSortType(event.target.value);
    };
    const handleAgeRatingChange = (event) => {
        setSelectedAgeRating(event.target.value);
    };

    const handleChange = (event) => {
        if (event.target.value.trim() !== "") {
            setSearchedAnimeName(event.target.value);
        }
        else {
            setSearchedAnimeName("");
        }
    }


    const handleGenreAddRemove = (event) => {
        if (event.target.innerText === "All") {
            setSelectedGenres([])
            return;
        }
        if (selectedGenres.includes(event.target.innerText)) {
            setSelectedGenres(selectedGenres.filter((genre) => {
                return genre !== event.target.innerText
            }))
        }

        else {
            setSelectedGenres([...selectedGenres, event.target.innerText])
        }
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleEpisodeCountChange = (event) => {
        setSelectedEpisodeCount(event.target.value);
    };


    useEffect(() => {
        if (pathname === '/search' && inputRef.current) {
            searchAnime();
            inputRef.current.focus();
        }
        if (window.innerWidth <= 400) {
            setInputBarWidth(80)
        }
        else if (window.innerWidth <= 500) {
            setInputBarWidth(100)
        }
        else if (window.innerWidth <= 775) {
            setInputBarWidth(160)
        }
        else if (window.innerWidth <= 1100) {
            setInputBarWidth(190)
        }
        else {
            setInputBarWidth(240);
        }
        const handleResize = () => {
            if (window.innerWidth <= 400) {
                setInputBarWidth(80)
            }
            else if (window.innerWidth <= 500) {
                setInputBarWidth(100)
            }
            else if (window.innerWidth <= 775) {
                setInputBarWidth(160)
            }
            else if (window.innerWidth <= 1100) {
                setInputBarWidth(190)
            }
            else {
                setInputBarWidth(240);
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [pathname]);

    // selectedYear, selectedGenres, selectedAgeRating, selectedEpisodeCount, selectedType, selectedSortType

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchAnime();
        }
    };


    return (
        <div className='w-full bg-dark'>
            <motion.div className="h-[70px] sm:h-[84px] p-3 w-full border-b-[1px] border-[white] flex justify-between z-20"
                transition={{
                    type: 'tween', duration: 1
                }}
                initial={{
                    y: -150
                }}
                animate={{
                    y: 0
                }}
            >
                <div className="logo flex text-white font-bold border-r-2 border-[white] align-middle  sm:w-32 md:w-36 lg:w-44 items-center" onClick={NavigateHome}>
                    <motion.img className='w-8 sm:w-10 md:w-12 lg:w-14 cursor-pointer border-2 border-light rounded-full h-8 sm:h-10 md:h-12 lg:h-14 mr-3 md:mr-0' src={logo.src} alt=""
                        initial={{ opacity: 0.6 }}
                        whileInView={{ opacity: [0, 1] }}
                        whileHover={{
                            scale: 1.2,
                            transition: {
                                duration: 2
                            }
                        }}
                        whileTap={{
                            scale: 0.8,
                        }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                    <motion.div className='m-auto overflow-hidden cursor-pointer'
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{
                            opacity: [0, 1],
                            width: "50%",
                            transition: { duration: 2 },
                        }}
                        whileHover={{
                            scale: 1.1
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <h3 className='hidden sm:block text-center text-xs sm:text-sm md:text-md lg:text-lg'>Universe</h3>
                    </motion.div>
                </div>

                {["/", "/overview"].includes(pathname) && <div className="sections flex items-center font-medium lg;text-base xl:text-lg justify-center">
                    <span className='text-[#cbcdc2] hidden lg:block'>🌟Looking for custom anime recommendations? <Link href={"/step1"} className='text-[#a2eeff] underline underline-offset-4'> Click here.</Link> 🎬🔍</span>
                    <span className='text-[#cbcdc2]  lg:hidden md:block hidden'>🌟Wants custom recommendations? <Link href={"/step1"} className='text-[#a2eeff] underline underline-offset-4'> Click here.</Link> 🎬🔍</span>
                    <span className='text-[#cbcdc2] hidden sm:block md:hidden'>custom recommendations? <Link href={"/step1"} className='text-[#a2eeff] underline underline-offset-4'> Click here.</Link> 🎬🔍</span>
                    <Link href={"/step1"} className='text-[#a2eeff] sm:hidden  underline underline-offset-4 font-bold'> Discover</Link>
                </div>
                }

                < div className="serachLink flex align-middle font-bold justify-between p-0"

                >
                    {pathname == "/search" && <motion.div className='flex items-center'>
                        <div className='h-full flex items-center py-3 sm:py-2'>
                            <motion.button className='h-full flex items-center text-xs sm:text-sm md:text-md lg:text-lg px-2 py-1 border-2 border-light mx-3 rounded-md  bg-pinkBlue text-dark'

                                onClick={() => {
                                    setIsFilterOpened(!isFilterOpened);
                                }}
                                whileHover={{
                                    color: colorCodes,
                                    transition: {
                                        type: "just",
                                        duration: 2,
                                        repeat: Infinity
                                    }
                                }}
                            >
                                <FaFilter className='mx-1' /> <span className='hidden md:block'>Filter</span>
                            </motion.button>
                        </div>
                        <motion.input
                            value={searchedAnimeName}
                            onChange={handleChange}
                            initial={{
                                width: 0
                            }}
                            whileInView={{
                                width: InputBarWidth,
                                transition: {
                                    duration: 1,
                                    type: "just"
                                }
                            }}
                            onKeyDown={handleKeyDown}
                            ref={inputRef}
                            placeholder='Search anime...'
                            type="text"
                            className="bg-black my-auto h-[2rem] sm:h-[2.5rem] rounded-s-sm rounded-e-sm text-xs sm:text-base md:text-lg lg:text-xl py-3 px-2 sm:px-3 appearance-none "
                        />
                    </motion.div>
                    }

                    <motion.div
                        onClick={() => {
                            if (pathname === "/search") {
                                searchAnime();
                            }
                            else {
                                navigateSearchPage();
                                searchAnime();
                            }
                        }}
                        className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 text-[2rem] sm:text-[2.5rem] cursor-pointer m-auto"
                        animate={pathname === "/search" ? {} : {
                            scale: [1, 0.9, 1],
                            transition: {
                                duration: 2, // Adjust the duration as needed
                                type: "just",
                                repeat: Infinity
                            },
                        }}
                        whileTap={{
                            scale: 0.7,
                        }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <FaSearch />
                    </motion.div>
                </div>
            </motion.div>
            {(pathname === "/search" && isFilterOpened) && <div className='text-sm flex flex-col font-bold z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[90vw] md:w-[80vw] lg:w-[70vw] fixed backdrop-blur-md bg-light/60 rounded-lg p-3 sm:p-8 md:p-10 min-h-[60vh] text-dark'>

                <button onClick={() => {
                    setIsFilterOpened(false)
                }} className='ml-auto text-sm sm:text-xl text-light bg-dark p-1 rounded-full border-2 border-light'><FaPowerOff /></button>
                <h1 className='text-base sm:text-xl py-1 sm:py-3 text-light'>Filters :</h1>
                <div className='grid md:grid-cols-2 xl:grid-cols-3 text-light gap-[2px] sm:gap-1 text-xs md:text-sm'>
                    <div className='bg-dark/50 flex items-center px-5 py-1 md:py-2 border-action rounded-md'>
                        <span >Sort By : </span>
                        <select
                            value={selectedSortType}
                            onChange={handleSortTypeChange}
                            name="sortType"
                            className="bg-black rounded-lg p-1 md:p-2 ml-2 max-h-10 overflow-y-auto text-romance cursor-pointer"
                        >
                            <option value="">Sort by</option>
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='bg-dark/50 flex items-center px-5 py-1 md:py-2 border-action rounded-md'>
                        <span >Type : </span>
                        <select
                            value={selectedType}
                            onChange={handleTypeChange}
                            name="subtype"
                            className="bg-black text-romance rounded-lg p-1 md:p-2 ml-2 max-h-10 overflow-y-auto cursor-pointer"
                        >
                            <option value="">All</option>
                            {subtypes.map((subtype) => (
                                <option key={subtype.value} value={subtype.value}>
                                    {subtype.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='bg-dark/50 flex items-center px-5 py-1 md:py-2 border-action rounded-md'>
                        <span >Age Rating : </span>
                        <select
                            value={selectedAgeRating}
                            onChange={handleAgeRatingChange}
                            name="ageRating"
                            className="bg-black text-romance rounded-lg p-1 md:p-2 ml-2 max-h-10 overflow-y-auto cursor-pointer"
                        >
                            <option value="">All</option>
                            {ageRatings.map((rating) => (
                                <option key={rating.value} value={rating.value}>
                                    {rating.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='bg-dark/50 flex items-center px-5 py-1 md:py-2 border-action rounded-md'>
                        <span >Episodes : </span>
                        <select
                            value={selectedEpisodeCount}
                            onChange={handleEpisodeCountChange}
                            name="episodeCount"
                            className="bg-black text-romance rounded-lg p-1 md:p-2 ml-2 max-h-10 overflow-y-auto cursor-pointer"
                        >
                            <option value={0}>All</option>
                            {episodeCounts.map((count) => (
                                <option key={count} value={count}>
                                    {count}+
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='bg-dark/50 flex items-center px-5 py-1 md:py-2 border-action rounded-md'>
                        <span >Release Year : </span>
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            name="year"
                            className="bg-black text-romance rounded-lg p-1 md:p-2 ml-2 max-h-10 overflow-y-auto cursor-pointer"
                        >
                            <option value="">All time</option>
                            {last10Years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='my-2 sm:my-5'>
                    <div className='flex flex-col py-1 sm:py-3 '>
                        <h1 className='text-base sm:text-xl text-light mr-2'>Genres : </h1>
                        {searchedAnimeName !== "" && <h1 className='text-base sm:text-sm text-action'>**While searching with title, the genres and sort by do not get applied.</h1>}
                    </div>
                    <div className='grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-[2px] sm:gap-1 md:gap-2 text-center'>
                        <span className={`cursor-pointer p-1 rounded-2xl bg-comedy/20 border-[1px] border-transparent text-xs sm:text-sm ${selectedGenres.length === 0 ? "!bg-comedy text-light border-dark" : ""} `} onClick={handleGenreAddRemove}>
                            All
                        </span>
                        {genres.map((genre, index) => {
                            return <span className={`${selectedGenres.includes(genre.title) ? " !bg-comedy text-light border-dark" : ""} cursor-pointer p-1 rounded-2xl bg-comedy/20 border-[1px] border-transparent text-xs sm:text-sm`} key={index} onClick={handleGenreAddRemove}>
                                {genre.title}
                            </span>
                        })}
                    </div>
                </div>

                {selectedCategory !== "" && <div className='my-1 sm:my-5'>
                    <div className='flex flex-col sm:py-3 '>
                        <h1 className='text-base sm:text-xl text-light'>Categories : </h1>
                        {selectedCategory !== "" && <h1 className='hidden sm:block text-sm text-action'>**Search by category only applicable with the results genre navigation.</h1>}
                    </div>
                    <div className='text-center grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5'>
                        <span className={`cursor-pointer px-8 py-1 rounded-2xl bg-comedy/20 border-[1px] border-transparent text-xs sm:text-sm !bg-comedy text-light border-dark mr-5 capitalize`}>
                            {selectedCategory}
                        </span>
                    </div>
                    <button className='px-2 py-[2px] text-[11px] sm:text-lg bg-black text-light mt-2 sm:my-3 rounded-md' onClick={() => {
                        setSelectedCategory("");
                        searchAnime();
                    }}
                    >Remove</button>
                </div>}

                <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-base">
                    <button className='p-2 sm:p-3 bg-psychological my-1 sm:my-3 rounded-md' onClick={() => {
                        setIsFilterOpened(false);
                        searchAnime();
                    }}>Apply Changes</button>

                    <button className='p-2 sm:p-3 bg-black text-light my-1 sm:my-3   rounded-md' onClick={async () => {
                        await setSelectedAgeRating("")
                        await setSelectedEpisodeCount(0)
                        await setSelectedSortType("")
                        await setSelectedType("")
                        await setSelectedYear("")
                        await setSelectedGenres([])
                        await setSelectedCategory('')
                    }}>Clear Filters</button>
                </div>
            </div>}
        </div>
    )
}
