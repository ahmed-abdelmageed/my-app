import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';



export default function ProtectedRoute(props) {
    if (localStorage.getItem('userToken')) {
        console.log("trueeee");
        return props.children
        
      }
      else {
        console.log("falseeee");
        return <Navigate to={'/login'}/>
    
      }
}
