import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        About Us
      </h2>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Our Mission
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-justify">
          Our mission is to provide high-quality online education accessible to
          everyone. We aim to empower learners by providing a platform that
          fosters knowledge, creativity, and innovation.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Our Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {/* Team Member 1 */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition transform hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://via.placeholder.com/150"
              alt="Team Member 1"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Jane Doe
              </h4>
              <p className="text-gray-600 dark:text-gray-400">Founder & CEO</p>
              <p className="text-gray-500 dark:text-gray-300">
                Jane has over 10 years of experience in education technology.
              </p>
            </div>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition transform hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://via.placeholder.com/150"
              alt="Team Member 2"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                John Smith
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Lead Instructor
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                John specializes in curriculum development and online teaching
                strategies.
              </p>
            </div>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition transform hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://via.placeholder.com/150"
              alt="Team Member 3"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Emily Johnson
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Product Manager
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                Emily is passionate about creating user-friendly learning
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Join Us Today
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          We invite you to explore our platform and join our community of
          learners. Together, let's embark on a journey of knowledge and growth!
        </p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
