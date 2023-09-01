import { motion } from 'framer-motion'
import React from 'react'

export default function SmartLoader({ className = "h-screen" }) {
    return (
        <div className={`w-full flex items-center justify-center ${className}`}>
            <motion.div className="flex "
                initial={{
                    opacity: 0.7
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
    )
}
