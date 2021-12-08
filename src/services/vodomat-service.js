import BaseService from "./base-service";

export default class VodomatService extends BaseService {

    constructor() {
        super()
        this._apiBase = process.env.REACT_APP_VODOMAT_API_URL;
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

    getDeposits = async (date) => {
        const url = date ? `/deposit?date=${date}` : '/deposit'
        const res = await this.getResource(url)
        return res.map(this._transformDeposit)
    }

    getDepositByPurchaseId = async (purchaseId) => {
        const deposit = await this.getResource(`/deposit/purchase/${purchaseId}`)
        return this._transformDeposit(deposit)
    }

    getAllAvtomats = async () => {
        const res = await this.getResource('/avtomat')
        return res.avtomats.map(this._transformAvtomat)
    }

    getAvtomat = async (number) => {
        const avtomat = await this.getResource(`/avtomat/${number}`)
        return this._transformAvtomat(avtomat)
    }

    getAllCities = async () => {
        const res = await this.getResource('/city')
        return res.cities.map(this._transformCity)
    }

    getAllStreets = async () => {
        const res = await this.getResource('/street')
        return res.streets.map(this._transformStreet)
    }

    _transformStatus = (status) => {
        return {
            id: status.avtomat_number,
            avtomatNumber: status.avtomat_number,
            time: status.time.replace('T', ' '),
            city: status.city,
            street: status.street,
            house: status.house,
            carNumber: status.car_number,
            water: status.water / 100,
            money: status.money / 100,
            price: status.price / 100,
            size: status.size,
            lowWaterBalance: status.low_water_balance,
            errorVolt: status.error_volt,
            errorBill: status.error_bill,
            errorCounter: status.error_counter,
            errorRegister: status.error_register
        }
    }

    _transformDeposit = (deposit) => {
        return {
            id: deposit.purchase_id,
            avtomatNumber: deposit.avtomat_number,
            timeServer: deposit.time_server,
            timePaymentGateway: deposit.time_payment_gateway,
            city: deposit.city,
            street: deposit.street,
            house: deposit.house,
            price: deposit.price ? deposit.price / 100 : null,
            purchaseId: deposit.purchase_id,
            serverId: deposit.server_id,
            statusServer: deposit.status_server,
            statusPaymentGateway: deposit.status_payment_gateway,
            cardMask: deposit.card_mask,
            billAmount: deposit.bill_amount,
            gateType: deposit.gate_type
        }
    }

    _transformAvtomat = (avtomat) => {
        return {
            id: avtomat.avtomat_number,
            city: avtomat.city,
            street: avtomat.street,
            house: avtomat.house,
            carNumber: avtomat.car_number,
            latitude: avtomat.latitude,
            longitude: avtomat.longitude,
            searchRadius: avtomat.search_radius,
            price: avtomat.price,
            priceForApp: avtomat.price_for_app,
            maxSum: avtomat.max_sum,
            size: avtomat.size,
            competitors: avtomat.competitors,
            streetId: avtomat.street_id,
            routeId: avtomat.route_id
        }
    }

    _transformCity = (city) => {
        return {
            id: city.id,
            city: city.city
        }
    }

    _transformStreet = (street) => {
        return {
            id: street.id,
            street: street.street,
            cityId: street.city_id
        }
    }
}