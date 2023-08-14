"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {

    // document.title = "Otaku : Discover Anime"
    const [imageIndex, setImageIndex] = useState(0);
    const [newImage, setNewImage] = useState(false);
    let images = [
        //death note
        "https://th.bing.com/th/id/R.d17342790a2187388ba97e17030e9ab2?rik=BxpRL16%2b1CTDZw&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f32600000%2f-Death-Note-death-note-32692462-1024-768.jpg&ehk=z%2brnL4R0bYcakjCclQtrj6q87b9C%2fS6Hlr349AIR1N8%3d&risl=&pid=ImgRaw&r=0",

        //Attack on titan
        `https://darkrajeshow.github.io/Otaku_An_Anime_Discovery/AOT1.jpg`,

        //one punch man
        "https://th.bing.com/th/id/R.a4632460909c527c537a0fc3404473b9?rik=h12ze6VLvZ3jzA&riu=http%3a%2f%2frandomc.net%2fimage%2fOne-Punch+Man%2fOne-Punch+Man+-+02+-+Large+19.jpg&ehk=NIcrZT4Eb%2bzJ0n476t8fCfCV%2fIX414sa%2fI56AMZNeNc%3d&risl=&pid=ImgRaw&r=0",

        //tokyo revengers
        "https://honeysanime.com/wp-content/uploads/2021/08/Tokyo-Revengers-Wallpaper-5-768x543.jpg",

        //demon slayer
        "https://wallpapercave.com/wp/wp6323148.jpg"
    ];

    useEffect(() => {
        setNewImage(false);
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 10000);
        setNewImage(true);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-auto w-10/12 mt-10 grid gap-6 grid-cols-1 min-[1430px]:grid-cols-2 border-b-2 pb-10 border-white mb-40">
            <motion.div className="heading pb-4 grid-cols-1 px-[2%] py-5 "
                key={imageIndex}
                initial={{
                    y: "-10vh",
                    opacity: 0
                }}
                exit={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    origin: 0,
                    y: 0,
                    transition: {
                        type: 'tween',
                        duration: 1
                    }
                }}
                transition={{
                    duration: 1
                }}
            >
                <h1 className='text-4xl font-bold py-5 sm:text-7xl'>Discover Your Perfect Anime.</h1>
                <p className='text-lg '>Explore a world of captivating anime series tailored to your preferences. With Anime Finder, effortlessly discover the best anime based on your chosen genre, age rating, and more. Start your immersive journey into the world of anime today!</p>
                <div className=''>
                    <Link href={'/step1'}><motion.button className='border-black mt-7 mx-5 border-2 px-4 py-2 mr-10 rounded-[30px] font-bold bg-white text-black'
                        initial={{
                            scale: 1,
                            opacity: 0,
                            y: "10vh"
                        }}
                        animate={{
                            opacity: 1,
                            transition: { type: 'spring', stiffness: 50 },
                            scale: 1.2,
                            y: 0
                        }}
                        whileHover={{
                            scale: 1.3,
                            transition: { type: 'spring', duration: 0.5 },
                        }}

                    >Discover Anime! 👁️🎯</motion.button></Link>
                    {/* <br /> */}
                    <Link href={'/search'}><motion.button className='border-white mt-5 mx-5 border-2 px-4 py-2 rounded-[30px] font-semibold'
                        initial={{
                            scale: 1,
                            opacity: 0,
                            y: "10vh"
                        }}
                        animate={{
                            opacity: 1,
                            transition: { type: 'spring', stiffness: 50 },
                            scale: 1.2,
                            y: 0
                        }}
                        whileHover={{
                            scale: 1.3,
                            transition: { type: 'spring', duration: 0.5 },
                        }}

                    >Search Anime! 🔎📺</motion.button></Link>
                </div>
            </motion.div>
            <div className="image grid-cols-1 rounded-lg overflow-hidden" >
                {newImage && <motion.img
                    className='w-full h-full rounded-lg cursor-pointer'
                    src={images[imageIndex]}
                    onClick={() => {
                        setImageIndex((prevIndex) => (prevIndex + 1) % 5);
                    }}
                    alt="hero"
                    initial={{
                        y: "10vh",
                        scale: 1,
                    }}
                    animate={{
                        y: 0,
                        scale: [1.1, 1.2, 1],
                        opacity: 1,
                        transition: {
                            duration: 2
                        },
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    transition={{
                        type: "spring",
                        duration: 1,
                    }}

                    loading='lazy'
                />
                }
            </div>

        </div >
    )
}
