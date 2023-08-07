import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './components/Index'
import VideoPlayerPage from './components/VideoPlayerPage'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Signup from './components/Signup'
import UploadVideoForm from './components/UploadVideoForm'
import AccountHome from './components/AccountHome'
import ManageVideo from './components/ManageVideo'
import AccountSettings from './components/AccountSettings'
import ChangePicForm from './components/ChangePicForm'
import AdminHome from './components/AdminHome'
import MovieUploadForm from './components/MovieUploadForm'
import MovieIndex from './components/MovieIndex'
import useAuthStore from './components/Context/AuthContext'
import AdminSignup from './components/AdminSignup'
import AdminLogin from './components/AdminLogin'

function App() {
  const [loggedIn] = useAuthStore((state) => [state.loggedIn])
  return (
    <>
      <BrowserRouter>
        {/* <NavigationBar /> */}
        <NavBar />
        <div className='mt-5 pt-5'>
          <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/movies" element={<MovieIndex />}></Route>
            <Route path="/watch/:videoId" element={<VideoPlayerPage />}></Route>
            {loggedIn ? <>
              <Route path="/account" element={<AccountHome />}></Route>
              <Route path="/account/settings" element={<AccountSettings />}></Route>
              {/* <Route path="/account/settings/change-profile-picture" element={<ChangePicForm/>}></Route> */}
              <Route path="/account/upload" element={<UploadVideoForm />}></Route>
              <Route path="/account/upload-movie" element={<MovieUploadForm />}></Route>
              <Route path="/account/manage-video/:videoID" element={<ManageVideo />}></Route>
              <Route path="/admin/home" element={<AdminHome />}></Route></> 
              :
               <>
               <Route path="/login" element={<Login />}></Route>
              <Route path='/register' element={<Signup />}></Route>
              <Route path='/admin-register' element={<AdminSignup />}></Route>
              <Route path='/admin-login' element={<AdminLogin />}></Route>
            </>}
            {/*<Route path="/Library" element={<Library />}></Route>
          <Route path="account/settings" element={<AccountSettings/>}></Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
