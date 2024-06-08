import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cart from './Cart.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
