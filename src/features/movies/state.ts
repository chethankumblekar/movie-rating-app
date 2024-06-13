import { Movie } from "../../common/models/model";

interface MovieOrShowDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    }
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface MoviesState {
  movies: MoviePayload;
  shows: MoviePayload;
  selectedMovieOrShow: MovieOrShowDetail;
  loading: number;
}

export interface MoviePayload {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
