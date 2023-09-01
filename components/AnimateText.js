"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AnimateText({ text, colorful = false, className = "", durationtime = "0.7", isWord = false }) {

    const quatVarient = {
        initial: {
            opacity: 1,
        },
        whileInView: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    const wordVariant = {
        initial: {
            opacity: 0,
            y: 20
        },
        whileInView: {
            opacity: 1,
            y: 0,
            transition: {
                duration: durationtime,
            }
        }
    }

    const colorCodes = [
        "#f5f5f5",     // light
        "#1b1b1b",     // dark
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


    return (
        <motion.div className='inline-block w-full overflow-hidden'
            variants={quatVarient}
            initial="initial"
            whileInView="whileInView"
            animate={{
                color: colorful ? colorCodes : "#f5f5f5",
                transition: {
                    type: "just",
                    duration: colorful ? 40 : 1,
                    repeat: colorful ? Infinity : false,
                }
            }}
        >
            <h1 className={`capitalize ${className}  `}>
                {
                    text.split(" ").map((word, index) => {
                        return <motion.span
                            variants={wordVariant}
                            key={index} className='inline-block'>
                            {word}{!isWord ? <span>&nbsp;</span> : ""}
                        </motion.span>
                    })
                }
            </h1>
        </motion.div >
    )
}
