import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Header from './components/header';
import Footer from './components/footer';

import ErrorBoundary from './components/error-boundary';

import LoginPage from './components/pages/login';
import StatusesPage from './components/pages/statuses';
import CollectionsPage from './components/pages/collections';
import StatisticLinesPage from './components/pages/statistic-lines';
import OrdersPage from './components/pages/orders';
import IssuePage from './components/pages/issue';

import './index.css';

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
                        {<Redirect to={cookies.permission === 'operator' ? "/statistic_lines" : "/status"} />}
                    </Route>

                    <Route path="/status">
                        {cookies.permission !== 'operator' ? <StatusesPage /> : <Redirect to="/statistic_lines" /> }
                    </Route>

                    <Route path="/collection">
                        {cookies.permission !== 'operator' ? <CollectionsPage /> : <Redirect to="/statistic_lines" /> }
                    </Route>

                    <Route path="/statistic_lines/:avtomatNumber?">
                        {<StatisticLinesPage />}
                    </Route>

                    <Route path="/order">
                        {cookies.permission !== 'operator' ? <OrdersPage /> : <Redirect to="/statistic_lines" /> }
                    </Route>

                    <Route path="/issue">
                        {cookies.permission !== 'operator' ? <IssuePage /> : <Redirect to="/statistic_lines" /> }
                    </Route>

                <Footer />
            </Router>
        </ErrorBoundary>
    )
}

export default App
