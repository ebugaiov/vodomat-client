import React from 'react'

import './header.css'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">

            <a className="navbar-brand" href="#">Vodomat Client</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Status</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Deposit</a>
                    </li>
                </ul>
                <span className="navbar-text">Username</span>
                <a className="logout-btn btn btn-dark" href="#">Logout</a>
            </div>
        </nav>
    )
}

export default Header