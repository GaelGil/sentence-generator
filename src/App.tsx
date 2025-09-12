import { useState } from "react";
export default function App() {
  const [content, setContent] = useState("");
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h4 className="text-xl block font-bold mb-10"> All Projects</h4>
      <form className="py-4 grid grid-cols-1 gap-6">
        <textarea
          value={content}
          placeholder="Search Projects..."
          className="p-2 text-md text-secondary-300 border border-secondary-300 rounded-md focus:outline-none focus:border-primary-600"
        />
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
      {!content ? (
        <></>
      ) : (
        <div className="mt-12">
          <button
            className="inline-block px-6 py-3 border
            border-secondary-300
            text-secondary-300 rounded-lg font-medium hover:text-primary-600 hover:border-primary-600 cursor-pointer"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
