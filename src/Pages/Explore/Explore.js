import { useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import Left from "../../Components/LeftSide/Left";
import Right from "../../Components/RightSide/Right";
import "./Explore.css";
import axios from "axios";

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
