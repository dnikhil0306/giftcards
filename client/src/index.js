import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import './index.css';

import Layout from './components/Layout'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import CardDetail from './pages/CardDetail';
import Checkout from './pages/Checkout'
import PaymentPage from './pages/PaymentPage';
import ViewGiftcard from './pages/ViewGiftcard';
import About from './pages/About';
import RedeemCard from './pages/RedeemCard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/> },
      {path: "login", element: <Login/>},
      {path: "register", element: <Register/>},
      {path: "cards/:id", element: <CardDetail/>},
      {path: "checkout/:id", element: <Checkout/>},
      {path: "payment/:id", element: <PaymentPage/>},
      {path: "gift-card/:id", element: <ViewGiftcard/>},
      {path: "about", element: <About/>},
      {path: "redeem", element: <RedeemCard/>},
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

