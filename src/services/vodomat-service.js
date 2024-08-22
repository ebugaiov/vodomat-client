import BaseService from "./base-service";

export default class VodomatService extends BaseService {

    constructor() {
        super(process.env.REACT_APP_API_DOMAIN)
    }

    getDateRange = (startDate, endDate) => {
        let dateRange = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dateRange.push(currentDate.toISOString().substring(0,10))
            currentDate.setDate(currentDate.getDate() + 1)
        }
        return dateRange;
    }

    getAvtomat = async (number) => {
        const avtomat = await this.getResource(`/avtomat/${number}`)
        return this._transformAvtomat(avtomat)
    }

    getAllStatuses = async () => {
        const res = await this.getResource('/status')
        return res.statuses.map(this._transformStatus)
    }

    getCollections = async (date) => {
        const url = date ? `/statistic/collections?date=${date}` : '/statistic/collections'
        const res = await this.getResource(url)
        return res.collections.map(this._transformStatistic)
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
    }

    getIssuesPeriod = async (startDate, endDate) => {
        let res = [];
        const dateRange = this.getDateRange(startDate, endDate);
        for (let i=0; i < dateRange.length; i++) {
            let url = `/issue?created_at=${dateRange[i]}`
            let resp = await this.getResource(url)
            res = [...res, ...resp.issues.map(this._transformIssue)]
        }
        return res.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    getIssue = async (id) => {
        const issue = await this.getResource(`/issue/${id}`)
        return this._transformIssue(issue)
    }

    commentIssue = async (id, comment) => {
        const headers = {...this.secureHeader, 'Content-Type': 'application/json'}
        const body = JSON.stringify({'comment': comment})
        const options = this.createOptionsForRequest('PUT', body, headers)
        const res = await this.getResource(`/issue/${id}`, options)
        return this._transformIssue(res)
    }

    getOrders = async (date) => {
        const url = date ? `/order?start_period=${date}&end_period=${date}` : '/order';
        const res = await this.getResource(url);
        return res.orders.map(this._transformOrder)
                         .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    getOrder = async (id) => {
        const order = await this.getResource(`/order/${id}`)
        return this._transformOrder(order)
    }

    setDoneOrder = async (payGateId) => {
        const options = this.createOptionsForRequest('PUT')
        const doneOrder = await this.getResource(`/order/set_done/${payGateId}`, options)
        return this._transformOrder(doneOrder)
    }

    _transformAvtomat = (avtomat) => {
        return {
            id: avtomat.avtomat_number,
            city: avtomat.city_name,
            street: avtomat.street_name,
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
            carNumber: status.route_car_number,
            routeName: status.route_name,
            water: status.water / 100,
            money: status.money / 100,
            moneyApp: status.money_app / 100,
            price: status.price / 100,
            size: status.size,
            grn: status.grn,
            kop: status.kop,
            avtomatState: status.state,
            billNotWork: status.bill_not_work_hours,
            coinNotWork: status.coin_not_work_hours,
            billNotWorkMoney: status.bill_not_work_coins,
            coinNotWorkMoney: status.coin_not_work_bills,
            timeToBlock: status.time_to_block,
            lowWaterBalance: status.low_water_balance,
            errorVolt: status.error_volt,
            errorBill: status.error_bill,
            errorCounter: status.error_counter,
            errorRegister: status.error_register,
            cashBox: status.cashbox
        }
    }

    _transformStatistic = (statistic) => {
        return {
            id: statistic.id,
            avtomatNumber: statistic.avtomat_number,
            city: statistic.city,
            street: statistic.street,
            house: statistic.house,
            carNumber: statistic.route_car_number,
            time: statistic.time.replace('T', ' '),
            water: statistic.water / 100,
            isModified: statistic.isModified,
            money: statistic.money / 100,
            moneyApp: statistic.money_app / 100,
            price: statistic.price / 100,
            grn: statistic.grn,
            kop: statistic.kop,
            billNotWork: statistic.bill_not_work_hours,
            coinNotWork: statistic.coin_not_work_hours,
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

    _transformIssue = (issue) => {
        return {
            id: issue.id,
            createdAt: issue.created_at.replace('T', ' '),
            avtomatNumber: issue.avtomat_number,
            address: issue.address,
            issue: issue.issue,
            email: issue.email,
            comment: issue.comment
        }
    }

    _transformOrder = (order) => {
        return {
            id: order.id_payment_gateway,
            appId: order.id_purchase,
            serverId: order.id_server,
            createdAt: order.created_at,
            payGateTime: order.time_payment_gateway,
            serverTime: order.time_server,
            appStatus: order.status_purchase,
            payGateStatus: order.status_payment_gateway,
            serverStatus: order.status_server,
            appMoney: Number(order.money_purchase),
            payGateMoney: Number(order.money_payment_gateway),
            serverMoney: Number(order.money_server),
            price: order.price,
            avtomatNumber: order.avtomat_number,
            address: order.address ? order.address : '_ _ no address',
            cardMask: order.card_mask,
            gateType: order.gate_type,
            transaction: order.transaction,
            error: order.error
        }
    }
}
