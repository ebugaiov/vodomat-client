import BaseService from "./base-service";

export default class PayService extends BaseService {

    constructor() {
        super()
        this._apiBase = process.env.REACT_APP_PAY_API_URL;
    }

    getIssues = async (date) => {
        const url = date ? `/issue?created_at=${date}` : '/issue';
        const res = await this.getResource(url);
        return res.issues.map(this._transformIssue)
                         .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
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

    _transformIssue = (issue) => {
        return {
            id: issue.id,
            createdAt: issue.created_at,
            avtomatNumber: issue.avtomat_number,
            address: issue.address,
            issue: issue.issue,
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

}