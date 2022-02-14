import React, { Component } from 'react';

import './orders.css';

import OrderFilters from '../../order-filters';
import ItemList from '../../item-list';
import RenderOrderItem from '../../render-order-item';
import ReturnButton from '../../return-button';

import PayService from '../../../services/pay-service';

export default class OrdersPage extends Component {

    payService = new PayService();
    updateInterval = 5 * 60 * 1000;  // 5 min

    state = {
        items: [],
        loading: true,
        autoupdate: true,
        date: new Date().toISOString().substring(0, 10),
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
        const { items, loading, avtomatNumber, address, errorButton, returnButton, date } = this.state;

        const countOrders = items.filter((item) => {
            return item.payGateStatus === 'PAYED'
        }).length

        const sumPayGate = items.reduce((sum, item) => {
            if (item.payGateStatus === 'PAYED' && item.serverStatus !== 2) {
                sum += item.payGateMoney
            }
            return Math.round((sum + Number.EPSILON) * 100) / 100;
        }, 0)

        const sumServer = items.reduce((sum, item) => {
            if (item.serverStatus === 1) {
                sum += item.serverMoney
            }
            return Math.round((sum + Number.EPSILON) * 100) / 100;
        }, 0)

        const errorOrders = items.filter((item) => {
            return item.error
        })

        const listHeader = (
            <span>
                Orders
                <span className='badge badge-light ml-2 mr-2'>Count&nbsp;{countOrders}</span>
                <span className='badge badge-light mr-2'>Sum PayGate&nbsp;{sumPayGate}</span>
                <span className='badge badge-light mr-2'>Sum Server&nbsp;{sumServer}</span>
                <ReturnButton itemsToReturn={errorOrders}/>
            </span>
        )

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