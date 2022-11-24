import AddProduct from "../pages/AddProduct";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UsersPage from "../pages/UsersPage";
import DashTemp from "../templates/DashTemp";
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
        element: <LoginPage></LoginPage>
      },
      {
        path: 'register',
        element: <RegisterPage></RegisterPage>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashTemp></DashTemp>,
    children: [
      {
        path: '',
        element: ''
      },
      {
        path: 'my-orders',
        element: ''
      },
      {
        path: 'add-a-product',
        element: <AddProduct></AddProduct>
      },
      {
        path: 'my-products',
        element: ''
      },
      {
        path: 'my-buyers',
        element: ''
      },
      {
        path: 'all-sellers',
        element: <UsersPage></UsersPage>,
        loader: () => fetch('http://localhost:5000/users?role=seller')
      },
      {
        path: 'all-buyers',
        element: <UsersPage></UsersPage>,
        loader: () => fetch('http://localhost:5000/users?role=buyer')
      },
      {
        path: 'reported-items',
        element: ''
      },
    ]
  }
]);