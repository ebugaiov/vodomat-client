import React, { Component } from 'react';

import VodomatService from '../../../services/vodomat-service';

import Header from '../../header';
import Footer from '../../footer';
import Spinner from '../../spinner';
import StatusFilters from '../../status-filters';
import ItemList from '../../item-list';
import ItemDetail from '../../item-detail';

import './status.css';

export default class StatusPage extends Component {

    state = {
        items: null,
        selectedAvtomatNumber: null,
        street: '',
        route: '',
        city: 'all',
        minWater: false,
        error: false
    };

    vodomatService = new VodomatService();

    componentDidMount() {
        this.vodomatService
            .getAllStatuses()
            .then((items) => {
                this.setState({
                    items,
                    selectedAvtomatNumber: items[0].avtomatNumber
                })
            });
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

    renderStatusItem = (item) => {
        const { city, street, house } = item;
        const { lowWaterBalance, errorVolt, errorBill, errorCounter, errorRegister } = item;

        const waterIconColor = item.water > 50 ? {color: "#008891"} : {color: "tomato"}

        return (
            <div className="d-flex">
                <div className="pr-4">{item.avtomatNumber}</div>

                <div className="flex-grow-1">
                    {`${street} ${house} `}
                    <small className="pr-4">({city})</small>
                    <i className="fas fa-tint" style={waterIconColor}> {Math.round(item.water)}</i>
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

        const cities = items ? [...new Set(items.map((item) => item.city))] : []
        
        const visibleItems = items ?
                             <ItemList
                                items={this.streetItems(
                                            this.routeItems(
                                                this.cityItems(
                                                    this.minWaterItems(
                                                        this.errorItems(items, error),
                                                        minWater),
                                                    city),
                                                route),
                                            street)}
                                renderItem={this.renderStatusItem}
                                onItemSelected={this.onStatusSelected}
                             /> :
                             <Spinner />;

        return (
            <div className="statusPage">
                <Header />

                <div className="content row">
                    <div className="col-md-8 pr-0">
                        { visibleItems }
                    </div>
                    <div className="col-md-4">
                        <StatusFilters
                            onStreetChange={this.onStreetChange}
                            onRouteChange={this.onRouteChange}
                            onCityChange={this.onCityChange}
                            onMinWaterClick={this.onMinWaterClick}
                            onErrorClick={this.onErrorClick}
                            cities={cities} />
                        <ItemDetail avtomatNumber={selectedAvtomatNumber} />
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
