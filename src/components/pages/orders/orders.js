import React, { Component } from 'react';

import './orders.css';

import OrderFilters from '../../order-filters';
import ItemList from '../../item-list';
import RenderOrderItem from '../../render-order-item';

import PayService from '../../../services/pay-service';

export default class OrdersPage extends Component {

    payService = new PayService();
    updateInterval = 5 * 60 * 1000;  // 5 min

    state = {
        items: [],
        loading: true,
        autoupdate: true,
        date: '',
        avtomatNumber: '',
        address: '',
        errorButton: false,
        returnButton: false
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
            .getOrders(this.state.date)
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

    onButtonClick = (buttonName, state) => {
        this.setState({[buttonName]: state})
    }

    errorItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return item.error;
        })
    }

    returnItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return item.payGateStatus === 'RETURN';
        })
    }

    render() {
        const { items, loading, avtomatNumber, address, errorButton, returnButton } = this.state;

        const countOrders = items.filter((item) => {
            return item.payGateStatus === 'PAYED'
        }).length

        const listHeader = <span>Orders<span className='badge badge-light ml-2'>{countOrders}</span></span>

        const visibleItems = items ?
                             this.avtomatNumberItems(
                                 this.addressItems(
                                     this.errorItems(
                                         this.returnItems(items, returnButton),
                                         errorButton
                                     ),
                                 address
                                 ),
                             avtomatNumber
                             ) : []

        return (
            <div className="content">
                <OrderFilters
                    onFieldChange={this.onFieldChange}
                    onButtonClick={this.onButtonClick}
                />
                <ItemList
                    listHeader={listHeader}
                    items={visibleItems}
                    loading={loading}
                    onAutoupdateChange={this.onAutoupdateChange}
                    renderItem={RenderOrderItem}
                    onItemSelected={() => {}}
                />
            </div>
        )
    }
}