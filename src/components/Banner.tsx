const Banner = () => {
  return (
    <div className="my-4">
      <h1 className="text-3xl font-bold mb-4">Setence Generator</h1>
      <a
        href="https://github.com/GaelGil/sentence-generator"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 mb-4"
      >
        Github Repo
        <img
          src="https://skillicons.dev/icons?i=github"
          alt="GitHub"
          className="w-5 h-5"
        />
      </a>
    </div>
  );
};

export default Banner;
