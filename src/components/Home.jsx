import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Home(props) {
  const [movies, setmovies] = useState([]);
  const [trailerURL, settrailerURl] = useState("");
  const baseURL = "http://image.tmdb.org/t/p/original";
  const url = props.fetchURL;
  console.log(url);
  useEffect(async () => {
    await axios
      .get(url)
      .then((data) => {
        console.log(data.data.results);
        setmovies(data.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  // movies.map((val) => {
  //   console.log(val.title);
  // });

  // console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const movieplay = (val) => {
    console.log("in play");
    if (trailerURL) {
      settrailerURl("");
    } else {
      console.log(trailerURL);
      movieTrailer(val?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerURl(urlParams.get("v"));
        })
        .catch((err) => console.log("unable to load"));
    }
  };
  return (
    <>
      <div className="home">
        <h2>{props.title}</h2>
        <div className="row">
          {movies.map((val, key) => {
            return (
              <>
                <img
                  onClick={() => movieplay(val)}
                  key={val.id}
                  src={`${baseURL}${val.poster_path}`}
                  alt="Not available"
                />
              </>
            );
          })}
        </div>
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </>
  );
}

export default Home;
