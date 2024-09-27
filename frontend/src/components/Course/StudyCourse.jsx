import React, { useState } from "react";

const lectures = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Overview of React and its core concepts.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Components and Props",
    description: "Learn how to create reusable components.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "State and Lifecycle",
    description: "Understanding state and lifecycle methods.",
    videoUrl: "https://www.youtube.com/embed/dQw4w",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Introduction to React",
    description: "Overview of React and its core concepts.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Components and Props",
    description: "Learn how to create reusable components.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Components and Props",
    description: "Learn how to create reusable components.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const StudyCourse = () => {
  const [activeLecture, setActiveLecture] = useState(lectures[0]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  const handleQuestionSubmit = () => {
    if (newQuestion) {
      setQuestions((prev) => [...prev, { text: newQuestion, replies: [] }]);
      setNewQuestion("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6  dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Left Side: Video Player and Questions Section */}
      <div className="flex-none w-full md:w-2/3 p-4">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {activeLecture.title}
        </h2>
        <iframe
          className="w-full h-64 rounded-lg mb-4"
          src={activeLecture.videoUrl}
          title={activeLecture.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {activeLecture.description}
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Ask a Question:
        </h3>
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg"
            placeholder="Type your question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
            onClick={handleQuestionSubmit}
          >
            Submit
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-4">
          Questions:
        </h3>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 mt-2">
          {questions.map((question, index) => (
            <div key={index} className="mb-2 text-gray-800 dark:text-gray-200">
              <p>{question.text}</p>
              {/* Replies could be added here */}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Lecture List */}
      <div className="flex-grow w-full md:w-1/3 p-4 overflow-y-scroll h-[40vw]">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          All Lectures
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="flex items-center mb-4 cursor-pointer"
              onClick={() => setActiveLecture(lecture)}
            >
              <img
                src={lecture.imageUrl}
                alt={lecture.title}
                className="w-16 h-16 rounded-lg mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {lecture.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {lecture.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyCourse;
