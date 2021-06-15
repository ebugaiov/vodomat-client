import { useState } from 'react';

const now = new Date();
const TTL = 1 * 60 * 60 * 10**3;

function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userToken && now.getTime() > userToken.expire) {
            localStorage.removeItem('token')
            window.location.reload()
        }
        return userToken
    };

    const [token, setToken] = useState(getToken())

    const saveToken = userToken => {
        const item = {
            token: userToken,
            expire: now.getTime() + TTL
        }
        localStorage.setItem('token', JSON.stringify(item))
        setToken(userToken)
    };

    return {
        setToken: saveToken,
        token
    }
}

export default useToken;
