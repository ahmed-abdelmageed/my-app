import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import Login from './Components/login/login';
import People from './Components/people/people';
import Tv from './Components/tv/tv';
import Movies from './Components/movies/movies';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import { Offline, Online } from "react-detect-offline";






function App() {

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  }, [])


  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken);

  }


  const routers = createHashRouter([
    {
      path: "", element: <MainLayout setUserData={setUserData} userData={userData} />, children: [
        { index:true, element: <ProtectedRoute userData={userData}> <Home /> </ProtectedRoute> },
        { path: "people", element: <ProtectedRoute userData={userData}> <People /> </ProtectedRoute> },
        { path: "movies", element: <ProtectedRoute userData={userData}> <Movies /> </ProtectedRoute> },
        { path: "profile", element: <ProtectedRoute userData={userData}> <Profile userData={userData} /> </ProtectedRoute> },
        { path: "tv", element: <ProtectedRoute userData={userData}> <Tv /> </ProtectedRoute> },
        { path: "itemdetails/:id/:media_type", element: <ProtectedRoute userData={userData}> <ItemDetails /> </ProtectedRoute> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path:"register", element: <Register /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ])
  return (
    <>
      {/* <div>
        <Offline> <div className='offline'> You Are Offline</div></Offline>
      </div> */}
      <RouterProvider router={routers} />

    </>
  );
}

export default App;
