export default class BaseService {

    constructor(url) {
        this._apiBase = url;
    }

    getCookie = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
        )
    
    deleteCookie = (name) => {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    token = this.getCookie('token')

    secureHeader = { "Authorization": `Bearer ${this.token}` };

    createOptionsForRequest = (method='GET', body=null, headers=this.secureHeader) => {
        return {
            method: method,
            headers: headers,
            body: body
        }
    }

    getResource = async (url, options=this.createOptionsForRequest()) => {

        const res = await fetch(`${this._apiBase}${url}`, options );
        const res_data = await res.json()

        if ( res.status === 401) {
            if ( res_data.detail === 'Incorrect username or password' ) {
                throw new Error(`${res_data.detail}`)
            }
            this.deleteCookie('token')
            window.location.reload()
            return
        }

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return res_data
    }

    getApiKey = async (credentials) => {
        let formData = new FormData()
        for (const name in credentials) {
            formData.append(name, credentials[name])
        }
        const options = this.createOptionsForRequest('POST', formData, {})
        const res = await this.getResource('/security/token', options)
        return { token: res.access_token, permission: res.permission }
    }

}