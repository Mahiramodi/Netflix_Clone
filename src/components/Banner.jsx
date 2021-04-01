import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../urls";
import "./navbar.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = () => {
  const [movie, setmovie] = useState([]);
  const [trailerURL, setTrailerUrl] = useState("");
  const [image, setimg] = useState("");
  const baseURL = "http://image.tmdb.org/t/p/original";
  const value = Math.floor(Math.random() * 10);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    const loader = async () => {
      const request = await axios.get(url.Trending);
      setmovie(request.data.results[value]);

      setimg(request.data.results[value].backdrop_path);
    };
    loader();
  }, []);

  const playmovie = (movie) => {
    // if (trailerURL) {
    //   setTrailerUrl("");
    // } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const UrlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(UrlParams.get("v"));
        })
        .catch((err) => console.log("error"));
    
  };
  const pausemovie= ()=>{
    if(trailerURL)
    {
      setTrailerUrl("");
    }
  }

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: ` linear-gradient(to right, #000000, #43434321),url(${baseURL}${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="info">
          <h1>{movie.title || movie.original_title || movie.name}</h1>
          <p>{movie.overview}</p>
          <div className="btn">
            <button onClick={() => playmovie(movie)}>Play</button>
            <button onClick={() => pausemovie()}>Pause</button>
          </div>
        </div>
      </div>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
    </>
  );
};
export default Banner;
