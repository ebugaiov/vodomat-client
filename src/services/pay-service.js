import BaseService from "./base-service";

export default class PayService extends BaseService {

    constructor() {
        super()
        this._apiBase = process.env.REACT_APP_PAY_API_URL;
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

    getIssues = async (date) => {
        const url = date ? `/issue?created_at=${date}` : '/issue';
        const res = await this.getResource(url);
        return res.issues.map(this._transformIssue)
                         .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
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

    getPurchase = async (id) => {
        const purchase = await this.getResource(`/purchase/${id}`)
        return this._transformPurchase(purchase)
    }

    getOrders = async (date) => {
        const url = date ? `/orders?date=${date}` : '/orders';
        const res = await this.getResource(url);
        return res.orders.map(this._transformOrder)
                         .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    getOrder = async (id) => {
        const order = await this.getResource(`/order/${id}`)
        return this._transformOrder(order)
    }

    _transformIssue = (issue) => {
        return {
            id: issue.id,
            createdAt: issue.created_at,
            avtomatNumber: issue.avtomat_number,
            address: issue.address,
            issue: issue.issue,
            email: issue.email,
            comment: issue.comment 
        }
    }

    _transformPurchase = (purchase) => {
        return {
            id: purchase.id,
            createdAt: purchase.created_at,
            avtomatNumber: purchase.avtomat_number,
            address: purchase.address,
            money: purchase.money,
            status: purchase.status,
            paymentGatewayId: purchase.payment_gateway_id,
            depositId: purchase.deposit_id,
            receiptUrl: purchase.receipt_url
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
            appMoney: order.money_purchase,
            payGateMoney: order.money_payment_gateway,
            serverMoney: order.money_server,
            price: order.price,
            avtomatNumber: order.avtomat_number,
            address: order.address,
            cardMask: order.card_mask,
            gateType: order.gate_type,
            transaction: order.transaction,
            error: order.error
        }
    }

}