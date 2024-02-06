import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import HomePage from './page/HomePage';
import FeaturePage from './page/FeaturePage';
import LoginPage from './page/LoginPage';
import ContactUsPage from './page/ContactUsPage';
import UserRegisterPage from './page/UserRegisterPage';
import FAQPage from './page/FAQPage'


const router = createBrowserRouter ([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "feature",
    element: <FeaturePage/>
  },
  {
    path: "login" ,
    element: <LoginPage/>
  },
  {
    path: "contact-us" ,
    element: <ContactUsPage></ContactUsPage>
  },
  {
    path: "faq" ,
    element: <FAQPage></FAQPage>
  },
  {
    path: "user-register",
    element : <UserRegisterPage/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {router}/>
);

