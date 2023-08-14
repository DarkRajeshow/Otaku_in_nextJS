"use client"
import React, { useContext, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Contexts } from '@/context/Store';
import { FaSearch } from 'react-icons/fa';
import { usePathname } from 'next/navigation';


export default function NavBar() {
    const pathname = usePathname();

    const { NavigateHome, navigateSearchPage, searchedAnimeName, searchAnime, setSearchedAnimeName, setIsItSearchPage } = useContext(Contexts);

    const inputRef = useRef(null);

    const [InputBarWidth, setInputBarWidth] = useState(280);

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
            if (window.innerWidth <= 500) {
                setInputBarWidth(100)
            }
            else if (window.innerWidth <= 775) {
                setInputBarWidth(180)
            }
            else {
                setInputBarWidth(280);
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
        <motion.div className="h-24 md:h-32 p-5 w-full border-b-2 border-[white] flex justify-between"

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
            <div className="logo flex text-2xl text-white font-bold border-r-2 border-[white] align-middle w-52" onClick={NavigateHome}>
                <motion.img className='w-14 md:h-[5.5rem] md:w-[5.5rem] rounded-md cursor-pointer' src="https://image.lexica.art/full_jpg/330dbad7-fcc6-4211-92d4-7bb72d99572b" alt=""
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
                    <h3 className='text-center'>OTAKU</h3>
                </motion.div>
            </div>
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
                    className="bg-black my-auto h-[2rem] sm:h-[2.5rem] md:h-[4rem] rounded-s-xl rounded-e-md md:text-[1.5rem] text-[1rem] px-5 appearance-none"
                />}

                <motion.div
                    className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 text-[2rem] sm:text-[2.5rem] md:text-[4rem] cursor-pointer m-auto"
                    onClick={pathname == "/search" ? searchAnime : () => {
                        navigateSearchPage();
                        searchAnime();
                    }}
                    initial={{ opacity: 0.6 }}
                    whileInView={{ opacity: [0, 1] }}
                    whileHover={{
                        transition: {
                            duration: 0.2, // Adjust the duration as needed
                        },
                        opacity: 1, // Set opacity explicitly to prevent it from going to 100%
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
