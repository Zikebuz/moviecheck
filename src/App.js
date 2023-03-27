import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const REACT_APP_API_URL = 'https://www.omdbapi.com?apikey=529dc4a3'

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${REACT_APP_API_URL}&s=${title}`);
        const data = await response.json()

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('');
    }, []);

    return (
        <div className="app">
            <h1>Movie Hunt</h1>

            <div className="search">
                <input
                    placeholder="Search for movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) :
                    (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }


        </div>
    );
}

export default App; 