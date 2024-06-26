import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

const Header = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    if (text === "") {
      window.alert("please enter term and then search!");
    } else {
      event.preventDefault();
      dispatch(fetchAsyncMovies(text));
      dispatch(fetchAsyncShows(text));
      setText("");
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={text}
            placeholder="Search Movies or Shows"
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
