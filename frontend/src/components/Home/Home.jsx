import React from "react";
import Slider from "react-slick";
import CourseCard from "../Course/CourseCard";
import { Link } from "react-router-dom";

const Home = () => {
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      {/* Hero Section */}
      <header
        className="flex flex-col items-center justify-center h-screen text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
          Welcome to our E-Learning Platform
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Learn from the best courses anytime, anywhere.
        </p>
        <Link
          to="/register"
          className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
      </header>

      {/* Courses Section */}
      <section className="py-20">
        <CourseCard />
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Our Students Are{" "}
            <span className="text-3xl font-bold">Our Strength</span>
          </h2>
          <h1>See What They Say About Us</h1>
          <Slider
            {...testimonialSettings}
            className="mt-10 dark:text-gray-300 text-black md:mx-8 mx-8"
          >
            {Array(4)
              .fill()
              .map((_, index) => (
                <div className="grid ">
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex flex-col mx-4"
                  >
                    <p className="text-gray-600 dark:text-gray-300">
                      "This platform has changed my life! The courses are so
                      well-structured and easy to follow."
                    </p>
                    <h4 className="mt-4 font-bold text-gray-800 dark:text-white">
                      Student Name {index + 1}
                    </h4>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to start learning?</h2>
        <p className="mt-4">Join thousands of learners around the world.</p>
        <button className="mt-8 bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-gray-200 transition duration-300">
          Sign Up Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My E-Learning Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
