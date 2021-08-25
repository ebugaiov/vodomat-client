import React, { Component } from 'react';

import VodomatService from '../../services/vodomat-service';

import Row from '../row';
import ItemList from '../item-list';
import DepositFilters from '../deposit-filters';
import DepositDetail from '../deposit-detail';

export default class DepositPage extends Component {

    state = {
        items: [],
        selectedPurchaseId: null,
        loading: true,
        autoupdate: true,
        date: null,
        avtomatNumber: null,
        street: '',
        purchaseId: '',
        errorsButton: false,
        returnButton: false
    }

    vodomatService = new VodomatService()
    updateInterval = 5 * 60 * 1000;  // 5 min

    componentDidMount() {
        this.updateDeposit()
        if (this.state.autoupdate) {
            this.intervalId = setInterval(this.updateDeposit, this.updateInterval)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.date !== this.state.date) {
            this.setState({
                loading: true,
                items: []
            })
            this.updateDeposit()
            clearInterval(this.intervalId)
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateDeposit, this.updateInterval)
            }
        }
        if (prevState.autoupdate !== this.state.autoupdate) {
            clearInterval(this.intervalId)
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateDeposit, this.updateInterval)
            }
        }
        
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    onItemsLoaded = (items) => {
        this.setState({
            items,
            loading: false,
            selectedPurchaseId: !this.state.selectedPurchaseId ?
                                items[0].purchaseId :
                                this.state.selectedPurchaseId
        })
    }

    updateDeposit = () => {
        this.vodomatService
            .getDeposits(this.state.date)
            .then(this.onItemsLoaded)
    }

    onAutoupdateChange = (state) => {
        this.setState({
            autoupdate: state
        })
    }

    renderDepositItem = (item) => {

        const { avtomatNumber, city, street, house } = item;
        const { purchaseId, timePaymentGateway, billAmount, statusPaymentGateway } = item;
        let statusPaymentGatewayClass = 'pr-3';

        switch (statusPaymentGateway) {
            case 'PAYED':
                statusPaymentGatewayClass += ' text-success';
                break;
            case 'REJECTED':
                statusPaymentGatewayClass += ' text-warning';
                break;
            case 'RETURN':
                statusPaymentGatewayClass += ' text-danger';
                break;
            case 'CREATED':
                statusPaymentGatewayClass += ' text-dark';
                break;
            default:
                statusPaymentGatewayClass += '';
        }

        const avtomatDiv = city ? 
            (
                <div>
                    <span className="pr-4">{avtomatNumber}</span>
                    {`${street} ${house} `}
                </div>
            ) : <i className="fas fa-ban text-danger"></i>

        const attentionDiv = !avtomatNumber && statusPaymentGateway === 'PAYED' ?
            (
                <div className="text-danger">
                    <i className="fas fa-exclamation"></i>&nbsp;
                    <i className="fas fa-exclamation"></i>&nbsp;
                    <i className="fas fa-exclamation"></i>&nbsp;
                </div>
            ) : <div></div>

        const paymentGatewayDiv = purchaseId ?
            (
                <div className="row">
                    <span className="pr-4">{timePaymentGateway.split(' ')[1]}</span>
                    <span className="pr-4"><i className="fas fa-coins"></i>&nbsp;{billAmount}</span>
                    <span className={statusPaymentGatewayClass}>{statusPaymentGateway}</span>
                </div>
            ) : <div></div>

        return (
            <div className="d-flex justify-content-between"
                 title={`Purchase Id: ${purchaseId}`}>
                    { avtomatDiv }
                    { attentionDiv }
                    { paymentGatewayDiv }
            </div>
        )
    }

    onDepositSelected = (id) => {
        this.setState({
            selectedPurchaseId: id
        })
    }

    onDateChange = (date) => {
        this.setState({
            date
        })
    }

    onAvtomatNumberChange = (avtomatNumber) => {
        this.setState({avtomatNumber})
    }

    avtomatNumberItems = (items, avtomatNumber) => {
        if (!avtomatNumber) {
            return items;
        }
        const avtomatNumberStr = avtomatNumber.toString()
        if (avtomatNumberStr.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.avtomatNumber ? item.avtomatNumber.toString().indexOf(avtomatNumberStr) > -1 : false;
        })
    }

    onStreetChange = (street) => {
        this.setState({street})
    }

    streetItems = (items, street) => {
        if (street.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.street ? item.street.toLowerCase().indexOf(street.toLowerCase()) > -1 : false;
        })
    }

    onPurchaseIdChange = (purchaseId) => {
        this.setState({purchaseId})
    }

    purchaseIdItems = (items, purchaseId) => {
        if (purchaseId.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.purchaseId.indexOf(purchaseId) > -1;
        })
    }

    onErrorsButtonClick = (state) => {
        this.setState({
            errorsButton: state
        })
    }

    errorsItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return !item.avtomatNumber && item.statusPaymentGateway === 'PAYED';
        })
    }

    onReturnButtonClick = (state) => {
        this.setState({
            returnButton: state
        })
    }

    returnItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return item.statusPaymentGateway === 'RETURN';
        })
    }

    render() {

        const { items, avtomatNumber, street, purchaseId, errorsButton, returnButton } = this.state;

        const sumOfDeposits = items.reduce((sum, item) => {
            if (item.statusPaymentGateway === 'PAYED') {
                sum += +item.billAmount
            } else if (item.statusPaymentGateway === 'RETURN') {
                sum -= +item.billAmount
            }
            return Math.round((sum + Number.EPSILON) * 100) / 100;
        }, 0)

        const averageDeposit = Math.round(
            (items.reduce((sum, item) => {
                if (item.statusPaymentGateway === 'PAYED') {
                    sum += +item.billAmount;
                }
                return Math.round((sum + Number.EPSILON) * 100) / 100
            }, 0) /
            items.filter((item) => {
                return item.statusPaymentGateway === 'PAYED'
            }).length + Number.EPSILON) * 100) / 100

        const countDeposits = items.filter((item) => {
            return item.statusPaymentGateway === 'PAYED'
        }).length
        
        const listHeader = <span>Deposits (
                                 <small>
                                     All: {sumOfDeposits},&nbsp;
                                     Average: {averageDeposit ? averageDeposit : 0},&nbsp;
                                     Count: {countDeposits}
                                 </small>)
                            </span>

        const visibleItems = items ? 
                             this.avtomatNumberItems(
                                 this.streetItems(
                                     this.purchaseIdItems(
                                         this.errorsItems(
                                             this.returnItems(items, returnButton),
                                             errorsButton),
                                         purchaseId),
                                     street),
                                 avtomatNumber) :
                             [];

        return (
            
            <Row
                left={
                    <ItemList
                        listHeader={listHeader}
                        items={visibleItems}
                        loading={this.state.loading}
                        onAutoupdateChange={this.onAutoupdateChange}
                        renderItem={this.renderDepositItem}
                        onItemSelected={this.onDepositSelected}
                    />
                }
                right={
                    <React.Fragment>
                        <DepositFilters
                            onDateChange={this.onDateChange}
                            onAvtomatNumberChange={this.onAvtomatNumberChange}
                            onStreetChange={this.onStreetChange}
                            onPurchaseIdChange={this.onPurchaseIdChange}
                            onErrorsButtonClick={this.onErrorsButtonClick}
                            onReturnButtonClick={this.onReturnButtonClick}
                        />
                        <DepositDetail purchaseId={this.state.selectedPurchaseId}/>
                    </React.Fragment>
                }
            />
        )
    }
}
