// import React, { useState, useEffect } from "react";
// //import "./SearchMenu.css";
// import { fetchSearchResults, fetchGenres } from "../api"; // Adjust the path as necessary

// const SearchMenu = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState({});
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState(null);

//   useEffect(() => {
//     const getGenres = async () => {
//       try {
//         const genreData = await fetchGenres();
//         setGenres(genreData);
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };
//     getGenres();
//   }, []);

//   const handleSearchChange = async (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);

//     if (value) {
//       const data = await fetchSearchResults(value, selectedGenre);
//       setResults(data);
//       setShowDropdown(true);
//     } else {
//       setResults({});
//       setShowDropdown(false);
//     }
//   };

//   const handleGenreChange = (event) => {
//     setSelectedGenre(Number(event.target.value));
//   };

//   return (
//     <div className="search-menu">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search movies..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           onFocus={() => setShowDropdown(true)}
//           className="search-input"
//         />
//         {showDropdown && (
//           <div className="dropdown">
//             {results.results?.map((result) => (
//               <div
//                 className="dropdown-item"
//                 key={result.id}
//                 onClick={() => setShowDropdown(false)}
//               >
//                 {result.title}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="genre-filter">
//         <select value={selectedGenre} onChange={handleGenreChange}>
//           <option value="">All Genres</option>
//           {genres.map((genre) => (
//             <option key={genre.id} value={genre.id}>
//               {genre.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default SearchMenu;
