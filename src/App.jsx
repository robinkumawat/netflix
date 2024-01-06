import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './netflix.css'
import Headers  from './Headers';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer"
import CloseIcon from '@mui/icons-material/Close';
// import Section from './Section' 



function App() {
  const [movies, setMovies] = useState([])
  const [Genreselecte, setSelecteByGenre] = useState("");
  const [genres, setGenresList] = useState([])
  const [stickySidebar, setStickySidebar] = useState(false)
  const [Moviesfilter, setMoviesFilter] = useState(null)
  const url = 'https://image.tmdb.org/t/p/original'
  const [showModal, setShowModal] = useState(false);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  
  useEffect(() => {
    async function fetchData() { 
      const result = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=ad7c17c38e7b7483cbc71e074736de57"
      );
      setMovies(result.data.results)

    }
    fetchData();

    async function getGenreList() {
      const response2 = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=ad7c17c38e7b7483cbc71e074736de57"
      );
      setGenresList(response2.data.genres);
    }
    getGenreList();

    window.addEventListener("scroll", toggleSidebarStickyness)

    return () => { window.removeEventListener("scroll", toggleSidebarStickyness)
   }

  }, []);

  function toggleSidebarStickyness() {
    window.onscroll = () => {
      (window.scrollY > 70) ? setStickySidebar(true) : setStickySidebar(false)
    }
  }

  function filterByGenre(e, id) {
    e.preventDefault();
    if (id === "ALL") setMoviesFilter(null)
    else {
  setMoviesFilter(null);
  setMoviesFilter(
    movies.filter((movies) => {
      return movies.genre_ids.includes(id);
    })
    );
    setSelecteByGenre(
      genres.find((genre) => {
        return genre.id === id;
      }).name
      );
    }
  }

  async function watchTrailer(e, title) {
    e.preventDefault();
    const trailerURL = await movieTrailer(title);
    if (trailerURL) setShowModal(trailerURL.split("?v=")[1]);
  }
  return (
    <>
    <Headers/>
    {/* <Section/> */}
    {showModal ? (
        <div className="modal">
          <div className="iframe-wrapper">
            <CloseIcon className="close-modal" onClick={() => setShowModal(false)}/>
            {<YouTube videoId={showModal} opts={opts} />}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="netflix">
        <div className="sidebar">
          
            <ul style={
              stickySidebar 
              ? { position: "stacky", top: "0", } 
              : { position: "relative" }
              }
              >
              <li>
                <a href="" onClick={(e) => filterByGenre(e, "ALL")}>
                  ALL
                </a>
              </li>
              {genres.map((genre, index) => {
                return (
                  <li key={index}>
                    <a
                      href={"/genre/" + genre.id}
                      onClick={(e) => filterByGenre(e, genre.id)}
                      >
                      {genre.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        {Moviesfilter && Moviesfilter.length > 0 ? (
          <div className="movies">
            <h3>Genre: {Genreselecte}</h3>
            <div className="movie-wrapper">
              {Moviesfilter.map((movie, index) => {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={url + movie.poster_path}
                      alt={movie.title || movie.original_title}
                      />
                    <h3>{movie.title || movie.original_title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : Moviesfilter !== null && Moviesfilter.length === 0 ? (
          <div className="movies">
            <h3>No Movie for this genre</h3>
          </div>
        ) : movies.length > 0 ? (
          <div className="movies">
            <div className="movie-wrapper">
              {movies.map((movie, index) => {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={url + movie.poster_path}
                      alt={movie.title || movie.original_title}
                      />
                     <a className="trailer-link" href="" onClick={(e) => watchTrailer(e, movie.title)}>
                      Watch Trailer
                    </a>
                    <h3>{movie.title || movie.original_title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
          )}
      </div>
    </>
  );
}

export default App
