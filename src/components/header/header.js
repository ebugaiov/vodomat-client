import React from 'react'
import { NavLink } from 'react-router-dom'

import './header.css'

const Header = ({ username, permission, removeCookie }) => {

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top">

                <NavLink className="navbar-brand" to="/">Vodomat Client</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        {['administrator', 'api'].includes(permission)
                            ?
                            <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/status">Status</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/collection">Collection</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className="nav-link" to="/statistic_lines">Statistic Line</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/order">Order</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/issue">Issue</NavLink>
                            </li>
                            </>
                            :
                            null
                        }
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
