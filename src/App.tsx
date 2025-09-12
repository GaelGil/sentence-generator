import { useState } from "react";
export default function App() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(loading);

      alert(content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h4 className="text-xl block font-bold mb-10">Setence Generator</h4>
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
              Submit
            </button>
          </div>
        )}
      </form>

      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
