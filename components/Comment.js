import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Contexts } from '@/context/Store';

const AddReview = () => {

    const { reviews, setReviews, setNoResult } = useContext(Contexts);
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [starRating, setStarRating] = useState(0);

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleRatingChange = (e) => {
        if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 6) {
            setStarRating(parseInt(e.target.value));
        }
        else if (e.target.value === "") {
            setStarRating("")
        }
        else {
            alert("Please enter starRating between 1 to 5.")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const NewReview = [
            {
                attributes: {
                    likesCount: 0,
                    createdAt: new Date(),
                    contentFormatted: description,
                    source: userName,
                    rating: starRating * 4
                }
            }
        ]
        console.log(NewReview);
        const NewReviews = [...reviews, ...NewReview]
        console.log(NewReview);
        setReviews(NewReviews);

        // Perform the necessary actions to submit the review, e.g., send data to the server
        // Reset the form fields

        setNoResult(false);
        setUserName('');
        setDescription('');
        setStarRating(0);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starClass =
                i <= starRating
                    ? 'text-yellow-500'
                    : 'text-gray-400';
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 inline-block ${starClass}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2l3.09 6.574L22 9.5l-5 4.875 1.182 6.88L12 17.31l-6.182 3.945L7 14.375 2 9.5l6.91-1.926L12 2z"
                    />
                </svg>
            );
        }
        return stars;
    };

    return (
        <motion.div className="bg-black p-8 rounded-xl"
            initial={{
                opacity: 0,
                y: "20vh"
            }}
            whileInView={{
                opacity: 1,
                y: 0,
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
            <h2 className="md:text-[3rem] text-[2rem] text-white mb-4 text-center font-bold ">Add Your Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="userName" className="text-white block mb-2">
                        Your Name:
                    </label>
                    <input
                        type="text"
                        id="userName"
                        className="bg-[#0000003b] border-2 border-gray-600 rounded-md px-4 py-2 w-full text-white"
                        value={userName}
                        onChange={handleUserNameChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="text-white block mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        className="bg-[#0000003b] border-2 border-gray-600 rounded-md px-4 py-2 w-full text-white h-[200px]"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="starRating" className="text-white block mb-2">
                        Rating:
                    </label>
                    <div className="flex items-center">
                        <div className="mr-2">{renderStars()}</div>
                        <input
                            value={(starRating)}
                            type="number"
                            id="starRating"
                            min="0"
                            max="5"
                            step="0.5"
                            className="bg-[#0000003b] border border-white rounded-md px-4 py-2 w-20 text-white"
                            onChange={handleRatingChange}
                            required
                        />
                    </div>
                </div>

                <div className="button">
                    <motion.button className='border-black mt-7 mx-5 border-2 px-6 py-2 mr-10 rounded-[30px] font-bold bg-white text-black mb-10 m-auto'
                        type="submit"
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

                    >Submit Review !</motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddReview;
