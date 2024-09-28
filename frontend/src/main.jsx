import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store/store.js";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Auth/Register.jsx";
import VerifyOtp from "./components/Auth/VerifyOtp.jsx";
import Login from "./components/Auth/Login.jsx";
import Courses from "./components/Course/Courses.jsx";
import About from "./components/Pages/About.jsx";
import Policy from "./components/Pages/Policy.jsx";
import FAQ from "./components/Pages/Faq.jsx";
import CourseDetails from "./components/Course/CourseDetails.jsx";
import StudyCourse from "./components/Course/StudyCourse.jsx";
import Dashboard from "./components/Student/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "verifyOtp", element: <VerifyOtp /> },
      { path: "login", element: <Login /> },
      { path: "courses", element: <Courses /> },
      { path: "about", element: <About /> },
      { path: "policy", element: <Policy /> },
      { path: "faq", element: <FAQ /> },
      { path: "coursedetails/:id", element: <CourseDetails /> },
      { path: "study", element: <StudyCourse /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} theme="dark" />
    </PersistGate>
  </Provider>
);
