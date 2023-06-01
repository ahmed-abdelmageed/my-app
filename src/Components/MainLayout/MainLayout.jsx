import React from 'react'
import NavBar from '../NavBAr/NavBar'
import Footer from '../Footer/Footer'
import { Outlet , useNavigate } from 'react-router-dom'

export default function MainLayout({userData , setUserData}) {
    
    let navigate = useNavigate();
    function logOut(){
        localStorage.removeItem('userToken');
        setUserData(null);
        navigate('/login')
    }
    return (
        <div>
            <NavBar logOut={logOut} userData={userData}/>
            {/* <div className="container">  */}

                <Outlet></Outlet>
            {/* </div> */}

        </div>
    )
}
