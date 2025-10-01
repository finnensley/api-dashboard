import { useState, useRef, useEffect } from "react";
import "./App.css";
import useFetchData from "./custom-hooks/useFetchData";
import ToggleTheme from "./components/toggle";

function App() {
  const [data, error, getData] = useFetchData();
  const [query, setQuery] = useState(() => {
    const storedQuery = localStorage.getItem("query");
    return storedQuery ? JSON.parse(storedQuery) : [];
  });

  const buttonRef = useRef(null); // use to press enter
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : "dark";
  });

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
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [query, data, theme]);

  return (
    <>
      <div
        className={`shadow-lg shadow-white bg-[url('/pexels-karolina-grabowska-6634140.jpg')] flex flex-col bg-cover bg-center rounded-xl border"
           ${
             theme === "light"
               ? "bg-none bg-white text-black"
               : "bg-black text-white"
           }`}
      >
        <div
          className={`bg-black w-full items-center rounded-xl p-0 border
               ${
                 theme === "light"
                   ? "bg-none bg-white text-black shadow-md shadow-black"
                   : "bg-black text-white shadow-lg shadow-white"
               }`}
        >
          <h1
            className={`w-full p-6 sm:p-4 pb-2 text-xs sm:text-sm md:text-base text-center rounded-xl
            ${
              theme === "light" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Youtube Videos
          </h1>
          <h2
            className={`w-full pb-6 text-sm sm:text-base md:text-lg text-center flex items-center justify-center rounded-xl
            ${
              theme === "light" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <span className="text-center">(see only your search results)</span>

            <span className="ml-2">
              <ToggleTheme theme={theme} setTheme={setTheme} />
            </span>
          </h2>
        </div>
        <div className="flex flex-col mt-7 p-2 text-sm sm:text-base md:text-lg items-center w-full mb-6">
          <label htmlFor="query" className="mb-4 text-2xl">
            Search Videos
          </label>
          <input
            className={`w-auto ml-2 mr-2 shadow-sm shadow-white rounded-lg text-sm sm:text-base md:text-lg p-1 bg-transparent
                ${
                  theme === "light"
                    ? "border border-black text-black bg-transparent"
                    : "border border-white text-white bg-transparent"
                }`}
            type="text"
            value={query}
            name="query"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="mt-6 text-sm sm:text-base md:text-lg">
            <button
              ref={buttonRef}
              onClick={handleSearch}
              className={`w-auto sm:w-auto rounded-lg px-4 py-2 transition 
               ${
                theme === "light"
                ? "border text-black bg-transparent"
                : "border text-white bg-transparent"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
        {/* map over the array of videos that are returned */}
        {/*<div className="w-full text-2xl p-3 mb-2 min-h-[400px] min-w-[800px] flex items-center justify-center">*/}
        <div className="text-sm sm:text-base md:text-lg p-2 flex items-center min-h-[300px] justify-center sm:p-3 sm:min-h-[400px]">
          {loading ? (
            <div>...loading</div>
          ) : data && data.contents && data.contents.length > 0 ? (
            // <ul className="flex flex-row flex-wrap justify-evenly w-full">
            <ul className="flex flex-wrap justify-evenly gap-4">
              {data.contents.map((item) =>
                item.video ? (
                  <li
                    key={item.video.videoId}
                    className="p-2 w-auto flex justify-center"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        id="video"
                        className={`border border-2 rounded-xl transition-shadow duration-200 w-full aspect-video
                        ${
                          theme === "light"
                            ? "border-transparent hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.7)]"
                            : "hover:shadow-[0_4px_24px_0_rgba(255,255,255,0.7)]"
                        }`}
                      >
                        <iframe
                          className="rounded-xl w-full h-full"
                          // width="480"
                          // height="270"
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
        <div
          className={`w-full bg-black p-5 border text-sm sm:text-base md:text-lg text-left rounded-b-xl rounded-t-xl 
        ${
          theme === "light"
            ? "bg-white text-black border-none"
            : "bg-black text-white border-white"
        }`}
        >
          <p>&copy; 2025 soloSoftwareDev</p>
        </div>
      </div>
    </>
  );
}
export default App;
