import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";
import { RootState } from "../store";
import { MoviesState } from "./state";

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
  loading: 0,
};

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (text: string) => {
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${text}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (text: string) => {
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${text}&type=series`
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
    removeSelectedMovieOrShow(state: MoviesState) {
      state.selectedMovieOrShow = initialState.selectedMovieOrShow;
    },
    updateMovieOrShowLoadingState(
      state: MoviesState,
      action: PayloadAction<number>
    ) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, (state) => {
      state.loading = state.loading + 1;
      console.log("pending");
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, action) => {
      console.log("fulfilled");
      return { ...state, movies: action.payload, loading: state.loading - 1 };
    });
    builder.addCase(fetchAsyncMovies.rejected, (_state) => {
      console.log("rejected");
    });
    builder.addCase(fetchAsyncShows.pending, (state) => {
      state.loading = state.loading + 1;
      console.log("pending");
    });
    builder.addCase(fetchAsyncShows.fulfilled, (state, action) => {
      console.log("fulfilled");
      return { ...state, shows: action.payload, loading: state.loading - 1 };
    });
    builder.addCase(fetchAsyncShows.rejected, (_state) => {
      console.log("rejected");
    });
    builder.addCase(fetchAsyncMovieOrShowDetail.pending, (state) => {
      state.loading = state.loading + 1;
      console.log("pending");
    });
    builder.addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
      console.log("fulfilled");
      return {
        ...state,
        selectedMovieOrShow: action.payload,
        loading: state.loading - 1,
      };
    });
    builder.addCase(fetchAsyncMovieOrShowDetail.rejected, (_state) => {
      console.log("rejected");
    });
  },
});

// Action creators are generated for each case reducer function
export const { removeSelectedMovieOrShow, updateMovieOrShowLoadingState } =
  movieSlice.actions;

export const GetAllMovies = (state: RootState) => state.movies.movies;
export const GetAllShows = (state: RootState) => state.movies.shows;
export const GetselectedMovieOrShow = (state: RootState) =>
  state.movies.selectedMovieOrShow;
export const GetloadingState = (state: RootState) => state.movies.loading;

//this will export all the reducers
export default movieSlice.reducer;
