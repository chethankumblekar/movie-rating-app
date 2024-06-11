import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import {
  GetAllMovies,
  GetAllShows,
  GetloadingState,
} from "../../features/movies/movieSlice";
import Slider from "react-slick";
import { settings } from "../../common/settings";

const MovieListing = () => {
  const movies = useSelector(GetAllMovies);
  const shows = useSelector(GetAllShows);
  const loading = useSelector(GetloadingState);

  const renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error"></div>
    );
  const rendershows =
    shows.Response === "True" ? (
      shows.Search.map((show, index) => <MovieCard key={index} data={show} />)
    ) : (
      <div className="movies-error"></div>
    );
  return (
    <div className="movie-wrapper">
      {loading ? (
        <div>...loading</div>
      ) : (
        <>
          <div className="movie-list">
            <h2>Movies</h2>
            <div className="movie-container">
              <Slider {...settings}> {renderMovies}</Slider>
            </div>
          </div>
          <div className="show-list">
            <h2>Shows</h2>
            <div className="movie-container">
              <Slider {...settings}>{rendershows}</Slider>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieListing;
