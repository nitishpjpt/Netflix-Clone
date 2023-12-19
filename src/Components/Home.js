import React from "react";
import "../Components/Header.css";
import { Link } from "react-router-dom";
import Img from "../logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const Url = "https://api.themoviedb.org/3/";
const Api_key = "0bfa223dcc6cb9c9533d3524a42b2bd1";
const ImgUrl = "https://image.tmdb.org/t/p/original";
const nowPlaying = "now_playing";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="img" />;

const Row = ({ title, arr = [] }) => (
  <>
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item, index) => (
          <Card key={index} img={`${ImgUrl}/${item.poster_path}`} />
        ))}
      </div>
    </div>
  </>
);

function Home() {
  const [Popularmovies, setPopularmovies] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const[selectedMovies,setselectedMovies] = useState("");
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);


  const fetchNowPlaying = async () => {
    const { data: { results }, } = await axios.get(`${Url}/movie/${nowPlaying}?api_key=${Api_key}&page=2`);
    setNowPlayingMovies(results);
  };

  const fetchtopRatedMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${Url}/movie/${topRated}?api_key=${Api_key}&page=4`);
    setTopRatedMovies(results);
  };

  const fetchPopularmovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";

    const {
      data: { results },
    } = await axios.get(`${Url}/${type}/movie`, {
      params: {
        api_key: Api_key,
        query: searchKey,
      },
    });
    setselectedMovies(results[0]);
    setPopularmovies(results);
    console.log(results);
  };

  const getAllGenre = async () => {
    const {
      data: { genres },
    } = await axios.get(`${Url}/genre/movie/list?api_key=${Api_key}`);
    setGenre(genres);
  };

  useEffect(() => {
    fetchNowPlaying();
    fetchtopRatedMovies();
    fetchPopularmovies();
    getAllGenre();
  }, []);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchPopularmovies(searchKey);
  };
  return (
    <>
      <div className="heading">
        <img src={Img} alt="Home" />

        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/">Bollywood</Link>
          <Link to="/">Hollywood</Link>
          <Link to="/">Popular</Link>
        </div>
        <form onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setsearchKey(e.target.value)}
          />
        </form>
        <button className="btn">Login</button>
      </div>

      <div className="home">
        <div className="banner" style={{
          backgroundImage :  `url(${ImgUrl}${selectedMovies.backdrop_path})` , backgroundSize : "cover"
        }}>
        <div className="banner-title">
          <h3>{selectedMovies.title}</h3>
          <p>{selectedMovies.overview}</p>
       <div className="banner-btn">
       </div>
          <button>Play</button>
          <button>Watch</button>
       </div>
        </div>
        <Row title={"Popular"} arr={Popularmovies}/>
        <Row title={"Top Rated"} arr={topRatedMovies}/>
        <Row title={"Now Playing"} arr={nowPlayingMovies}/>

        <div className="genreBox">
          {genre.map((item) => (
            <Link key={item.id} to={`/genre/${item.id}`}>
              {item.name}
            </Link>
          ))}
        </div>
        <Footer/>
      </div>

    </>
  );
}

export default Home;
