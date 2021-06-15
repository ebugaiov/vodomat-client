import React, { useState } from 'react';
import PropTypes from 'prop-types';

import VodomatService from '../../../services/vodomat-service';
import Footer from '../../footer';

import './login.css';

export default function LoginPage({setToken}) {

    const [username, setUserName] = useState()
    const [password, setPassword] = useState()

    const vodomatService = new VodomatService()

    const handleSubmit = async e => {
        e.preventDefault()
        const token = await vodomatService.getApiKey({
            username,
            password
        });
        setToken(token);
    }

    return (
        <div className="loginContainer">
            <h1>Vodomat</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={e => setUserName(e.target.value)}
                    className="loginInput"
                    name="username" type="text"
                    placeholder="Username" autoFocus/>
                <input
                    onChange={e => setPassword(e.target.value)}
                    className="loginInput"
                    name="password" type="password"
                    placeholder="Password" />
                <button className="loginButton" type="submit">Login</button>
            </form>
            <Footer />
        </div>
    )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}