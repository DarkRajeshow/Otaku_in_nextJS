import { motion } from 'framer-motion'
import React from 'react'
import { FaFacebook, FaLink, FaShare, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
export default function ShareLinks({ title, OverviewPageLink }) {
    return (
        <div className='my-10 text-center p-4 sm:p-6 md:p-8 lg:p-10 rounded-md bg-light/5 backdrop-blur-md border-none'>
            <h1 className='py-4 font-bold text-sm sm:text-base md:text-lg flex items-center justify-center'>Share <FaShare className='ml-2' /></h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:flex items-center justify-center">
                <a href={`https://api.whatsapp.com/send?text=Check%20out%20${title}'s%20anime%20overview%20on%20OtakuUniverse:%20${OverviewPageLink}`} target='_blank' className="whatsapp flex items-center text-sm sm:text-base md:text-lg font-bold rounded-full px-3 p-2 bg-[#25D366] justify-center lg:mr-4 border-light">
                    <FaWhatsapp className='mr-[3px] rounded-full' /> WhatsApp
                </a>
                <a href={`https://t.me/share?text=Check%20out%20${title}'s%20anime%20overview%20on%20OtakuUniverse:%20&url=${OverviewPageLink}`} target='_blank' className="whatsapp flex items-center  text-sm sm:text-base md:text-lg font-bold rounded-full px-3 p-2 bg-[#0088CC] justify-center lg:mr-4 border-light">
                    <FaTelegram className='mr-[3px] rounded-full' /> Telegram
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(OverviewPageLink)}`} target='_blank' className="whatsapp flex items-center  text-sm sm:text-base md:text-lg font-bold rounded-full px-3 p-2 bg-[#1877F2] justify-center lg:mr-4 border-light">
                    <FaFacebook className='mr-[3px] rounded-full' /> facebook
                </a>
                <a href={`https://twitter.com/intent/tweet?text=Check%20out%20${title}'s%20anime%20overview%20on%20OtakuUniverse:%20&url=${OverviewPageLink}`} target='_blank' className="whatsapp flex items-center  text-sm sm:text-base md:text-lg font-bold rounded-full px-3 p-2 bg-[#1DA1F2] justify-center lg:mr-4 border-light">
                    <FaTwitter className='mr-[3px] rounded-full' /> Twitter
                </a>
                <motion.button target='_blank' className="whatsapp flex items-center text-sm sm:text-base md:text-lg font-bold rounded-full px-3 p-2 bg-[#555555] justify-center lg:mr-4 border-light"
                    whileTap={{
                        backgroundColor: "blue"
                    }}
                    onClick={() => {
                        const crrentUrl = window.location.href;
                        navigator.clipboard.writeText(crrentUrl)
                            .then(() => {
                                alert('URL copied to clipboard!');
                            })
                            .catch((error) => {
                                console.error('Error copying URL to clipboard:', error);
                            });
                    }}
                >
                    <FaLink className='mr-[3px] rounded-full' /> Copy Link
                </motion.button>
            </div>
        </div>
    )
}
