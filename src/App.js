import React from 'react'
import {BrowserRouter, Switch, Redirect} from 'react-router-dom'
import { CompatRouter, CompatRoute } from 'react-router-dom-v5-compat';
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
            <BrowserRouter>
                <CompatRouter>
                    <Header username={cookies.username} permission={cookies.permission} removeCookie={removeCookie}/>
                    <Switch>
                    {
                        ['administrator', 'api'].includes(cookies.permission)
                        ?
                        <>
                            <CompatRoute path="/" exact>
                                <Redirect to="/status" />
                            </CompatRoute>
                            <CompatRoute path="/status" component={StatusesPage} />
                            <CompatRoute path="/collection" component={CollectionsPage} />
                            <CompatRoute path="/statistic_lines/:avtomatNumber?" component={StatisticLinesPage} />
                            <CompatRoute path="/order" component={OrdersPage} />
                            <CompatRoute path="/issue" component={IssuePage} />
                        </>
                        :
                        <>
                            <CompatRoute path="/" component={StatisticLinesPage} />
                        </>
                    }
                    </Switch>
                </CompatRouter>
            </BrowserRouter>
            <Footer />
        </ErrorBoundary>
    )
}

export default App
