"use client"

import { useRouter } from 'next/navigation';
import React, { createContext, useState } from 'react'

export const Contexts = createContext();

export const StoreProvider = ({ children }) => {
    const navigate = useRouter();
    const [genres, setGenres] = useState([]);
    const [rating, setRating] = useState([]);
    const [status, setStatus] = useState("");
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(false);
    const [AnimeId, setAnimeId] = useState("7442");
    const [currentAnimeOverview, setCurrentAnimeOverview] = useState("Attack on titan")
    const [videoId, setvideoId] = useState("LHtdKWJdif4");
    const [reviews, setReviews] = useState("");
    const [searchedAnimeList, setSearchedAnimeList] = useState([]);
    const [shortDescription, setShortDescription] = useState("Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations. After witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Based on Hajime Isayama's award-winning manga, Shingeki no Kyojin follows Eren, along with his adopted sister Mikasa Ackerman and his childhood friend Armin Arlert, as they join the brutal war against the titans and race to discover a way of defeating them before the last walls are breached. (Source: MAL Rewrite)");
    const [noResult, setNoResult] = useState(false);
    const [internetError, setInternetError] = useState(false);
    const [currentRating, setCurrentRating] = useState(84.92);
    const [searchedAnimeName, setSearchedAnimeName] = useState("");
    const [isItSearchPage, setIsItSearchPage] = useState(false);

    const handleStart = () => {
        setGenres([])
        setRating([])
        setStatus("")
        setYear("")
        navigate.push("/step1");
    }

    const NavigateHome = () => {
        setGenres([])
        setRating([])
        setStatus("")
        setYear("")
        navigate.push("/");
    }

    const navigateSearchPage = () => {
        setGenres([])
        setRating([])
        setStatus("")
        setYear("")
        navigate.push("/search");
    }

    const searchAnime = async () => {
        if (searchedAnimeName == "") {
            try {
                setLoading(true);
                setInternetError(false);
                setNoResult(false);
                const searchedAnime = await fetch(`https://kitsu.io/api/edge/anime?sort=-averageRating,-popularityRank&page[limit]=20&fields[anime]=titles,description,posterImage,averageRating,episodeCount,status,youtubeVideoId,showType`);
                const paredsearchedAnime = await searchedAnime.json();
                setLoading(false);
                if (paredsearchedAnime.data.length === 0) {
                    setNoResult(true);
                    setSearchedAnimeList([])
                    return;
                }
                setSearchedAnimeList(paredsearchedAnime.data)
            }
            catch {
                setLoading(false);
                setInternetError(true)
            }
            // https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=20
        }
        else {
            try {
                setLoading(true);
                setInternetError(false);
                setNoResult(false);
                const searchedAnime = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchedAnimeName === "" ? "Attack on Titan" : searchedAnimeName}&page[limit]=20&fields[anime]=titles,description,posterImage,averageRating,episodeCount,status,youtubeVideoId,showType`);
                const paredsearchedAnime = await searchedAnime.json();
                setLoading(false);
                if (paredsearchedAnime.data.length === 0) {
                    setNoResult(true);
                    setSearchedAnimeList([])
                    return;
                }
                setSearchedAnimeList(paredsearchedAnime.data)
            }
            catch {
                setLoading(false);
                setInternetError(true)
            }
        }

    }


    //to check percentage match of search with result
    const calculateMatchPercentage = (searchInput, result) => {
        if (searchInput === "" || !isItSearchPage) {
            return "Check it out";
        }

        const searchTerms = searchInput.toLowerCase().split(" ");
        const resultTerms = result.toLowerCase().split(" ");

        // The Kitsu API uses a minimum match percentage of 50% to consider a result a match.
        const minMatchPercentage = 50;

        let matchedTerms = 0;

        for (const term of searchTerms) {
            if (resultTerms.includes(term)) {
                matchedTerms += 1;
            }
        }

        let matchPercentage = (matchedTerms / searchTerms.length) * 50;
        matchPercentage = Math.round(Math.min((minMatchPercentage + matchPercentage), 100));

        return `${matchPercentage}% Match`;
    };


    return (
        <Contexts.Provider value={{ genres, setGenres, status, setStatus, rating, setRating, year, setYear, handleStart, NavigateHome, loading, setLoading, AnimeId, setAnimeId, videoId, setvideoId, shortDescription, setShortDescription, reviews, setReviews, noResult, setNoResult, internetError, setInternetError, currentRating, setCurrentRating, searchedAnimeList, setSearchedAnimeList, searchedAnimeName, setSearchedAnimeName, searchAnime, calculateMatchPercentage, setIsItSearchPage, currentAnimeOverview, setCurrentAnimeOverview, navigateSearchPage }}>

            <div>{children}</div>

        </Contexts.Provider>
    )
}
