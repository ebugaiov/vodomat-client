import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import LoginPage from '../pages/login'
import StatusPage from '../pages/status'
import DepositPage from '../pages/deposit'
import useToken from '../../custom-hooks/useToken'

import './app.css'

function App()  {

    const {token, setToken} = useToken();

    if (!token) {
        return <LoginPage setToken={setToken} />
    }

    return (
        <div>
            <Router>
                <Route path="/" exact>
                    {<Redirect to="/status" />}
                </Route>
                <Route path="/status">
                    {<StatusPage />}
                </Route>
                <Route path="/deposit">
                    {<DepositPage />}
                </Route>
            </Router>
        </div>
    )
}

export default App