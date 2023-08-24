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
    const [searchedAnimeList, setSearchedAnimeList] = useState([]);
    const [noResult, setNoResult] = useState(false);
    const [internetError, setInternetError] = useState(false);
    const [searchedAnimeName, setSearchedAnimeName] = useState("");
    const [selectedGenres, setSelectedGenres] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedAgeRating, setSelectedAgeRating] = useState('');
    const [selectedEpisodeCount, setSelectedEpisodeCount] = useState(0);
    const [selectedType, setSelectedType] = useState('');
    const [selectedSortType, setSelectedSortType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [animeOverviewData, setAnimeOverviewData] = useState({});
    const [reviewsData, setReviewsData] = useState([])



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
        navigate.push("/search");
        setGenres([])
        setRating([])
        setStatus("")
        setYear("")
    }

    const searchAnime = async () => {
        try {
            setLoading(true);
            setInternetError(false);
            setNoResult(false);

            const apiUrl = "https://kitsu.io/api/edge/anime";
            const params = new URLSearchParams();

            if (searchedAnimeName === "") {
                let sortQuery = selectedSortType === "" ? "popularityRank" : selectedSortType;
                params.set("sort", sortQuery);
            }

            if (searchedAnimeName !== "") {
                params.set("filter[text]", searchedAnimeName);
            }

            if (selectedType !== "") {
                params.set("filter[subtype]", selectedType);
            }

            if (selectedAgeRating !== "") {
                params.set("filter[ageRating]", selectedAgeRating);
            }

            if (selectedGenres.length !== 0 && searchedAnimeName === "") {
                params.set("filter[genres]", selectedGenres.join(","));
            }

            if (selectedCategory !== "") {
                params.set("filter[categories]", selectedCategory);
            }

            if (selectedYear !== "") {
                params.set("filter[seasonYear]", selectedYear);
            }


            params.set("page[limit]", 20);
            params.set("fields[anime]", "titles,description,posterImage,averageRating,episodeCount,status,youtubeVideoId,subtype,startDate,episodeLength");

            const fullUrl = `${apiUrl}?${params.toString()}`;

            console.log(fullUrl);

            const searchedAnime = await fetch(fullUrl);

            const parsedsearchedAnime = await searchedAnime.json();

            const filteredData = parsedsearchedAnime.data.filter((anime) => {
                return anime.attributes.episodeCount >= selectedEpisodeCount
            })

            if (filteredData.length === 0) {
                setNoResult(true);
                setLoading(false);
                setSearchedAnimeList([])
                return;
            }

            setLoading(false);

            setSearchedAnimeList(filteredData)
        }
        catch {
            setLoading(false);
            setInternetError(true)
        }

    }


    async function fetchOverviewData(animeId) {

        setLoading(true);
        setInternetError(false);

        const apiUrl = `https://kitsu.io/api/edge/anime/${animeId}`;
        let response;
        try {
            response = await fetch(apiUrl);
        }
        catch {
            setInternetError(true);
            return;
        }
        const animeData = await response.json();
        const firstNames = [
            "James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Isabella", "Ethan", "Sophia",
        ];
        const lastNames = [
            "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
        ];

        function getRandomFullName() {
            const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            return {
                firstName: randomFirstName,
                lastName: randomLastName
            };
        }

        // Extract relevant data from the animeData response
        const {
            id,
            type,
            attributes: {
                titles,
                description,
                userCount,
                posterImage,
                averageRating,
                episodeCount,
                episodeLength,
                popularityRank,
                status,
                startDate,
                endDate,
                ageRating,
                youtubeVideoId,
                subtype,
                ageRatingGuide,
                abbreviatedTitles,
                favoritesCount
            },
            relationships: {
                categories: { links: genresLink },
                reviews: { links: reviewsLink },
            },
        } = animeData.data;

        const title = titles.en ? titles.en : titles.en_us ? titles.en_us : titles.en_jp ? titles.en_jp : titles.ja_jp ? titles.ja_jp : "Not Registered Yet"

        const animeImage = posterImage.original

        // Fetch genres data
        try {
            const genresResponse = await fetch(genresLink.related);
            const genresData = await genresResponse.json();
            const genresArray = genresData.data.map(genre => genre.attributes.slug);

            // Fetch reviews data
            const reviewsResponse = await fetch(reviewsLink.related);
            const reviewsData = await reviewsResponse.json();
            const formattedReviews = reviewsData.data.map(review => ({
                id: review.id,
                name: getRandomFullName(),
                description: review.attributes.contentFormatted,
                rating: review.attributes.rating,
                uploadDate: review.attributes.createdAt,
                likeCount: review.attributes.likesCount,
            }));

            const animeDetails = {
                id,
                type,
                title,
                userCount,
                episodeLength,
                description,
                animeImage,
                averageRating,
                episodeCount,
                status,
                popularityRank,
                startDate,
                endDate,
                ageRating,
                youtubeVideoId,
                subtype,
                favoritesCount,
                guidance: ageRatingGuide,
                shortForms: abbreviatedTitles,
                genres: genresArray,
            };
            setReviewsData(formattedReviews);
            setAnimeOverviewData(animeDetails);
            setLoading(false);
        }
        // Create the formatted object
        catch {
            setInternetError(true)
            setAnimeOverviewData({});
            setLoading(false)
            setAnimeOverviewData({});
            return;
        }
    }


    //to check percentage match of search with result
    const calculateMatchPercentage = (searchInput, result) => {

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

        return `${matchPercentage}`;
    };


    return (
        <Contexts.Provider value={{ genres, setGenres, status, setStatus, rating, setRating, year, setYear, handleStart, NavigateHome, loading, setLoading, noResult, setNoResult, internetError, setInternetError, searchedAnimeList, setSearchedAnimeList, searchedAnimeName, setSearchedAnimeName, searchAnime, calculateMatchPercentage, navigateSearchPage, selectedGenres, setSelectedGenres, selectedYear, setSelectedYear, selectedAgeRating, setSelectedAgeRating, selectedEpisodeCount, setSelectedEpisodeCount, selectedType, setSelectedType, selectedSortType, setSelectedSortType, AnimeId, setAnimeId, fetchOverviewData, animeOverviewData, setAnimeOverviewData, reviewsData, setReviewsData, selectedCategory, setSelectedCategory }}>

            <div>{children}</div>

        </Contexts.Provider>
    )
}

