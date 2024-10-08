import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteSingleCourse } from "../../Admin/CreateCourse/deleteCourse";
import { COURSE } from "../../constant";
import axios from "axios";
import { successToast } from "../Toast/ToastNotify";
import Loading from "../Pages/Loading";

const CourseDetails = () => {
  const { courses } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const findCourse = courses?.find((course) => course?._id === id);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const courseTags = (() => {
    try {
      return JSON.parse(findCourse?.courseTag) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  })();

  const courseTopics = (() => {
    try {
      return JSON.parse(findCourse?.topics) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  })();

  const courseOvers = (() => {
    try {
      return JSON.parse(findCourse?.overview) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  })();

  const handleDelete = () => {
    window.confirm("Are you sure you want to delete this course?") &&
      deleteSingleCourse(findCourse?._id, token, navigate, dispatch);
  };

  const handlePayment = async () => {
    setLoading(true);
    const {
      data: { order },
    } = await axios.post(
      `${COURSE}/checkout/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    const options = {
      key: "YOUR_KEY_ID",
      amount: order.id,
      currency: "INR",
      name: "E Learnering",
      description: "Learn With Us..",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const { data } = await axios.post(
            `${COURSE}/verfication/${id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          successToast(data?.message);
          navigate(`/payment-success/${razorpay_order_id}`);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
        button: "#3399cc",
        heading: "black",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function (response) {
      console.log(response);
    });
  };

  const handleUpdate = () => {
    navigate(`/dashboard/upadate-course/${id}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-6xl mx-auto p-6 min-h-[110vh] dark:bg-gray-900 flex flex-col md:flex-row">
          {/* Left Side: Course Image, Buy Option, and Student Reviews */}
          <div className="flex-none w-full md:w-1/3 p-4">
            <img
              className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
              src={findCourse?.image}
              alt={findCourse?.courseName || "Course Image"}
            />
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Price: ${findCourse?.price}
              </h3>
              {user && user?.subscription?.includes(findCourse?._id) ? (
                <Link
                  to={`/study/${id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Study
                </Link>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handlePayment}
                >
                  Buy Now
                </button>
              )}
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Tags:
            </h4>
            <div className="flex flex-wrap mt-2">
              {courseTags?.length > 0 ? (
                courseTags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span>No tags available</span>
              )}
            </div>

            {/* Student Reviews */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Student Reviews:
              </h4>
              <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mt-2">
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Hena:</strong> "Fantastic course! Helped me understand
                  React in no time."
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Emily:</strong> "Great explanations and examples,
                  highly recommend!"
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Course Details */}
          <div className="flex-grow p-4 relative">
            {/* Icons in the top right corner */}
            {user?.role === "admin" && (
              <div className="absolute top-4 right-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={handleUpdate}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-2"
                  onClick={handleDelete}
                >
                  <FaTrash />
                </button>
              </div>
            )}

            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {findCourse?.courseName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {findCourse?.description}
            </p>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
              Instructor: {findCourse?.createdBy || "Unknown"}
            </h4>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
              Course Language:
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {findCourse?.language || "N/A"}
            </p>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
              Course Content:
            </h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
              {courseTopics?.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
              What You'll Learn:
            </h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
              {courseOvers?.map((over) => (
                <li key={over}>{over}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
