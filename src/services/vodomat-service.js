export default class VodomatService {

    _apiBase = 'http://localhost:8080/api/v2'

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return res.json()
    }

    getAllStatuses = async () => {
        const res = await this.getResource('/status')
        return res.statuses
    }

    getStatus = async (id) => {
        return await this.getResource(`/status/${id}`)
    }
}