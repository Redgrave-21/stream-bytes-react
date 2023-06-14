import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Index from './components/Index';
import NavigationBar from './components/Navbar/NavigationBar';
import VideoPlayerPage from './views/VideoPlayerPage'
import AccountPage from './views/AccountPage';
import LoginSignupPage from './views/LoginSignupPage';
import Library from './components/Account/Library';
import UploadVideoForm from './components/Forms/UploadVideoForm';
import ManageVideo from './components/Manage-video/ManageVideo';
import AdminHome from './components/Admin/AdminHome';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/watch/:videoID" element={<VideoPlayerPage />}></Route>
          <Route path="/login" element={<LoginSignupPage />}></Route>
          <Route path="/Library" element={<Library />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="account/upload" element={<UploadVideoForm />}></Route>
          <Route path="account/manage-video/:videoID" element={<ManageVideo />}></Route>
          <Route path="/admin/home" element={<AdminHome/>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router}>
        <Outlet />
      </RouterProvider> */}

    </>
  );
}

export default App;
