import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Header from '../header';
import Footer from '../footer';

import LoginPage from '../pages/login';
import StatusPage from '../pages/status';
import DepositPage from '../pages/deposit';
import IssuePage from '../pages/issue';
import AvtomatPage from '../pages/avtomat';
import CityPage from '../pages/city';

import './app.css';

function App()  {

    const [ cookies, setCookie, removeCookie ] = useCookies(['token', 'username'])

    if (!cookies.token) {
        return <LoginPage setCookie={setCookie} />
    }

    return (
        <Router>
            <Header username={cookies.username} removeCookie={removeCookie}/>

            <Route path="/" exact>
                {<Redirect to="/status" />}
            </Route>

            <Route path="/status">
                {<StatusPage />}
            </Route>

            <Route path="/deposit">
                {<DepositPage />}
            </Route>

            <Route path="/issue">
                {<IssuePage />}
            </Route>

            <Route path="/avtomat">
                {<AvtomatPage />}
            </Route>

            <Route path="/city">
                {<CityPage />}
            </Route>

            <Footer />
        </Router>
    )
}

export default App