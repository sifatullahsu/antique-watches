import AddCategory from "../pages/AddCategory";
import AddProduct from "../pages/AddProduct";
import AllCategoriesPage from "../pages/AllCategoriesPage";
import BlogPage from "../pages/BlogPage";
import CategoriesPage from "../pages/CategoriesPage";
import CheckoutPage from "../pages/CheckoutPage";
import EditCategory from "../pages/EditCategory";
import EditProduct from "../pages/EditProduct";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyOrderPage from "../pages/MyOrderPage";
import MyProductsPage from "../pages/MyProductsPage";
import ProductsPage from "../pages/ProductsPage";
import RegisterPage from "../pages/RegisterPage";
import ReportedItemsPage from "../pages/ReportedItemsPage";
import SingleCategoryPage from "../pages/SingleCategoryPage";
import UsersPage from "../pages/UsersPage";
import DashTemp from "../templates/DashTemp";
import MainTemp from "../templates/MainTemp";
import PrivateRoute from "./PrivateRoute";

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
        path: 'blog',
        element: <BlogPage></BlogPage>
      },
      {
        path: 'categories',
        element: <AllCategoriesPage></AllCategoriesPage>,
        loader: () => fetch('http://localhost:5000/categories')
      },
      {
        path: 'categories/:id',
        element: <SingleCategoryPage></SingleCategoryPage>
      },
      {
        path: 'login',
        element: <LoginPage></LoginPage>
      },
      {
        path: 'register',
        element: <RegisterPage></RegisterPage>
      },
      {
        path: '/*',
        element: <ErrorPage></ErrorPage>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashTemp></DashTemp>,
    children: [

      // Default for all user role
      {
        path: '',
        element: <PrivateRoute role='any'><div></div></PrivateRoute>
      },
      {
        path: 'my-orders',
        element: <PrivateRoute role='any'><MyOrderPage></MyOrderPage></PrivateRoute>
      },

      // For only sellers
      {
        path: 'add-product',
        element: <PrivateRoute role='seller'><AddProduct></AddProduct></PrivateRoute>
      },
      {
        path: 'my-products',
        element: <MyProductsPage></MyProductsPage>
      },
      {
        path: 'my-products/:id',
        element: <EditProduct></EditProduct>
      },
      {
        path: 'my-buyers',
        element: ''
      },

      // For only admins
      {
        path: 'all-sellers',
        element: <UsersPage></UsersPage>
      },
      {
        path: 'all-buyers',
        element: <UsersPage></UsersPage>
      },
      {
        path: 'products',
        element: <ProductsPage></ProductsPage>
      },
      {
        path: 'products/:id',
        element: <EditProduct></EditProduct>
      },
      {
        path: 'add-category',
        element: <AddCategory></AddCategory>
      },
      {
        path: 'categories',
        element: <CategoriesPage></CategoriesPage>
      },
      {
        path: 'categories/:id',
        element: <EditCategory></EditCategory>
      },
      {
        path: 'reported-items',
        element: <ReportedItemsPage></ReportedItemsPage>
      },
      {
        path: 'checkout/:id',
        element: <CheckoutPage></CheckoutPage>
      },
    ]
  }
]);