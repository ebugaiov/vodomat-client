import BaseService from "./base-service";

export default class VodomatService extends BaseService {

    constructor() {
        super()
        this._apiBase = process.env.REACT_APP_VODOMAT_API_URL;
    }

    getAllStatuses = async () => {
        const res = await this.getResource('/status')
        return res.statuses.map(this._transformStatus)
    }

    getStatus = async (id) => {
        const status = await this.getResource(`/status/${id}`)
        return this._transformStatus(status)
    }

    getCollections = async (date) => {
        const url = date ? `/statistic/collections?date=${date}` : '/statistic/collections'
        const res = await this.getResource(url)
        return res.collections.map(this._transformStatistic)
                              .sort((a, b) => {
                                  const addressA = `${a.street} ${a.house}`;
                                  const addressB = `${b.street} ${b.house}`;
                                  if (addressA < addressB) {
                                      return -1
                                  }
                                  if (addressA > addressB) {
                                      return 1
                                  }
                                  return 0
                              })
    }

    getStatisticLines = async (avtomatNumber, startPeriod, endPeriod) => {
        const url = `/statistic/${avtomatNumber}?start_period=${startPeriod}&end_period=${endPeriod}`;
        const res = await this.getResource(url);
        const statisticLines = res.statistic_lines;
        for (let i = 1; i < statisticLines.length; i++) {
            if (statisticLines[i].water !== statisticLines[i - 1].water) {
                statisticLines[i].isModified = true;
            }
        }
        return statisticLines.map(this._transformStatistic)
                                 .sort((a, b) => {
                                     return new Date(b.time) - new Date(a.time)
                                 })
    }

    getDepositsPortmone = async (date) => {
        const url = date ? `/deposit_portmone?date=${date}` : '/deposit_portmone'
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

    deleteAvtomat = async (number) => {
        const options = this.createOptionsForRequest('DELETE', null, this.secureHeader)
        const resp = await this.getResource(`/avtomat/${number}`, options)
        return resp
    }

    getAllStreets = async () => {
        const res = await this.getResource('/street')
        return res.streets.map(this._transformStreet)
                          .sort((a,b) => a.street > b.street ? 1 : -1)
    }

    updateStreet = async (cityId, street, streetId) => {
        const body = JSON.stringify({'city_id': cityId, 'street': street})
        const options = this.createOptionsForRequest('PUT', body, this.secureHeader)
        const res = await this.getResource(`/street/${streetId}`, options)
        return this._transformStreet(res)
    }

    createStreet = async (cityId, street) => {
        const body = JSON.stringify({'city_id': cityId, 'street': street})
        const options = this.createOptionsForRequest('POST', body, this.secureHeader)
        const res = await this.getResource('/street', options)
        return this._transformStreet(res)
    }

    getAllCities = async () => {
        const res = await this.getResource('/city')
        return res.cities.map(this._transformCity)
    }

    updateCity = async (id, city) => {
        const body = JSON.stringify({'city': city})
        const options = this.createOptionsForRequest('PUT', body, this.secureHeader)
        const res = await this.getResource(`/city/${id}`, options)
        return this._transformCity(res)
    }

    createCity = async (city) => {
        const body = JSON.stringify({'city': city})
        const options = this.createOptionsForRequest('POST', body, this.secureHeader)
        const res = await this.getResource('/city', options)
        return {city: res.city}
    }

    _transformStatus = (status) => {
        return {
            id: status.avtomat_number,
            avtomatNumber: status.avtomat_number,
            time: status.time.replace('T', ' '),
            city: status.city,
            street: status.street,
            house: status.house,
            latitude: status.latitude,
            longitude: status.longitude,
            carNumber: status.car_number,
            routeName: status.route_name,
            water: status.water / 100,
            money: status.money / 100,
            moneyApp: status.money_app / 100,
            price: status.price / 100,
            size: status.size,
            grn: status.grn,
            kop: status.kop,
            avtomatState: status.state,
            billNotWork: status.bill_not_work,
            coinNotWork: status.coin_not_work,
            billNotWorkMoney: status.bill_not_work_money,
            coinNotWorkMoney: status.coin_not_work_money,
            timeToBlock: status.time_to_block,
            lowWaterBalance: status.low_water_balance,
            errorVolt: status.error_volt,
            errorBill: status.error_bill,
            errorCounter: status.error_counter,
            errorRegister: status.error_register,
            cashBox: status.cashbox
        }
    }

    _transformDeposit = (deposit) => {
        return {
            id: deposit.purchase_id,
            purchaseId: deposit.purchase_id,
            serverId: deposit.server_id,
            paymentGatewayId: deposit.bill_id,
            avtomatNumber: deposit.avtomat_number,
            timeServer: deposit.time_server,
            timePaymentGateway: deposit.time_payment_gateway,
            city: deposit.city,
            street: deposit.street,
            house: deposit.house,
            price: deposit.price ? deposit.price / 100 : null,
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
            paymentAppUrl: avtomat.payment_app_url,
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
            cityId: street.city_id,
            city: street.city
        }
    }

    _transformStatistic = (statistic) => {
        return {
            id: statistic.id,
            avtomatNumber: statistic.avtomat_number,
            city: statistic.city,
            street: statistic.street,
            house: statistic.house,
            carNumber: statistic.car_number,
            time: statistic.time.replace('T', ' '),
            water: statistic.water / 100,
            isModified: statistic.isModified,
            money: statistic.money / 100,
            moneyApp: statistic.money_app / 100,
            price: statistic.price / 100,
            grn: statistic.grn,
            kop: statistic.kop,
            billNotWork: statistic.bill_not_work,
            coinNotWork: statistic.coin_not_work,
            timeToBlock: statistic.time_to_block,
            lowWaterBalance: statistic.low_water_balance,
            errorVolt: statistic.error_volt,
            errorBill: statistic.error_bill,
            errorCounter: statistic.error_counter,
            errorRegister: statistic.error_register,
            cashBox: statistic.cashbox,
            gsm: statistic.gsm,
            event: statistic.event
        }
    }
}
