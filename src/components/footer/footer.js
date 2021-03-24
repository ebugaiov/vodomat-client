import React from 'react';

import './footer.css';

const Footer = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer className="footer text-muted fixed-bottom">
            <p>&#169; 1998-{currentYear} Gals</p>
        </footer>
    )
}

export default Footer;