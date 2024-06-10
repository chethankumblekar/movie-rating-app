import MovieListing from "../MovieListing/MovieListing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { AppDispatch } from "../../features/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movieText = "harry";
  const showText = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);
  return (
    <div>
      <div className="banner-image">
        <MovieListing />
      </div>
    </div>
  );
};

export default Home;
