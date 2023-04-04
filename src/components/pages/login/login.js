import React, { useState } from 'react';

import BaseService from '../../../services/base-service';
import Footer from '../../footer';

import './login.css';

const TTL = 3600

export default function LoginPage({setCookie}) {

    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const baseService = new BaseService(process.env.REACT_APP_VODOMAT_API_URL)

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const { token , permission} = await baseService.getApiKey({
                username,
                password
            });
            setCookie("token", token, { path: "/", maxAge: TTL });
            setCookie("username", username, { path: "/" })
            setCookie("permission", permission, { path: "/" })
        } catch (error) {
            setError(error.message)
        }
        
    }

    return (
        <div className="loginContainer">
            <h1>Vodomat</h1>
            { error ? <small className="text-info">{error}</small> : null}
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