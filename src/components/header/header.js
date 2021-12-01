import React from 'react'
import { NavLink } from 'react-router-dom'

import './header.css'

const Header = ({ username, removeCookie }) => {

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
                            <NavLink className="nav-link" to="/deposit">Deposit</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/issue">Issue</NavLink>
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