import React, { Component } from 'react';

import './mono-orders.css';

import MonoOrderFilters from '../../mono-order-filters';
import ItemList from '../../item-list';
import RenderMonoOrderItem from '../../render-mono-order-item';

import PayService from '../../../services/pay-service';

export default class MonoOrdersPage extends Component {

    payService = new PayService();
    updateInterval = 5 * 60 * 1000;  // 5 min

    state = {
        items: [],
        loading: true,
        autoupdate: true,
        date: new Date().toISOString().substring(0, 10),
        avtomatNumber: '',
        address: ''
    }

    componentDidMount() {
        this.updateOrders()
        if (this.state.autoupdate) {
            this.intervalId = setInterval(this.updateOrders, this.updateInterval)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.date !== this.state.date) {
            this.setState({
                loading: true,
                items: []
            })
            clearInterval(this.intervalId)
            this.updateOrders()
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateOrders, this.updateInterval)
            }
        }
        if (prevState.autoupdate !== this.state.autoupdate) {
            clearInterval(this.intervalId)
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateOrders, this.updateInterval)
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    onItemsLoaded = (items) => {
        this.setState({
            items,
            loading: false
        })
    }

    updateOrders = () => {
        this.payService
            .getMonoOrders(this.state.date)
            .then(this.onItemsLoaded)
    }

    onAutoupdateChange = (state) => {
        this.setState({
            autoupdate: state
        })
    }

    onFieldChange = (field, value) => {
        this.setState({[field]: value})
    }

    avtomatNumberItems = (items, avtomatNumber) => {
        if (!avtomatNumber) {
            return items
        }
        return items.filter((item) => {
            return item.avtomatNumber ? item.avtomatNumber.toString().indexOf(avtomatNumber.toString()) > -1 : false;
        })
    }

    addressItems = (items, address) => {
        if (address.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.address ? item.address.toLowerCase().indexOf(address.toLowerCase()) > -1 : false;
        })
    }

    render() {
        const { items, loading, avtomatNumber, address } = this.state;

        const visibleItems = items ?
                             this.avtomatNumberItems(
                                 this.addressItems(items, address),
                             avtomatNumber
                             ) : []

        const countOrdersAll = visibleItems.length;
        const countOrdersSuccess = visibleItems.filter((item) => {
            return item.status === 2
        }).length

        const sumServer = visibleItems.reduce((sum, item) => {
            if (item.serverStatus === 1) {
                sum += item.serverMoney
            }
            return Math.round((sum + Number.EPSILON) * 100) / 100;
        }, 0)

        const listHeader = (
            <span>
                Orders
                <span className='badge badge-light ml-2 mr-2'>Count All&nbsp;{countOrdersAll}</span>
                <span className='badge badge-light mr-2'>Count Success&nbsp;{countOrdersSuccess}</span>
                <span className='badge badge-light'>Sum Server&nbsp;{sumServer}</span>
            </span>
        )

        return (
            <div className="content">
                <MonoOrderFilters
                    onFieldChange={this.onFieldChange}
                />
                <ItemList
                    listHeader={listHeader}
                    items={visibleItems}
                    loading={loading}
                    onAutoupdateChange={this.onAutoupdateChange}
                    renderItem={RenderMonoOrderItem}
                    onItemSelected={() => {}}
                />
            </div>
        )
    }
}
