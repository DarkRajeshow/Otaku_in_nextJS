import React, { useState } from 'react'
import RatingStars from './RatingStars';
import { motion } from 'framer-motion';
import { FaRegThumbsUp, FaThumbsUp, FaUserCircle } from 'react-icons/fa';

export default function ReviewCard(props) {

    const dateString = props.review.attributes.createdAt;
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatedPublishedDate = date.toLocaleDateString('en-US', options);


    const [isExpanded, setIsExpanded] = useState(false);

    const [isLiked, setIsLiked] = useState(false);

    const [likesCount, setLikesCount] = useState(props.review.attributes.likesCount);

    let shortDescriptionSplited = props.review.attributes.contentFormatted.split(" ");
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const truncatedContent = shortDescriptionSplited.slice(0, 60).join(" ") + (((!isExpanded) && shortDescriptionSplited.length > 60) ? " . . . ." : "");
    const shouldTruncate = shortDescriptionSplited.length > 60;
    let review = isExpanded ? props.review.attributes.contentFormatted : truncatedContent;

    return (
        <>
            <motion.div className="reviewBox py-4 bg-[#0000003b] p-8 rounded-xl my-5"
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
            >
                <div className="content"
                    onClick={toggleExpand}
                >
                    <div className="heading mb-5">
                        <span className='text-3xl font-bold capitalize'> <FaUserCircle className="fa-sitemap text-3xl md:text-4xl lg:text-5xl pr-3 inline" />{`${props.RandomNames[props.index].firstName} ${props.RandomNames[props.index].lastName}`} </span>
                        <div className='text-gray-400 font-bold'>On {formatedPublishedDate}</div>
                        <div className='pr-10'><RatingStars rating={props.review.attributes.rating} /></div>
                    </div>

                    <div className="textReview">
                        <div className="review-content text-justify" dangerouslySetInnerHTML={{ __html: review }}></div>
                        {shouldTruncate && (
                            <p className="text-sky-200 font-medium cursor-pointer">
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </p>
                        )}
                    </div>
                </div>
                <div className="rating flex py-5"
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
                    <div className='pr-10 text-xl'>
                        <span className='pr-2'>{likesCount} {isLiked ? <FaThumbsUp className='inline ml-1 pb-1 text-2xl' /> : <FaRegThumbsUp className='inline ml-1 pb-1 text-2xl' />}</span>
                    </div>
                </div>

            </motion.div >
        </>
    )
} 
