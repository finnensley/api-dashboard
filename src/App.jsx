import { useState, useRef, useEffect } from "react";
import "./App.css";
import useFetchData from "./custom-hooks/useFetchData";

function App() {
  const [data, error, getData] = useFetchData();
  const [query, setQuery] = useState(() => {
    const storedQuery = localStorage.getItem("query");
    return storedQuery ? JSON.parse(storedQuery) : [];
  });

  const buttonRef = useRef(null); // use to press enter
  const [loading, setLoading] = useState(false);

  //Handler for search button
  const handleSearch = () => {
    if (query.trim()) {
      setLoading(true); //Starts loading
      getData(query);
      buttonRef.current?.focus();
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
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    localStorage.setItem("query", JSON.stringify(query));
    if (data && data.contents) {
      localStorage.setItem("videos", JSON.stringify(data));
    }
  }, [query, data]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="shadow-lg shadow-white bg-[url('src/assets/pexels-karolina-grabowska-6634140.jpg')] bg-cover bg-center w-full flex grow flex-col items-center border rounded-lg">
          <h1 className="w-full bg-black pt-4 border border-transparent rounded-lg text-white text-3xl tex-center">
            Youtube Videos
          </h1>
          <h2 className="w-full shadow-lg pb-4 shadow-white bg-black  rounded text-white text-3xl tex-center mb-6">
            (see only your search results)
          </h2>
          <div className="flex flex-col items-center w-full mb-6 mt-2">
            <label htmlFor="query" className="mb-4 text-2xl">
              Search Videos
            </label>
            <input
              className="w-3xl ml-2 mr-2 shadow-sm shadow-white border border-white rounded-lg text-white text-2xl p-1 bg-transparent"
              type="text"
              value={query}
              name="query"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="m-4 text-xl">
              <button
                ref={buttonRef}
                onClick={handleSearch}
                className="border border-white text-white p-1.5"
              >
                Submit Search Request
              </button>
            </div>
          </div>
          {/* map over the array of videos that are returned */}
          <div className="w-full text-2xl p-3 mb-2 min-h-[400px] min-w-[800px] flex items-center justify-center">
            {loading ? (
              <div>...loading</div>
            ) : data && data.contents && data.contents.length > 0 ? (
              <ul className="flex flex-row flex-wrap justify-evenly w-full">
                {data.contents.map((item) =>
                  item.video ? (
                    <li key={item.video.videoId} className="m-4">
                      <div className="flex flex-col items-center">
                        <div id="video" className="border border-2 rounded-xl">
                          <iframe
                            width="480"
                            height="270"
                            src={`https://www.youtube.com/embed/${item.video.videoId}`}
                            title={item.video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="mt-2 max-w-xs">{item.video.title}</div>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
            ) : (
              <div className="p-3 mb-2">No results</div>
            )}
          </div>
          <p className="w-full bg-black p-4 border border-transparent rounded-lg text-white text-sm text-left">
            &copy; 2025 soloSoftwareDev
          </p>
        </div>
      </div>
    </>
  );
}
export default App;
