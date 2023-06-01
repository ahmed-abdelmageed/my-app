import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';

export default function NavBar({ userData, logOut }) {
    return (

        <nav className="navbar  navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid ">
                <Link className="navbar-brand text-danger" to="/">

                    <i class="fa-solid fa-video"> Looky </i>                </Link>

                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">

                    {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/" >Home </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active" to="movies" >Movies </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="tv" >Tv </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="people" >People </Link>
                        </li>
                    </ul> : null}


                    <ul className="navbar-nav ms-auto text-black ms-2 mt-lg-0">
                        <li className="nav-item d-flex align-items-center">
                            <i className='fab mx-2 fa-facebook'></i>
                            <i className='fab mx-2 fa-twitter'></i>
                            <i className='fab mx-2 fa-instagram'></i>
                            <i className='fab mx-2 fa-tiktok'></i>
                            <i className='fab mx-2 fa-youtube'></i>
                        </li>

                        {userData === null ? <>
                            <li className="nav-item">
                                <Link className="nav-link active" to="login" >Login </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="register" >Register </Link>
                            </li>
                        </> :

                            <>


                                <li className="nav-item">
                                    <Link className="nav-link active" to="profile" >Profile </Link>
                                </li>


                                <li className='nav-item px-2'>
                                    <span onClick={logOut} className='cursor-pointer nav-link text-black'>LogOut</span>
                                </li>


                            </>
                        }



                    </ul>
                </div>
            </div>
        </nav>

        // <nav className='p-2 d-flex flex-md-row flex-column justify-content-between'>
        //     <div className="lef-nav flex-md-row flex-column  d-flex align-items-center">
        //         <h1 className='m-0 pe-3  text-info'>mov <Icon.Film /></h1>

        //         {userData ?
        //             <ul className='list-unstyled d-flex flex-md-row flex-column m-0 align-items-center'>
        //                 <li className='px-2'> <Link to="/">Home</Link></li>
        //                 <li className='px-2'> <Link to="movies">movies</Link></li>
        //                 <li className='px-2'> <Link to="tv">tv</Link></li>
        //                 <li className='px-2'> <Link to="people">people</Link></li>
        //             </ul> : ''

        //         }
        //     </div>
        //     <div className="right-nav  d-flex flex-md-row flex-column align-items-center">
        //         <div className="social-media px-3">

        //             <i className='px-2'> <Icon.Facebook />  </i>
        //             <i className='px-2' > <Icon.Instagram />  </i>
        //             <i className='px-2'> <Icon.Twitter />  </i>

        //         </div>
        //         <ul className='list-unstyled d-flex flex-md-row flex-column m-0 align-items-center'>

        //             {
        //                 userData ? <>
        //                     <li onClick={logOut} className='px-2'> <span >LogOut</span></li>
        //                     <li className='px-2'> <Link to='profile'>Profile</Link></li>
        //                 </> : <>
        //                     <li className='px-2'> <Link to="login">Login</Link></li>
        //                     <li className='px-2'> <Link to="register">Register</Link></li>

        //                 </>
        //             }



        //         </ul>

        //     </div>

        // </nav>


    )
}

