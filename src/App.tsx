import { useState, useEffect } from "react";
import { Generator } from "./services/generate";
export default function App() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  useEffect(() => {}, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(loading);
      const generator: Generator = new Generator(content);
      const response: string = generator.generate(100);
      console.log(generator.transition_probs);
      setGeneratedContent(response);
      // alert(content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h4 className="text-xl block font-bold mb-4">Setence Generator</h4>
      <p>Please enter a large amount of text containing at least 1000 words.</p>
      <form onSubmit={handleSubmit} className="py-4 grid grid-cols-1 gap-6">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Enter Text Here ..."
          className="p-2 text-md text-secondary-300 border border-secondary-300 rounded-md focus:outline-none focus:border-primary-600"
        />
        {!content ? (
          <></>
        ) : (
          <div className="mt-12">
            <button
              type="submit"
              className="inline-block px-6 py-3 border
            border-secondary-300
            text-secondary-300 rounded-lg font-medium hover:text-primary-600 hover:border-primary-600 cursor-pointer"
            >
              Generate
            </button>
            {generatedContent ? (
              <button
                type="submit"
                onClick={() => setGeneratedContent("")}
                className="inline-block px-6 py-3 border
            border-secondary-300 text-secondary-300 rounded-lg font-medium hover:text-primary-600 hover:border-primary-600 cursor-pointer"
              >
                Clear
              </button>
            ) : (
              <></>
            )}
          </div>
        )}
      </form>

      <div className="flex items-center justify-center">
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        ) : (
          <p>{generatedContent}</p>
        )}
      </div>

      <div className="mt-12">
        <h4 className="text-xl block font-bold mb-4">How it Works</h4>
        <p>...</p>
      </div>
    </div>
  );
}
