import { useState } from "react";
import "./App.css";
import useFetchData from "./custom-hooks/useFetchData";

function App() {
  // const [loading, setLoading] = useState(false);
  const [data, error, getData] = useFetchData();
  const [query, setQuery] = useState("");

  //Handler for search button
  const handleSearch = () => {
    if (query.trim()) {
      getData(query);
      setQuery(""); // this clears the input field 
    }
  };

  return (
    <>
      <div className="card">
        <label htmlFor="video">Search Video</label>
        <input
          className="border border-white text-white p-1 ml-2"
          type="text"
          value={query}
          name="query"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {/* map over the array of videos that are returned */}
        <div>
          {data && data.contents && data.contents.length > 0 ? (
            <ul>
              {data.contents.map((item, idx) =>
                item.video ? (
                  <li key={item.video.videoId}>
                    <div className="flex flex-col justify-center items-center m-4">
                      <iframe
                        width="320"
                        height="180"
                        src={`https://www.youtube.com/embed/${item.video.videoId}`}
                        title={item.video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div>{item.video.title}</div>
                  </li>
                ) : null
              )}
            </ul>
          ) : (
            <div>No results</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
