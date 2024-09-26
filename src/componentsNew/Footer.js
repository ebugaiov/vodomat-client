import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <Navbar sticky="bottom">
            <Container className='justify-content-center'>
                <Navbar.Text>
                    <span className="mr-3 text-muted">&#169; 1998 - {currentYear} Gals</span>
                    <a href="https://t.me/ebugaiov" className="text-muted">
                        <i className="fab fa-telegram fa-lg mr-3"></i>
                    </a>
                    <a href="https://github.com/EvgeniyBugaiov/vodomat-client" className="text-muted">
                        <i className="fab fa-github fa-lg"></i>
                    </a>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}