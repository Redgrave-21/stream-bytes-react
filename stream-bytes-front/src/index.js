import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavigationBar from './components/Navbar/NavigationBar';
import VideoPlayerPage from './views/VideoPlayerPage'
import AccountPage from './views/AccountPage';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginSignupPage from './views/LoginSignupPage';
import Library from './components/Library/Library';
import UploadVideoForm from './components/Forms/UploadVideoForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/watch/:videoId",
    element: <VideoPlayerPage />
  },
  {
    path: "/login",
    element: <LoginSignupPage />
  },
  {
    path: "/user/home",
    element: <AccountPage />
  },
  {
    path: "/library",
    element: <Library />
  },
  {
    path:"/upload",
    element:<UploadVideoForm/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavigationBar />
    <RouterProvider router={router} >
      <Outlet />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
