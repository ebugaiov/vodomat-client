import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import './header.css'

const Header = ({ username, removeCookie }) => {

    let location = useLocation();
    const itemsPathes = ['/avtomat', '/city', '/street'];
    
    useEffect(() => {
        if (itemsPathes.includes(location.pathname)) {
            document.getElementById('itemsDropdown').classList.add('active')
        } else {
            document.getElementById('itemsDropdown').classList.remove('active')
        }
    })

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top">

                <NavLink className="navbar-brand" to="/">Vodomat Client</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/status">Status</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/order">Order</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/issue">Issue</NavLink>
                        </li>
                        <li className="nav-item dropdown" id="itemsDropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
                                Items
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/avtomat">Avtomat</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/street">Street</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/city">City</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                    <span className="navbar-text">{ username }</span>
                    <button className="logout-btn btn btn-dark" onClick={() => {
                        removeCookie("token");
                        window.location.reload();
                    }}>Logout
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header