import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { fetchSearchResults, fetchGenres } from "./api";
import { SearchResult, Genre } from "./types";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<SearchResult>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);


  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getGenres();
  }, []);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const data = await fetchSearchResults(value, selectedGenre);
      setResults(data);
      setShowDropdown(true);
    } else {
      setResults({});
      setShowDropdown(false);
    }
  };


  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(Number(event.target.value));

  };

  return (
    <nav>
      <Link to="/" className="title">Website</Link>

      <div className="navbar-center">
        <div className="navbar-search">
          <input className="searchInput"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
          />

          {showDropdown && (
            <div className="dropdown">
              {results.results?.map((result) => (
                <div className="movieListItem" key={result.id} onClick={() => setShowDropdown(false)}>
                  {result.title}
                </div>
              ))}
            </div>
          )}

        </div>
        <li className="navbar-filter">
          <select value={`${selectedGenre}`} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </li>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li><NavLink to="/showtimes">Showtimes</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
    </nav>
  );
};
