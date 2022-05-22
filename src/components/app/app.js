import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Header from '../header';
import Footer from '../footer';

import LoginPage from '../pages/login';
import StatusesPage from '../pages/statuses';
import CollectionsPage from '../pages/collections';
import StatisticLinesPage from '../pages/statistic-lines';
import OrdersPage from '../pages/orders';
import MonoOrdersPage from '../pages/mono-orders';
import IssuePage from '../pages/issue';
import AvtomatPage from '../pages/avtomat';

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
                {<StatusesPage />}
            </Route>

            <Route path="/collection">
                {<CollectionsPage />}
            </Route>

            <Route path="/statistic_lines/:avtomatNumber?">
                {<StatisticLinesPage />}
            </Route>

            <Route path="/order">
                {<OrdersPage />}
            </Route>

            <Route path="/mono_order">
                {<MonoOrdersPage />}
            </Route>

            <Route path="/issue">
                {<IssuePage />}
            </Route>

            <Route path="/avtomat">
                {<AvtomatPage />}
            </Route>

            <Footer />
        </Router>
    )
}

export default App
