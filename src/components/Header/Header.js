import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.scss";

export const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log("handle submit");
    e.preventDefault();
    if (term.length >= 3) {
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncShows(term));
      setTerm("");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter at least 3 characters to search movies & shows ..."
            type="search"
            name="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};
