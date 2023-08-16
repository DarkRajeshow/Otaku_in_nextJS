"use client"
import React, { useContext, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Contexts } from '@/context/Store';
import { FaSearch } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


export default function NavBar() {
    const pathname = usePathname();

    const { NavigateHome, navigateSearchPage, searchedAnimeName, searchAnime, setSearchedAnimeName, setIsItSearchPage } = useContext(Contexts);

    const inputRef = useRef(null);

    const [InputBarWidth, setInputBarWidth] = useState(240);

    const handleChange = (event) => {
        if (event.target.value.trim() !== "") {
            setSearchedAnimeName(event.target.value);
        }
        else {
            setSearchedAnimeName("");
        }
    }

    useEffect(() => {
        if (pathname === '/search' && inputRef.current) {
            searchAnime();
            setIsItSearchPage(true);
            inputRef.current.focus();
        }
        else {
            setIsItSearchPage(false);
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchAnime();
        }
    };


    return (
        <motion.div className="h-24 md:h-24 p-5 w-full border-b-2 border-[white] flex justify-between"

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
            <div className="logo flex text-white font-bold border-r-2 border-[white] align-middle w-32 md:w-36 lg:w-44" onClick={NavigateHome}>
                <motion.img className='w-14 rounded-md cursor-pointer' src="https://image.lexica.art/full_jpg/330dbad7-fcc6-4211-92d4-7bb72d99572b" alt=""
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
                        borderRadius: "100%",
                    }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <motion.div className='m-auto overflow-hidden'
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
                    <h3 className='text-center text-sm sm:text-base md:text-lg lg:text-xl'>OTAKU</h3>
                </motion.div>
            </div>

            {["/", "/overview"].includes(pathname) && <div className="sections flex items-center font-semibold lg;text-base xl:text-lg">
                <span className='text-[#cbcdc2] hidden lg:block'>🌟Looking for custom anime recommendations? <Link href={"/step1"} className='text-[#a2eeff] underline underline-offset-4'> Click here.</Link> 🎬🔍</span>
                <span className='text-[#cbcdc2]  lg:hidden md:block hidden'>🌟Wants custom recommendations? <Link href={"/step1"} className='text-[#a2eeff] underline underline-offset-4'> Click here.</Link> 🎬🔍</span>
            </div>
            }

            < div className="serachLink flex align-middle font-bold justify-between p-0"

            >
                {pathname == "/search" && <motion.input
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
                    type="text"
                    className="bg-black my-auto h-[2rem] sm:h-[2.5rem] rounded-s-sm rounded-e-sm text-xl py-3 px-5 appearance-none "
                />}

                <motion.div
                    className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 text-[2rem] sm:text-[2.5rem] cursor-pointer m-auto"
                    onClick={pathname === "/search" ? searchAnime : () => {
                        navigateSearchPage();
                        searchAnime();
                    }}
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
    )
}
