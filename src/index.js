import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Category from './components/Category';
import Product from './components/Product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/category/:categoryName",
    element: <Category/> ,
  },
  {
    path: "/product/:productId",
    element: <Product /> ,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();
