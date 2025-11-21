import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import SignUp from './pages/SignUp.jsx';
import { Provider } from 'react-redux'
import { store } from './store/store.js';
import AdminPanel from './pages/AdminPanel.jsx';
import AllUsers from './pages/AllUsers.jsx';
import AllProducts from './pages/AllProducts.jsx';
import CategoryProduct from './pages/CategoryProduct.jsx'
import ProductDetails from './pages/ProductDetails.jsx';
import ViewCartProduct from './pages/ViewCartProduct.jsx';
import SearchProduct from './pages/SearchProduct.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path:"product-category",
        element: <CategoryProduct/>
      },
      {
        path:"product/:id",
        element: <ProductDetails/>
      },
      {
        path:"cart-product",
        element: <ViewCartProduct/>
      },
      {
        path: "search-product",
        element:<SearchProduct/>
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />
          },
          {
            path: "all-products",
            element: <AllProducts />
          }
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>,
);
