export default class VodomatService {

    getCookie = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
        )

    token = this.getCookie('token')

    secureHeader = {
        headers: {
            "HTTP-X-API-KEY": this.token
        }
    }

    _apiBase = '/api/v2'

    getResource = async (url, options=this.secureHeader) => {
        const res = await fetch(`${this._apiBase}${url}`, options)

        if ( res.status === 400) {
            const error = await res.json()
            if (error.error === 'wrong api key') {
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
        const options = {
            method: "POST",
            body: formData,
            mode: "cors"
        }

        const res = await this.getResource('/api_key', options)
        return res.api_key
    }

    getAllStatuses = async () => {
        const res = await this.getResource('/status')
        return res.statuses.map(this._transformStatus)
                           .sort((a,b) => new Date(b.time) - new Date(a.time))
    }

    getStatus = async (id) => {
        const status = await this.getResource(`/status/${id}`)
        return this._transformStatus(status)
    }

    _transformStatus = (status) => {
        return {
            avtomatNumber: status.avtomat_number,
            time: status.time,
            city: status.city,
            street: status.street,
            house: status.house,
            carNumber: status.car_number,
            water: status.water / 100,
            money: status.money / 100,
            price: status.price / 100,
            lowWaterBalance: status.low_water_balance,
            errorVolt: status.error_volt,
            errorBill: status.error_bill,
            errorCounter: status.error_counter,
            errorRegister: status.error_register
        }
    }
}