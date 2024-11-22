import React, { useState, useEffect } from "react";
import axios from "axios";
import xml2js from "xml2js";
import './showtime.css'

interface Showtime {
  dateTime: string;
  rating: string;
  location: string;
  name: string;
}

type Cinema = {
  id: number;
  name: string;
};

const Finnkino: React.FC = () => {
  const [selectedKino, setSelectedKino] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [movies, setMovies] = useState<string[]>([]);
  const [showtimeData, setShowtimeData] = useState<Showtime[]>([]);
  const [showShowtimeContainer, setShowtimeContainer] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false); // New state

  // Fetch cinemas and generate dates on component mount
  useEffect(() => {
    const fetchCinemas = async () => {
      const response = await axios.get("https://www.finnkino.fi/xml/TheatreAreas/");
      var parser = new xml2js.Parser();
      parser
        .parseStringPromise(response.data)
        .then(function (result) {
          result = result.TheatreAreas.TheatreArea.slice(1);
          const cinemas: Cinema[] = result.map((cinema: { ID: any[]; Name: any[] }) => {
            return {
              id: cinema.ID[0],
              name: cinema.Name[0],
            };
          });
          setCinemas(cinemas);
        })
        .catch(function (err) {
          console.error("Failed to parse XML:", err);
        });
    };

    // Generate the next 31 days
    const generateNext31Days = () => {
      const today = new Date();
      const next31Days = Array.from({ length: 31 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // Increment date by i days
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`; // Format dd.mm.yyyy
      });
      setDates(next31Days);
    };

    fetchCinemas();
    generateNext31Days();
  }, []);

  const fetchShowtimes = async () => {
    const response = await axios.get("https://www.finnkino.fi/xml/Schedule", {
      params: {
        area: selectedKino,
        dt: selectedDate,
        movie: selectedMovie,
      },
    });
    var parser = new xml2js.Parser();
    parser
      .parseStringPromise(response.data)
      .then(function (result) {
        const cleanResult = result.Schedule.Shows[0].Show;
        const showtimes: Showtime[] = cleanResult.map(
          (showtime: {
            dttmShowStart: any[];
            Rating: any[];
            Theatre: any[];
            Title: any[];
          }) => {
            return {
              dateTime: showtime.dttmShowStart[0],
              rating: showtime.Rating[0],
              location: showtime.Theatre[0],
              name: showtime.Title[0],
            };
          }
        );
        setShowtimeData(showtimes);
      })
      .catch((err) => console.error("Error parsing XML:", err));
  };

  const handleSearch = () => {
    setHasSearched(true); // User has initiated a search
    if (selectedKino && selectedDate) {
      fetchShowtimes();
      setShowtimeContainer(true);
    } else {
      setShowtimeContainer(false);
    }
  };

  return (
    <div className="everything-wrapper">
      <h1>Finnkino showtimes</h1>

      {/* Cinema Selection */}
      <select value={selectedKino} onChange={(e) => setSelectedKino(e.target.value)}>
        <option value="">Pick a cinema/area</option>
        {cinemas.map((cinema) => (
          <option key={cinema.id} value={cinema.id}>
            {cinema.name}
          </option>
        ))}
      </select>

      {/* Date Selection */}
      <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
        <option value="">Pick a date</option>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>

      {/* Uncomment this if movie selection is needed */}
      {/* <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
        <option value="">Pick a movie</option>
        {movies.map((movie, index) => (
          <option key={index} value={movie}>
            {movie}
          </option>
        ))}
      </select> */}

      {/* Search Button */}
      <button onClick={handleSearch}>Search</button>

      {/* Showtimes */}
      {hasSearched && showtimeData.length === 0 ? (
        <p>No showtimes found for the selected filters.</p>
      ) : (
        showtimeData.map((showtime, index) => (
          <div key={index} className="showtime-container">
            <div className="block">
              <p>Date/time: {showtime.dateTime}</p>
            </div>
            <div className="block">
              <p>Movie name: {showtime.name}</p>
            </div>
            <div className="block">
              <p>Location: {showtime.location}</p>
            </div>
            <div className="block">
              <p>Rating: {showtime.rating}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Finnkino;
