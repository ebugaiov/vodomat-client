import React from 'react';

import './footer.css';

const Footer = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer className="footer">
            <div className="container-fluid">
                <span className="mr-3 text-muted">&#169; 1998 - {currentYear} Gals</span>
                <a href="https://t.me/ebugaiov" className="text-muted">
                    <i className="fab fa-telegram fa-lg mr-3"></i>
                </a>
                <a href="https://github.com/EvgeniyBugaiov/vodomat-client" className="text-muted">
                    <i className="fab fa-github fa-lg"></i>
                </a>
            </div>
        </footer>
    )
}

export default Footer;