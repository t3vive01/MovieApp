import React, { useEffect, useState, useRef } from "react";
import { Typography, Row, Button } from "antd";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../Config";
import MainImage from "./MainImage";
import LatestMovies from "./LatestMovies";
import NowPlayingMovies from "./NowPlayingMovies";
import MoviePopular from "./MoviePopular";

const { Title } = Typography;

function HomePage() {
  const [stateOne, setstateOne] = useState(false);
  const [stateTwo, setstateTwo] = useState(true);
  const [stateThree, setstateThree] = useState(true);

  const [view, setview] = useState("popular");
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);
  const endpoint = `${API_URL}movie/${view}?api_key=${API_KEY}&language=en-US&page=1`;


  useEffect(() => {
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setMainMovieImage(result.results[0]);
        setCurrentPage(result.page);
      });
  };

 
  const viewLatest = () => {
    setstateOne(false);
    setstateTwo(true);
    setstateThree(true);
  };

  const viewPlaying = () => {
    setstateOne(true);
    setstateTwo(false);
    setstateThree(true);
  };

  const viewPopular = () => {
    setstateOne(true);
    setstateTwo(true);
    setstateThree(false);
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/${view}?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Button style={{ margin: 5 }} onClick={viewLatest}>
          Top Rated
        </Button>
        <Button style={{ margin: 5 }} onClick={viewPlaying}>
          Now Playing
        </Button>
        <Button style={{ margin: 5 }} onClick={viewPopular}>
          Popular Movies
        </Button>
        {!stateOne && (
          <div>
            <LatestMovies />
          </div>
        )}
        {!stateTwo && (
          <div>
            <NowPlayingMovies />
          </div>
        )}
        {!stateThree && (
          <div>
            <MoviePopular />
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={loadMoreItems}>Load More</Button>
      </div>
    </div>
  );
}

export default HomePage;
