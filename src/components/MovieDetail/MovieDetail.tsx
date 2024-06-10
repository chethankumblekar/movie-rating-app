import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../features/store";
import {
  GetselectedMovieOrShow,
  fetchAsyncMovieOrShowDetail,
} from "../../features/movies/movieSlice";
import "./MovieDetail.scss";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector(GetselectedMovieOrShow);

  useEffect(() => {
    if (imdbID) dispatch(fetchAsyncMovieOrShowDetail(imdbID));
  }, [dispatch, imdbID]);
  return (
    <div className="movie-section">
      <div className="section-left">
        <div className="movie-title">{data.Title}</div>
        <div className="movie-rating">
          <span>
            IMDb Rating <i className="fa fa-star"></i>: {data.imdbRating}
          </span>
          <span>
            IMDb Votes <i className="fa fa-thumbs-up"></i>: {data.imdbVotes}
          </span>
          <span>
            IMDb Runtime <i className="fa fa-file"></i>: {data.Runtime}
          </span>
          <span>
            Year <i className="fa fa-cake"></i>: {data.Year}
          </span>
        </div>
        <div className="movie-plot">{data.Plot}</div>
        <div className="movie-info">
          <div>
            <span>Director</span>
            <span>{data.Director}</span>
          </div>
          <div>
            <span>Stars</span>
            <span>{data.Actors}</span>
          </div>
          <div>
            <span>Genre</span>
            <span>{data.Genre}</span>
          </div>
          <div>
            <span>Languages</span>
            <span>{data.Language}</span>
          </div>
          <div>
            <span>Awards</span>
            <span>{data.Awards}</span>
          </div>
          <div>
            <span>Director</span>
            <span>{data.Director}</span>
          </div>
        </div>
      </div>
      <div className="section-right">
        <img src={data.Poster} alt={data.Title} />
      </div>
    </div>
  );
};

export default MovieDetail;
