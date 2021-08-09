import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { useCookies } from 'react-cookie'

import LoginPage from '../pages/login'
import StatusPage from '../pages/status'
import DepositPage from '../pages/deposit'

import './app.css'

function App()  {

    const [ cookies, setCookie, removeCookie ] = useCookies(['token'])

    if (!cookies.token) {
        return <LoginPage setToken={setCookie} />
    }

    return (
        <div>
            <Router>
                <Route path="/" exact>
                    {<Redirect to="/status" />}
                </Route>
                <Route path="/status">
                    {<StatusPage removeCookie={removeCookie} />}
                </Route>
                <Route path="/deposit">
                    {<DepositPage />}
                </Route>
            </Router>
        </div>
    )
}

export default App