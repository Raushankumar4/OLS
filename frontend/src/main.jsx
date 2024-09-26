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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/verifyOtp", element: <VerifyOtp /> },
      { path: "/login", element: <Login /> },
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
