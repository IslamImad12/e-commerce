import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Component/finalProject assets/images/freshcart-logo.svg'
import { userContext } from '../UserContext'
export default function Navbar() {
    let { user, setIsUser, setOpen, login } = useContext(userContext)
    let navigate = useNavigate()
    function LogOut() {
        setIsUser(null)
        localStorage.removeItem('userToken')
        navigate('/login')
    }
  return <>
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <div className="container">
        <img src={logo} alt="" />
        <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" to="/home" aria-current="page">Home
                        <span className="visually-hidden">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart">cart</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/whish">wish list</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                </li>
                
                <li className="nav-item">
                    <Link className="nav-link" to="/catgories">catrgories</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/brands">brands</Link>
                </li>

            </ul>
                <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                    {/* <li className='nav-item d-flex align-items-center'>
                        <i className='fab fa-instagram mx-2'></i>
                        <i className='fab fa-facebook mx-2'></i>
                        <i className='fab fa-tiktok mx-2'></i>
                        <i className='fab fa-twitter mx-2'></i>
                        <i className='fab fa-linkedin mx-2'></i>
                        <i className='fab fa-youtube mx-2'></i>
                    </li> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/Register">Register</Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link " onClick={LogOut}>Logout</span>
                </li>
                </ul>
        </div>
    </div>
  </nav>
  
  </> 
  
}
