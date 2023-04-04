import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Header from '../header';
import Footer from '../footer';

import ErrorBoundary from '../error-boundary';

import LoginPage from '../pages/login';
import StatusesPage from '../pages/statuses';
import CollectionsPage from '../pages/collections';
import StatisticLinesPage from '../pages/statistic-lines';
import OrdersPage from '../pages/orders';
import MonoOrdersPage from '../pages/mono-orders';
import IssuePage from '../pages/issue';

import TestPage from '../pages/test';

import './app.css';

function App()  {

    const [ cookies, setCookie, removeCookie ] = useCookies(['token', 'username', 'permission'])

    if (!cookies.token) {
        return <LoginPage setCookie={setCookie} />
    }

    return (
        <ErrorBoundary>
            <Router>
                <Header username={cookies.username} permission={cookies.permission} removeCookie={removeCookie}/>

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

                    <Route path="/test">
                        {<TestPage />}
                    </Route>

                <Footer />
            </Router>
        </ErrorBoundary>
    )
}

export default App
