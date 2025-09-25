import { useState, useRef, useEffect } from "react";
import "./App.css";
import useFetchData from "./custom-hooks/useFetchData";

function App() {
  
  const [data, error, getData] = useFetchData();
  const [query, setQuery] = useState("");
  const buttonRef = useRef(null); // use to press enter 
  const [loading, setLoading] = useState(false);

  //Handler for search button
  const handleSearch = () => {
    if (query.trim()) {
      setLoading(true); //Starts loading
      getData(query);
      buttonRef.current?.focus()
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      buttonRef.current?.focus();
    }
  };

 
    useEffect(() => {
      if (loading) {
        const timer = setTimeout(() => 
        setLoading(false), 2000);
        return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <div className="card">
        <label htmlFor="query">Search Video</label>
        <input
          className="border border-white text-white p-1 ml-2"
          type="text"
          value={query}
          name="query"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button ref={buttonRef} onClick={handleSearch}>Search</button>
        {/* map over the array of videos that are returned */}
        <div>
          {loading ? (
            <div>...loading</div>
          ) : data && data.contents && data.contents.length > 0 ? (
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
