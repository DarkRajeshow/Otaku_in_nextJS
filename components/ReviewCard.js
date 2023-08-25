import React, { useState } from 'react'
import RatingStars from './RatingStars';
import { motion } from 'framer-motion';
import { FaRegThumbsUp, FaThumbsUp, FaUserCircle } from 'react-icons/fa';

export default function ReviewCard({ review }) {


    const dateString = review.uploadDate;
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatedPublishedDate = date.toLocaleDateString('en-US', options);


    const [isExpanded, setIsExpanded] = useState(false);

    const [isLiked, setIsLiked] = useState(false);

    const [likesCount, setLikesCount] = useState(review.likeCount);

    const shortDescriptionSplited = review.description.split(" ");
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const truncatedContent = shortDescriptionSplited.slice(0, 60).join(" ") + (((!isExpanded) && shortDescriptionSplited.length > 60) ? " . . . ." : "");
    const shouldTruncate = shortDescriptionSplited.length > 60;
    const reviewDescription = isExpanded ? review.description : truncatedContent;

    return (
        <>
            <motion.div className="reviewBox p-4 bg-[#0000003b] rounded-xl mb-2 sm:mb-3 md:mb-4 lg:mb-5"
                initial={{
                    opacity: 0,
                    x: "10vh"
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        type: "just",
                        duration: 0.7,
                        delay: 0.3,
                    }
                }}
                whileTap={{
                    scale: 0.995,
                }}
                viewport={{
                    once: true
                }}
            >
                <div className="content"
                    onClick={toggleExpand}
                >
                    <div className="heading mb-2 md:mb-5">
                        <span className='text-xl md:text-2xl lg:text-3xl font-bold capitalize'> <FaUserCircle className="fa-sitemap text-3xl md:text-3xl lg:text-5xl pr-2 md:pr-3 inline" />{`${review.name.firstName} ${review.name.lastName}`} </span>
                        <div className='text-sm md:text-base text-gray-400 font-bold'>On {formatedPublishedDate}</div>
                        <div className='pr-10'><RatingStars rating={review.rating} /></div>
                    </div>

                    <div className="textReview">
                        <div className="review-content text-xs min-[400px]:text-sm md:text-base " dangerouslySetInnerHTML={{ __html: reviewDescription }}></div>
                        {shouldTruncate && (
                            <p className="text-xs min-[400px]:text-sm md:text-base text-sky-200 font-medium cursor-pointer">
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </p>
                        )}
                    </div>
                </div>
                <div className="rating flex py-2 md:py-5 text-lg md:text-xl"
                    onClick={() => {
                        setIsLiked(!isLiked);
                        if (!isLiked) {
                            setLikesCount(likesCount + 1);
                        }
                        else {
                            setLikesCount(likesCount - 1);
                        }
                    }}
                >
                    <div className='pr-10'>
                        <span className='pr-2'>{likesCount} {isLiked ? <FaThumbsUp className='inline ml-1 pb-1 text-xl md:text-[22px] cursor-pointer' /> : <FaRegThumbsUp className='inline ml-1 pb-1 text-xl md:text-[22px] cursor-pointer' />}</span>
                    </div>
                </div>

            </motion.div >
        </>
    )
} 
