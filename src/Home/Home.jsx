import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const apiKey = "70d9a66bdf510fa7bd389073aefae65e";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "movie/upcoming";
const nowPlaying = "movie/now_playing";
const popualr = "movie/popular";
const topRated = "movie/top_rated";

const Card = ({ img }) => {
  return <img className="card" src={img} alt="Cover" />;
};

const Row = ({ title, arr = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item, index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popualrMovies, setPopualrMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };

    const fetchPopualr = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${popualr}?api_key=${apiKey}`);
      setPopualrMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
      console.log(genres);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopualr();
    fetchTopRated();
    getAllGenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popualrMovies[0]
            ? `url(${`${imgUrl}/${popualrMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popualrMovies[0] && <h1>{popualrMovies[0].original_title}</h1>}

        {popualrMovies[0] && <p>{popualrMovies[0].overview}</p>}

       <div>
       <button><BiPlay />Play</button>
        <button>My List <AiOutlinePlus /></button>
       </div>
       
      </div>
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popualrMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />

      <div className="genreBox">
        {genre.map((item, index) => (
          <Link key={index} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
