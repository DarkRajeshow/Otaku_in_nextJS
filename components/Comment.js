import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Contexts } from '@/context/Store';
import { FaPlusCircle } from 'react-icons/fa';

const AddReview = () => {

    const { reviewsData, setReviewsData, setNoResult } = useContext(Contexts);
    const [userName, setUserName] = useState({
        firstName: "",
        lastName: ""
    });
    const [description, setDescription] = useState('');
    const [starRating, setStarRating] = useState("");

    const handleUserFirstNameChange = (e) => {
        setUserName({
            ...userName,
            firstName: e.target.value,
        });
    };

    const handleUserlastNameChange = (e) => {
        setUserName({
            ...userName,
            lastName: e.target.value,
        });
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
                id: Math.random() * 1000,
                name: userName,
                description: description,
                rating: starRating * 4,
                uploadDate: new Date(),
                likeCount: 0,
            }
        ]
        const NewReviews = [...NewReview, ...reviewsData]
        setReviewsData(NewReviews);

        alert("Your review added successfully!");

        // Perform the necessary actions to submit the review, e.g., send data to the server
        // Reset the form fields

        setNoResult(false);
        setUserName({
            firstName: "",
            lastName: ""
        });
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
        <motion.div className="rounded-md bg-light/5 backdrop-blur-md my-1 p-8"
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
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
            <h2 className="text-lg md:text-[2rem] lg:text-[3rem] text-white mb-4 text-center font-bold ">Add Your Review</h2>
            <form onSubmit={handleSubmit} className='text-sm md:text-base'>
                <div className="mb-4">
                    <label htmlFor="userName" className="text-white block mb-2 font-bold">
                        First Name:
                    </label>
                    <input
                        type="text"
                        id="userName"
                        className="bg-[#0000003b] border-2 border-[#322b2b] rounded-sm px-4 py-2 w-full text-white"
                        value={userName.firstName}
                        onChange={handleUserFirstNameChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="userName" className="text-white block mb-2 font-bold">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        id="userName"
                        className="bg-[#0000003b] border-2 border-[#322b2b] rounded-sm px-4 py-2 w-full text-white"
                        value={userName.lastName}
                        onChange={handleUserlastNameChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="text-white block mb-2 font-bold">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        className="bg-[#0000003b] border-2 border-[#322b2b] rounded-sm px-4 py-2 w-full text-white h-[200px]"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="starRating" className="text-white block mb-2 font-bold">
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
                            className="bg-[#0000003b] border border-[#322b2b] rounded-sm px-4 py-2 w-20 text-white"
                            onChange={handleRatingChange}
                            required
                        />
                    </div>
                </div>

                <div className="button">
                    <motion.button className='border-light mt-7 mx-5 border-2 px-6 py-2 mr-10 rounded-[30px] font-bold text-green border-dashed mb-10 m-auto flex items-center'
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

                    ><FaPlusCircle className='mr-2' /> Submit!</motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddReview;
