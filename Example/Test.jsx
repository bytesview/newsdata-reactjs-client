import React, { useEffect, useState } from "react";
import useNewsDataApiClient from "newsdataapi";

const Test = () => {
  const { latest } = useNewsDataApiClient("YOUR_NEWSDATA_API_KEY");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await latest({ q: "AI", country: "us" });
        setNews(data.results || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [latest]);

  return (
    <div>
      <h1>News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {news.map((item, idx) => (
            <li key={idx}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test;
