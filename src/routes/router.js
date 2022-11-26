import AddCategory from "../pages/AddCategory";
import AddProduct from "../pages/AddProduct";
import AllCategoriesPage from "../pages/AllCategoriesPage";
import CategoriesPage from "../pages/CategoriesPage";
import EditCategory from "../pages/EditCategory";
import EditProduct from "../pages/EditProduct";
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
        element: ''
      },
      {
        path: 'my-orders',
        element: <MyOrderPage></MyOrderPage>
      },

      // For only sellers
      {
        path: 'add-product',
        element: <AddProduct></AddProduct>
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
    ]
  }
]);