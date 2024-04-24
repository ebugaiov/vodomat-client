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
                {
                    ['administrator', 'api'].includes(cookies.permission)
                    ?
                    <>
                        <Route path="/" exact>
                            <Redirect to="/status" />
                        </Route>
                        <Route path="/status" component={StatusesPage} />
                        <Route path="/collection" component={CollectionsPage} />
                        <Route path="/statistic_lines/:avtomatNumber?" component={StatisticLinesPage} />
                        <Route path="/order" component={OrdersPage} />
                        <Route path="/issue" component={IssuePage} />
                    </>
                    :
                    <>
                        <Route path="/" component={StatisticLinesPage} />
                    </>
                }
            </Router>
            <Footer />
        </ErrorBoundary>
    )
}

export default App
