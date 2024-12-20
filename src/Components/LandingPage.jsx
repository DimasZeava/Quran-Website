import Search from "./Search";

const LandingPage = () => {
  return (
    <div className="hero h-96 flex flex-col items-center justify-center">
      <div className="wrap text-center mb-10 text-gray-800 dark:text-white">
        <h1 className="title text-6xl mb-6"> Qur&apos;an Website</h1>
        <h3 className="description text-xl">
          Recite Al-Qur&apos;an and be closer to Allah SWT.
        </h3>
      </div>
      <div className="search-container w-full max-w-md">
      <Search />
      </div>
    </div>
  );
};

export default LandingPage;
