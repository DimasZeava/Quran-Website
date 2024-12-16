import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Activities = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Surahs</h1>
      <ul>
        {data.map((surah) => (
          <li key={surah.number}>
            <Link to={`/surah/${surah.number}`}>{surah.englishName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
