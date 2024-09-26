import { BrowserRouter, Switch } from 'react-router-dom';
import { CompatRouter, CompatRoute } from 'react-router-dom-v5-compat';

import Container from 'react-bootstrap/Container';

import Header from './componentsNew/Header';
import Footer from './componentsNew/Footer';

import CollectionsPage from './pages/CollectionsPage';

import './index.css';

export default function App() {
    return (
        <Container fluid className='App d-flex flex-column min-vh-100'>
            <BrowserRouter>
                <CompatRouter>
                    {/* <Header /> */}
                    <Switch>
                        <CompatRoute path='/collections' component={CollectionsPage} />
                    </Switch>
                    <Footer />
                </CompatRouter>
            </BrowserRouter>
        </Container>
    )
}