import HomePage from "../pages/HomePage";
import MainTemp from "../templates/MainTemp";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainTemp></MainTemp>,
    children: [
      {
        path: '',
        element: <HomePage></HomePage>
      },
      {
        path: 'login',
        element: ''
      },
      {
        path: 'register',
        element: ''
      }
    ]
  },
  {
    path: '/dashboard',
    element: '',
    children: [
      {
        path: '',
        element: ''
      }
    ]
  }
]);