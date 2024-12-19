import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JuzDetail = () => {
  const { juzNumber } = useParams();
  const [juz, setJuz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJuz = async () => {
      try {
        const response = await fetch(`http://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setJuz(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJuz();
  }, [juzNumber]);

  const toArabicNumber = (number) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map(digit => arabicNumbers[digit]).join('');
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl mt-6">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Juz {juz.number}
      </h1>
      <div className="mt-4">
        <ul className="mt-2">
          {juz.ayahs.map((ayah) => (
            <li key={ayah.number} className="mb-2">
              <p className="text-right text-2xl font-arabic leading-relaxed mb-2 text-gray-800 dark:text-gray-200">
                {ayah.text} <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">({toArabicNumber(ayah.numberInSurah)})</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JuzDetail;