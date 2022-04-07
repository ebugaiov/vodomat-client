import React, { Component } from 'react';

import './statuses.css';

import StatusFilters from '../../status-filters';
import ItemList from '../../item-list';
import RenderStatusItem from '../../render-status-item';

import VodomatService from '../../../services/vodomat-service';

export default class StatusesPage extends Component {

    vodomatService = new VodomatService();
    updateInterval = 5 * 60 * 1000;  // 5 min

    state = {
        items: [],
        loading: true,
        autoupdate: true,
        noErrorButton: false,
        errorButton: false,
        lowWaterButton: false,
        noLowWaterButton: false,
        noConnectionButton: false,
        connectionButton: false,
        waterLevelUp: false,
        waterLevelDown: false,
        avtomatNumber: '',
        street: '',
        city: '',
        carNumber: '',
        withCarCheckBox: true,
        waterLevel: '',
        sortByAddress: true,
        sortByRoute: false,
        sortByBillNotWork: false,
        sortByCoinNotWork: false,
        sortByRegisterNotWork: false,
    }

    componentDidMount() {
        this.updateStatuses()
        if (this.state.autoupdate) {
            this.intervalId = setInterval(this.updateStatuses, this.updateInterval)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.autoupdate !== this.state.autoupdate) {
            clearInterval(this.intervalId)
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateStatuses, this.updateInterval)
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

    updateStatuses = () => {
        this.vodomatService
            .getAllStatuses()
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

    inputFieldItems = (items, fieldName, inputStr) => {
        if (inputStr.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item[fieldName] ? item[fieldName].toLowerCase().indexOf(inputStr.toLowerCase()) > -1 : false;
        })
    }

    onButtonClick = (buttonName, state) => {
        this.setState({[buttonName]: state})
    }

    noErrorItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return !item.errorVolt && !item.errorBill && !item.errorCounter && !item.errorRegister;
        })
    }

    errorItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return item.errorVolt || item.errorBill || item.errorCounter || item.errorRegister || item.cashBox;
        })
    }

    lowWaterItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return item.lowWaterBalance;
        })
    }

    noLowWaterItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return !item.lowWaterBalance;
        })
    }

    noConnectionItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            const now = new Date();
            return new Date(item.time).getTime() < now.setHours(now.getHours() - 2);
        })
    }

    connectionItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            const now = new Date();
            return new Date(item.time).getTime() > now.setHours(now.getHours() - 8);
        })
    }

    withCarItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return item.carNumber;
        })
    }

    waterLevelItems = (items, waterLevel, waterLevelUp, waterLevelDown) => {
        if (waterLevel.length === 0 || (!waterLevelUp && !waterLevelDown)) {
            return items;
        }
        if (waterLevelUp) {
            return items.filter((item) => {
                return item.water > parseInt(waterLevel);
            })
        }
        if (waterLevelDown) {
            return items.filter((item) => {
                return item.water < waterLevel;
            })
        }
    }

    render() {
        const { items, loading } = this.state;
        const { noErrorButton, errorButton, lowWaterButton, noLowWaterButton } = this.state;
        const { noConnectionButton, connectionButton } = this.state;
        const { withCarCheckBox } = this.state;
        const { avtomatNumber, street, city, carNumber } = this.state;
        const { waterLevel, waterLevelUp, waterLevelDown } = this.state;
        const { sortByAddress, sortByRoute, sortByRegisterNotWork } = this.state;
        const { sortByBillNotWork, sortByCoinNotWork } = this.state;

        const carNumbers = items ? [...new Set(items.map((item) => item.carNumber))].sort() : [];
        const cities = items ? [...new Set(items.map((item) => item.city))].sort() : [];

        if (sortByAddress) {
            items.sort((a, b) => {
                const addressA = `${a.street} ${a.house}`.toUpperCase();
                const addressB = `${b.street} ${b.house}`.toUpperCase();
                return addressA < addressB ? -1 : addressA > addressB ? 1 : 0
            })
        }
        if (sortByRoute) {
            items.sort((a, b) => {
                const routeA = `${a.routeName} ${a.street} ${a.house}`.toUpperCase();
                const routeB = `${b.routeName} ${b.street} ${b.house}`.toUpperCase();
                return routeA < routeB ? -1 : routeA > routeB ? 1 : 0
            })
        }

        if (sortByBillNotWork) {
            items.sort((a, b) => {
                return b.billNotWork - a.billNotWork
            })
        }

        if (sortByCoinNotWork) {
            items.sort((a, b) => {
                return b.coinNotWork - a.coinNotWork
            })
        }

        if (sortByRegisterNotWork) {
            items.sort((a, b) => {
                return b.timeToBlock - a.timeToBlock
            })
        }

        const visibleItems = items ?
                             this.avtomatNumberItems(
                                 this.inputFieldItems(
                                    this.inputFieldItems(
                                        this.inputFieldItems(
                                            this.noErrorItems(
                                                this.errorItems(
                                                    this.lowWaterItems(
                                                        this.noLowWaterItems(
                                                            this.noConnectionItems(
                                                                this.connectionItems(
                                                                    this.withCarItems(
                                                                        this.waterLevelItems(items, waterLevel, waterLevelUp, waterLevelDown),
                                                                        withCarCheckBox
                                                                        ),
                                                                    connectionButton
                                                                    ),
                                                                noConnectionButton
                                                                ),
                                                            noLowWaterButton
                                                            ),
                                                        lowWaterButton
                                                        ),
                                                    errorButton
                                                    ),
                                                noErrorButton   
                                                ),
                                            'carNumber', carNumber
                                            ),
                                        'city', city
                                        ),
                                    'street', street
                                    ),
                                avtomatNumber
                             ) : []

        const countLowWaterItems = items.filter((item) => {
            return item.lowWaterBalance
        }).length

        const listHeader = (
            <span>
                Status
                <span className='badge badge-light ml-2 mr-2'>
                    All&nbsp;{items.length}
                </span>
                <span className='badge badge-light mr-2'>
                    Selected&nbsp;{visibleItems.length}
                </span>
                <span className='badge badge-danger'>
                    Low Water&nbsp;{countLowWaterItems}
                </span>
            </span>
        )

        return (
            <div className="content">

                <StatusFilters
                    onFieldChange={this.onFieldChange}
                    onButtonClick={this.onButtonClick}
                    carNumbers={carNumbers}
                    cities={cities}
                />
                
                <ItemList
                    listHeader={listHeader}
                    items={visibleItems}
                    loading={loading}
                    onAutoupdateChange={this.onAutoupdateChange}
                    renderItem={RenderStatusItem}
                    onItemSelected={() => {}}
                />
            </div>
        )
    }
}