import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TranslationContext } from '../context.jsx';

const SurahDetails = () => {
  const { surahNumber } = useParams();
  const { translation } = useContext(TranslationContext);
  const [surah, setSurah] = useState(null);
  const [translationData, setTranslationData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ayahsPerPage = 10;
  const audioEdition = "ar.alafasy"; // Example audio edition ID

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const responseArabic = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const responseTranslation = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translation}`);
        const responseAudio = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${audioEdition}`);

        if (!responseArabic.ok || !responseTranslation.ok || !responseAudio.ok) {
          throw new Error("Network response was not ok");
        }

        const dataArabic = await responseArabic.json();
        const dataTranslation = await responseTranslation.json();
        const dataAudio = await responseAudio.json();

        setSurah(dataArabic.data);
        setTranslationData(dataTranslation.data);
        setAudioData(dataAudio.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahNumber, translation]);

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error.message}</div>;
  }

  const indexOfLastAyah = currentPage * ayahsPerPage;
  const indexOfFirstAyah = indexOfLastAyah - ayahsPerPage;
  const currentAyahs = surah.ayahs.slice(indexOfFirstAyah, indexOfLastAyah);
  const totalPages = Math.ceil(surah.ayahs.length / ayahsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-2">{translationData.name}</h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-6">{translationData.englishNameTranslation}</p>
      
      <ul className="space-y-6">
        {currentAyahs.map((ayah, index) => (
          <li key={ayah.numberInSurah} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-right text-2xl font-arabic leading-relaxed mb-2 text-gray-800 dark:text-gray-200">
              {ayah.text}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm italic">
              {translationData.ayahs[indexOfFirstAyah + index].text}
            </p>
            {audioData && audioData.ayahs[indexOfFirstAyah + index] && (
              <audio
                controls
                src={audioData.ayahs[indexOfFirstAyah + index].audio}
                className="mt-4 w-full">
                Your browser does not support the audio element.
              </audio>
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-8">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500"}`}
        >
          Previous
        </button>
        <span className="text-gray-600 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500"}`}
        >
          Next
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          &larr; Back to Surah List
        </Link>
      </div>
    </div>
  );
};

export default SurahDetails;
