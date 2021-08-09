import React from 'react'
import ReactDom from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import App from './components/app'

ReactDom.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    document.getElementById('root')
);