import AddCategory from "../pages/AddCategory";
import AddProduct from "../pages/AddProduct";
import AllCategoriesPage from "../pages/AllCategoriesPage";
import BlogPage from "../pages/BlogPage";
import CategoriesPage from "../pages/CategoriesPage";
import DashPage from "../pages/DashPage";
import EditCategory from "../pages/EditCategory";
import EditProduct from "../pages/EditProduct";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyBuyers from "../pages/MyBuyers";
import MyOrderPage from "../pages/MyOrderPage";
import MyProductsPage from "../pages/MyProductsPage";
import ProductsPage from "../pages/ProductsPage";
import RegisterPage from "../pages/RegisterPage";
import ReportedItemsPage from "../pages/ReportedItemsPage";
import SettingsPage from "../pages/SettingsPage";
import ShopPage from "../pages/ShopPage";
import SingleCategoryPage from "../pages/SingleCategoryPage";
import UsersPage from "../pages/UsersPage";
import DashTemp from "../templates/DashTemp";
import MainTemp from "../templates/MainTemp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
        loader: () => fetch('https://antique-watches.vercel.app/categories')
      },
      {
        path: 'categories/:id',
        element: <SingleCategoryPage></SingleCategoryPage>
      },
      {
        path: 'shop',
        element: <ShopPage></ShopPage>
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
        element: <PrivateRoute><DashPage></DashPage></PrivateRoute>
      },
      {
        path: 'my-orders',
        element: <PrivateRoute><MyOrderPage></MyOrderPage></PrivateRoute>
      },
      {
        path: 'settings',
        element: <PrivateRoute><SettingsPage></SettingsPage></PrivateRoute>
      },

      // For only sellers
      {
        path: 'add-product',
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
      {
        path: 'my-products',
        element: <SellerRoute><MyProductsPage></MyProductsPage></SellerRoute>
      },
      {
        path: 'my-products/:id',
        element: <SellerRoute><EditProduct></EditProduct></SellerRoute>
      },
      {
        path: 'my-buyers',
        element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>
      },

      // For only admins
      {
        path: 'all-sellers',
        element: <AdminRoute><UsersPage></UsersPage></AdminRoute>
      },
      {
        path: 'all-buyers',
        element: <AdminRoute><UsersPage></UsersPage></AdminRoute>
      },
      {
        path: 'products',
        element: <AdminRoute><ProductsPage></ProductsPage></AdminRoute>
      },
      {
        path: 'products/:id',
        element: <AdminRoute><EditProduct></EditProduct></AdminRoute>
      },
      {
        path: 'add-category',
        element: <AdminRoute><AddCategory></AddCategory></AdminRoute>
      },
      {
        path: 'categories',
        element: <AdminRoute><CategoriesPage></CategoriesPage></AdminRoute>
      },
      {
        path: 'categories/:id',
        element: <AdminRoute><EditCategory></EditCategory></AdminRoute>
      },
      {
        path: 'reported-items',
        element: <AdminRoute><ReportedItemsPage></ReportedItemsPage></AdminRoute>
      }
    ]
  }
]);