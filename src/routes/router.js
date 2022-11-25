import AddCategory from "../pages/AddCategory";
import AddProduct from "../pages/AddProduct";
import AllCategoriesPage from "../pages/AllCategoriesPage";
import CategoriesPage from "../pages/CategoriesPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import RegisterPage from "../pages/RegisterPage";
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
        element: <SingleCategoryPage></SingleCategoryPage>,
        loader: ({ params }) => fetch(`http://localhost:5000/products/categories/${params.id}`)
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
        path: 'add-product',
        element: <AddProduct></AddProduct>
      },
      {
        path: 'my-products',
        element: <ProductsPage></ProductsPage>,
        loader: () => fetch('http://localhost:5000/products')
      },
      {
        path: 'my-buyers',
        element: ''
      },
      {
        path: 'all-sellers',
        element: <UsersPage></UsersPage>,
        loader: () => fetch('http://localhost:5000/users/role/seller')
      },
      {
        path: 'all-buyers',
        element: <UsersPage></UsersPage>,
        loader: () => fetch('http://localhost:5000/users/role/buyer')
      },
      {
        path: 'categories',
        element: <CategoriesPage></CategoriesPage>,
        loader: () => fetch('http://localhost:5000/categories')
      },
      {
        path: 'add-category',
        element: <AddCategory></AddCategory>
      },
      {
        path: 'reported-items',
        element: ''
      },
    ]
  }
]);