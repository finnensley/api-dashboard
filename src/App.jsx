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
      <div className="flex flex-col items-center px-2 sm:px-4 md:px-8 py-4">
        <div
          className={`shadow-lg shadow-white bg-[url('/pexels-karolina-grabowska-6634140.jpg')] bg-cover bg-center w-auto flex grow flex-col items-center border rounded-lg p-0
            ${theme === "light"
              ? "bg-none bg-white text-black"
              : "bg-gray-900 text-white"
          }`}
        >
          <h1 className={`w-full pt-4 pb-2 text-2xl sm:text-3xl text-center 
            ${theme === "light"
              ? "bg-white text-black"
              : "bg-black text-white"
            }`}>
            Youtube Videos
          </h1>
          <h2 className={`w-full pb-4 text-3xl text-center mb-6 shadow-lg shadow-white
            ${theme === "light"
              ? "bg-white text-black"
              : "bg-black text-white"
            }`}>
            (see only your search results)
          </h2>
          <span>
            <ToggleTheme theme={theme} setTheme={setTheme} />
          </span>
          <div className="flex flex-col items-center w-full mb-6 mt-2">
            <label htmlFor="query" className="mb-4 text-2xl">
              Search Videos
            </label>
            <input
              className={`w-auto sm:w-3/4 md:w-1/2 ml-2 mr-2 shadow-sm shadow-white rounded-lg text-2xl p-1 bg-transparent
                ${theme === "light"
                  ? "border border-black text-black bg-transparent"
                  : "border border-white text-white bg-transparent"
                }`}
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
                className="w-auto sm:w-auto border border-white text-white p-1.5"
              >
                Submit Search Request
              </button>
            </div>
          </div>
          {/* map over the array of videos that are returned */}
          {/*<div className="w-full text-2xl p-3 mb-2 min-h-[400px] min-w-[800px] flex items-center justify-center">*/}
          <div className="text-xl p-2 flex items-center justify-center sm:text-2xl sm:p-3 sm:min-h-[400px]">
            {loading ? (
              <div>...loading</div>
            ) : data && data.contents && data.contents.length > 0 ? (
              // <ul className="flex flex-row flex-wrap justify-evenly w-full">
              <ul className="flex flex-wrap justify-evenly gap-4">
                {data.contents.map((item) =>
                  item.video ? (
                    <li key={item.video.videoId} className="p-2 w-auto flex justify-center"> 
                      <div className="flex flex-col items-center">
                        <div
                          id="video"
                          className={`border border-2 rounded-xl transition-shadow duration-200
                        ${
                          theme === "light"
                            ? "border-transparent hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.7)]"
                            : "hover:shadow-[0_4px_24px_0_rgba(255,255,255,0.7)]"
                        }`}
                        >
                          <iframe
                            className="rounded-xl"
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
          <p className="w-full bg-black pt-4 pb-4 border border-transparent text-white text-sm text-left">
            &copy; 2025 soloSoftwareDev
          </p>
        </div>
      </div>
    </>
  );
}
export default App;
