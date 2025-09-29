import React, { useState } from "react";
import axios from "axios";

const useFetchData = () => {
  const [data, setData] = useState(() => {
    const storedVideos = localStorage.getItem("videos");
    return storedVideos ? JSON.parse(storedVideos) : null;
  })
  
  const [error, setError] = useState(null);

  async function getData(query) {
    try {
   
      const options = {
        method: "GET",
        url: "https://youtube-search-and-download.p.rapidapi.com/search",
        params: {
          query: query,
          hl: "en",
          gl: "US",
          type: "v",
        },
        headers: {
          "x-rapidapi-key": "61515043b6msh494267fcc3f13f9p108597jsn289575ba76fe",
          "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
        },
      };

      const { data } = await axios.request(options);
      setData(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  }

  return [data, error, getData];

};

export default useFetchData;
