import { useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import Left from "../../Components/LeftSide/Left";
import Right from "../../Components/RightSide/Right";
import "./Explore.css";
import axios from "axios";

/**
 * Explore component.
 *
 * This component is responsible for handling user search queries and displaying the results.
 * It maintains three pieces of state: `search` (the current search query), `showMenu` (a boolean indicating whether to show a menu), and `results` (the search results).
 *
 * The `handleSearch` function is used to send the search query to an API and update the `results` state with the response.
 *
 * The component returns a JSX element that includes a `Nav` component, a search input field, a search button, and a container for displaying the search results. Each result is displayed with a user avatar, nickname, and status.
 *
 * @returns {JSX.Element} The rendered Explore component.
 *
 * @example
 * <Explore />
 *
 * @property {string} search - The current search query.
 * @property {Function} setSearch - Function to set the search query.
 * @property {boolean} showMenu - Boolean indicating whether to show a menu.
 * @property {Function} setShowMenu - Function to set the `showMenu` state.
 * @property {Array} results - The search results.
 * @property {Function} setResults - Function to set the search results.
 * @property {Function} handleSearch - Function to handle the search query.
 */
const Explore = () => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "https://uni-net.fun/api/v1/consumer/search",
        {
          query: search,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setResults(response.data); // assuming the response data is the search results
      } else {
        console.error("Search request failed");
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };
  return (
    <div className="interface">
      <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      <div className="inner-container">
        <div className="left-container">
          <Left />
        </div>

        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users and posts"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>

          <div className="results-container">
            {results.map((result, index) => (
              <div key={index} className="user-card">
                {result.media && (
                  <img
                    src={result.media.path}
                    alt="profile"
                    className="user-avatar"
                  />
                )}
                <div className="user-info">
                  <p className="user-nickname">{result.nickname}</p>
                  <p className="user-status">{result.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-container">
          <Right />
        </div>
      </div>
    </div>
  );
};

export default Explore;
