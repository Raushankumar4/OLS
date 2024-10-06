import React, { useEffect } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Courses from "../Course/Courses";

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredCourses, setFilteredCourses] = React.useState([]);
  const user = useSelector((state) => state.user.user);
  const { courses } = useSelector((state) => state.course);
  const navigate = useNavigate();
  console.log(courses);

  useEffect(() => {
    if (searchQuery) {
      const results = courses?.filter((course) =>
        course?.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(results);
    } else {
      setFilteredCourses([]);
    }
  }, [searchQuery, courses]);

  const handleCourseClick = (courseId) => {
    navigate(`/coursedetails/${courseId}`);
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center h-screen text-center bg-[url('/path-to-your-image.jpg')] bg-cover bg-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-600 drop-shadow-md">
          Welcome to Our E-Learning Platform
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          Learn from the best courses anytime, anywhere.
        </p>
        <input
          type="text"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-6 border rounded p-3 w-80 md:w-96 bg-white placeholder-gray-500 shadow-md"
        />
        {searchQuery && filteredCourses?.length > 0 && (
          <div className="bg-white shadow-lg rounded mt-2 border border-gray-300">
            {filteredCourses?.map((course) => (
              <div
                key={course?._id}
                onClick={() => handleCourseClick(course?._id)}
                className="p-3 cursor-pointer hover:bg-blue-100 transition"
              >
                {course?.courseName}
              </div>
            ))}
          </div>
        )}
        {searchQuery && filteredCourses?.length === 0 && (
          <div className="mt-2 text-gray-500">No courses found.</div>
        )}
        <Link
          to={user ? "/study" : "/login"}
          className="mt-6 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-400 transition"
        >
          {user ? "Study" : "Get Started"}
        </Link>
      </header>

      {/* Courses Section */}
      {user && (
        <section className="py-20 bg-white shadow-md">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-600">
              Our Popular Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore our diverse range of courses to enhance your learning
              experience.
            </p>
            <Courses />
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600">
            Our Students Are Our Strength
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            See What They Say About Us
          </p>
          <Slider {...testimonialSettings} className="mt-10">
            {Array(4)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 mx-4"
                >
                  <p className="text-gray-600">
                    "This platform has changed my life! The courses are so
                    well-structured and easy to follow."
                  </p>
                  <h4 className="mt-4 font-bold text-blue-600">
                    Student Name {index + 1}
                  </h4>
                </div>
              ))}
          </Slider>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold">Ready to Start Learning?</h2>
        <p className="mt-4">Join thousands of learners around the world.</p>
        <button className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300">
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
