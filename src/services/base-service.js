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

    secureHeader = { "HTTP-X-API-KEY": this.token }

    createOptionsForRequest = (method='GET', body=null, headers=this.secureHeader) => {
        return {
            method: method,
            headers: headers,
            body: body
        }
    }

    getResource = async (url, options=this.createOptionsForRequest()) => {

        const res = await fetch(`${this._apiBase}${url}`, options)

        if ( res.status === 400) {
            const error = await res.json()
            if (error.error === 'wrong api key') {
                this.deleteCookie('token')
                window.location.reload()
                return
            }
            throw new Error (`${error.error}`)
        }
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json()
    }

    getApiKey = async (credentials) => {
        let formData = new FormData()
        for (const name in credentials) {
            formData.append(name, credentials[name])
        }
        const options = this.createOptionsForRequest('POST', formData)
        const res = await this.getResource('/api_key', options)
        return res.api_key
    }

}