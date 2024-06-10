import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../common/models/model";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";
import { RootState } from "../store";

interface MoviePayload {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

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
}

const initialState: MoviesState = {
  movies: {
    Search: [],
    totalResults: "",
    Response: "",
  },
  shows: {
    Search: [],
    totalResults: "",
    Response: "",
  },
  selectedMovieOrShow: {
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    Ratings: [
      {
        Source: "",
        Value: "",
      },
    ],
    Metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    Type: "",
    DVD: "",
    BoxOffice: "",
    Production: "",
    Website: "",
    Response: "",
  },
};

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "harry";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const movieText = "friends";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${movieText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id: string) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state: MoviesState, action: PayloadAction<MoviePayload>) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, (_state) => {
      console.log("pending");
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, action) => {
      console.log("fulfilled");
      return { ...state, movies: action.payload };
    });
    builder.addCase(fetchAsyncMovies.rejected, (_state) => {
      console.log("rejected");
    });
    builder.addCase(fetchAsyncShows.fulfilled, (state, action) => {
      console.log("fulfilled");
      return { ...state, shows: action.payload };
    });
    builder.addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
      console.log("fulfilled");
      return { ...state, selectedMovieOrShow: action.payload };
    });
  },
});

// Action creators are generated for each case reducer function
export const { addMovies } = movieSlice.actions;

export const GetAllMovies = (state: RootState) => state.movies.movies;
export const GetAllShows = (state: RootState) => state.movies.shows;
export const GetselectedMovieOrShow = (state: RootState) =>
  state.movies.selectedMovieOrShow;

//this will export all the reducers
export default movieSlice.reducer;
