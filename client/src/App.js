import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
/** import all components */
import './App.css'
import Login from './components/login'
import Register from './components/Register';
import ForgetPassword from './components/Forgetpassword'
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import Profile from './components/Profile';
import NavbarApp from './components/NavbarApp';
import Footer from './components/Footer';
import RecoverOTP from './components/RecoverOTP';
import ChangePassword from './components/ChangePassword'
import About from './components/About';
import AdminDashboard from './admincomponent/AdminDashboard';
import Addlocation from './admincomponent/Addlocation';
import ViewLocation from './admincomponent/ViewLocation';
import UserInfo from './admincomponent/UserInfo';
import Adminlogin from './admincomponent/AdminLogin';
import Location from './components/Location';
import Homes from './admincomponent/Home';
import PredictForm from './admincomponent/PredictForm';
/*auth middleware */
import { AuthorizeUser,ProtectRoute} from './middleware/auth';
import { AuthStoreProvider } from './store/store';
import Resume from './components/Resume';


/*root routes */
const router=createBrowserRouter([
  {
    path: '/',
    element: <><NavbarApp/><Home/><Footer/></>,
  },
  {
    path: '/login',
    element: <><Login/></>,
  },
  {
    path: '/register',
    element: <> <Register/> </>,
  },
  {
    path: '/forgetpassword',
    element: <><ForgetPassword/></>,
  },
  {
    path: '/forgetpassword/recoverotp',
    element: <><RecoverOTP/></>,
  },{
    path: '/forgetpassword/recoverotp/changepassword',
    element: <><ChangePassword/></>,
  },{
    path: '/about',
    element: <><NavbarApp/><About/></>,
  },
  {
    path: '/pagenotfound',
    element: <><PageNotFound/></>,
  },
  {
    path: '/location',
    element: <><NavbarApp/><Location/></>,
  },
  {
    path: '/resume',
    element: <><Resume/></>,
  },
  {
    path: '/admin',
    element: <><Adminlogin/></>,
  },
  {
    path: '/admin/home',
    element: <><Homes/></>,
  },{
    path: '/admin/dashboard/addlocation',
    element: <><AdminDashboard/><Addlocation/></>,
  },
  {
    path: '/admin/dashboard/viewlocation',
    element: <><AdminDashboard/><ViewLocation/></>,
  },
  {
    path: '/admin/home/predictform',
    element: <><PredictForm/></>,
  },

])
function App() {
  return (
    <>
    <main className='App'>
      <RouterProvider router={router}></RouterProvider>
    </main>
    </>
  )
}

export default App