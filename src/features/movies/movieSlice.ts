import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../common/models/model";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

interface MoviePayload {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MoviesState {
  movies: MoviePayload;
}

const initialState: MoviesState = {
  movies: {
    Search: [],
    totalResults: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { addMovies } = movieSlice.actions;

//this will export all the reducers
export default movieSlice.reducer;
