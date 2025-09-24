import { useState, useEffect } from "react";
import { Generator } from "./services/generate";
import About from "./components/About";
import Banner from "./components/Banner";
export default function App() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState<boolean>();
  const [generatedContent, setGeneratedContent] = useState("");
  const [transitionProbs, setTransitionProbs] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [outputLength, setOutputLength] = useState(100);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  useEffect(() => {
    console.log("Loading changed:", loading);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textLength = content.split(" ").length;
    if (textLength < 1000) {
      setMessage("Please enter at least 1000 words");
      return;
    }
    setMessage("");
    setLoading(true);
    try {
      console.log(loading);
      const generator: Generator = new Generator(content);
      const response: string = generator.generate(outputLength);
      setTransitionProbs(generator.transition_probs);
      setGeneratedContent(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <Banner />
      <p>
        Please enter a large amount of text containing at least 1000 words. Set
        your output length below as well.
      </p>
      <form onSubmit={handleSubmit} className="py-4 grid grid-cols-1 gap-6">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Enter Text Here ..."
          className="p-2 text-md text-secondary-300 border border-secondary-300 rounded-md focus:outline-none focus:border-primary-600"
        />
        {message && <p className="text-red-500">{message}</p>}
        {!content ? (
          <></>
        ) : (
          <div className="mt-12 flex  gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Generate
            </button>
            {generatedContent && (
              <>
                <button
                  type="button"
                  onClick={() => setGeneratedContent("")}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  {isExpanded
                    ? "Hide details"
                    : "Show Transition Probabilities"}
                </button>
              </>
            )}
            <div>
              <label htmlFor="slider" className="block mb-2 font-medium">
                Output Length: {outputLength}
              </label>
              <input
                id="slider"
                type="range"
                min={0}
                max={100}
                value={outputLength}
                onChange={(e) => setOutputLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </form>

      <>
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        ) : (
          <>
            {generatedContent ? (
              <>
                {isExpanded && generatedContent && (
                  <div className="h-50 overflow-auto ">
                    <p className="text-sm">
                      {JSON.stringify(transitionProbs, null, 2)}
                    </p>
                  </div>
                )}
                <p className="py-4">{generatedContent}</p>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </>

      <About />
    </div>
  );
}
