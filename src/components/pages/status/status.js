import React, { Component } from 'react';

import VodomatService from '../../../services/vodomat-service';

import StatusFilters from '../../status-filters';
import ItemList from '../../item-list';
import StatusDetail from '../../status-detail';

import './status.css';

export default class StatusPage extends Component {

    state = {
        items: [],
        loading: true,
        autoupdate: true,
        selectedAvtomatNumber: null,
        street: '',
        route: '',
        city: 'all',
        minWater: false,
        error: false
    };

    vodomatService = new VodomatService();
    updateInterval = 5 * 60 * 1000;  // 5 min

    componentDidMount() {
        this.updateStatus()
        if (this.state.autoupdate) {
            this.intervalId = setInterval(this.updateStatus, this.updateInterval)
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.autoupdate !== this.state.autoupdate) {
            clearInterval(this.intervalId)
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateStatus, this.updateInterval)
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
            selectedAvtomatNumber: !this.state.selectedAvtomatNumber ?
                                    items[0].avtomatNumber :
                                    this.state.selectedAvtomatNumber
        })
    }

    updateStatus = () => {
        this.vodomatService
            .getAllStatuses()
            .then(this.onItemsLoaded)
    }

    onStatusSelected = (avtomatNumber) => {
        this.setState({
            selectedAvtomatNumber: avtomatNumber
        })
    }

    onRouteChange = (route) => {
        this.setState({ route })
    }

    routeItems = (items, route) => {
        if (route.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.carNumber ? item.carNumber.indexOf(route) > -1 : false
        })
    }

    onStreetChange = (street) => {
        this.setState({ street })
    }

    streetItems = (items, street) => {
        if (street.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.street ? item.street.toLowerCase().indexOf(street.toLowerCase()) > -1 : false;
        })
    }

    onCityChange = (city) => {
        this.setState({city})
    }

    cityItems = (items, city) => {
        if (city === 'all') {
            return items;
        }
        return items.filter((item) => {
            return item.city ? item.city === city : false;
        })
    }

    onMinWaterClick = (state) => {
        this.setState({
            minWater: state
        })
    }

    minWaterItems = (items, state) => {
        if (!state) {
            return items
        } else {
            return items.filter((item) => {
                return item.water < 50
            })
        }
    }

    onErrorClick = (state) => {
        this.setState({
            error: state
        })
    }

    errorItems = (items, state) => {
        if (!state) {
            return items
        } else {
            return items.filter((item) => {
                return item.lowWaterBalance || item.errorVolt || item.errorBill || item.errorCounter || item.errorRegister
            })
        }
    }

    onAutoupdateChange = (state) => {
        this.setState({
            autoupdate: state
        })
    }

    renderStatusItem = (item) => {
        const { city, street, house, size } = item;

        const { lowWaterBalance, errorVolt, errorBill, errorCounter, errorRegister } = item;

        const waterIconColor = item.water > 50 ? {color: "#008891"} : {color: "tomato"}

        return (
            <div className="d-flex">
                <div className="pr-4">{item.avtomatNumber}</div>

                <div className="flex-grow-1">
                    {`${street} ${house} `}
                    <small className="pr-4">({city})</small>
                    <i className="fas fa-tint" style={waterIconColor}>
                        &nbsp;{Math.round(item.water)}
                        &nbsp;<small>({size})</small>
                    </i>
                </div>

                <div>{lowWaterBalance || errorVolt || errorBill || errorCounter || errorRegister ?
                       <span className="text-danger">Error</span> :
                       null}
                </div>
            </div>
        )
    }

    render() {

        const { items, selectedAvtomatNumber, street, route, city, minWater, error } = this.state;

        const cities = items ? [...new Set(items.map((item) => item.city))].sort() : []

        const visibleItems = items ?
                             this.streetItems(
                                 this.routeItems(
                                     this.cityItems(
                                         this.minWaterItems(
                                             this.errorItems(items, error),
                                             minWater),
                                         city),
                                     route),
                                 street) :
                             [];

        return (
            
                <div className="statusPage">

                    <div className="content row">

                        <div className="col-md-7 pr-0 left-block">
                            <ItemList
                                listHeader="Statuses"
                                items={visibleItems}
                                loading={this.state.loading}
                                onAutoupdateChange={this.onAutoupdateChange}
                                renderItem={this.renderStatusItem}
                                onItemSelected={this.onStatusSelected}
                            />
                        </div>

                        <div className="col-md-5 right-block">
                            <StatusFilters
                                onStreetChange={this.onStreetChange}
                                onRouteChange={this.onRouteChange}
                                onCityChange={this.onCityChange}
                                onMinWaterClick={this.onMinWaterClick}
                                onErrorClick={this.onErrorClick}
                                cities={cities} />
                            <StatusDetail avtomatNumber={selectedAvtomatNumber} />
                        </div>

                    </div>

                </div>
            
        );
    }
}
