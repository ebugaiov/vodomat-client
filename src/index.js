import React from 'react'
import ReactDom from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import App from './AppNew';

ReactDom.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    document.getElementById('root')
);