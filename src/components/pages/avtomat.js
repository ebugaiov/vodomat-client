import React, { Component } from 'react';

import VodomatService from '../../services/vodomat-service';

import Row from '../row';
import ItemList from '../item-list';
import AvtomatFilters from '../avtomat-filters';
import AvtomatDetail from '../avtomat-detail';

export default class AvtomatPage extends Component {
    
    state = {
        items: [],
        loading: true,
        selectedAvtomatNumber: null,
        number: '',
        street: '',
        city: '',
        route: '',
        appPayButtonPress: false,
        avtomatUpdated: false
    }

    vodomatService = new VodomatService();
    
    onItemsLoaded = (items) => {
        this.setState({
            items,
            loading: false,
            selectedAvtomatNumber: !this.state.selectedAvtomatNumber ?
                                   items[0] ? items[0].id : null :
                                   this.state.selectedAvtomatNumber
        })
    }

    updateAvtomat = () => {
        this.vodomatService
            .getAllAvtomats()
            .then(this.onItemsLoaded)
    }

    componentDidMount() {
        this.updateAvtomat()
    }

    componentDidUpdate() {
        if (this.state.avtomatUpdated) {
            this.setState({
                loading: true,
                items: [],
                avtomatUpdated: false
            })
        this.updateAvtomat()
        }
    }

    onAvtomatSelected = (number) => {
        this.setState({
            selectedAvtomatNumber: number
        })
    }

    onUpdateAvtomat = () => {
        this.setState({ avtomatUpdated: true })
    }

    onFieldChange = (field, value) => {
        this.setState({[field]: value})
    }

    numberItems = (items, number) => {
        if (!number) {
            return items
        }
        return items.filter((item) => {
            return item.id ? item.id.toString().indexOf(number) > -1 : false;
        })
    }

    stringFieldItems = (items, field, value) => {
        if (value.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item[field] ? item[field].toLowerCase().indexOf(value.toLowerCase()) > -1 : false;
        })
    }

    onAppPayButtonClick = (state) => {
        this.setState({appPayButtonPress: state})
    }

    appPayItems = (items, state) => {
        if (!state) {
            return items
        }
        return items.filter((item) => {
            return item.priceForApp
        })
    }

    renderAvtomatItem = (item) => {

        const { id, city, street, house, priceForApp } = item;
        
        return (
            <div className="d-flex justify-content-between">
                <div>
                    <span className="pr-4">{id}</span>
                    <span>{street} {house}</span>&nbsp;
                    <small>{city ? `(${city})` : ''}</small>&nbsp;
                </div>
                <div>
                    {priceForApp ? <i className="far fa-credit-card"></i> : null}
                </div>
            </div>
        )
    }

    render() {

        const { items, loading, selectedAvtomatNumber } = this.state;
        const { number, street, city, route, appPayButtonPress } = this.state;

        const visibleItems = items ?
                             this.appPayItems(
                                this.numberItems(
                                    this.stringFieldItems(
                                        this.stringFieldItems(
                                            this.stringFieldItems(items, 'carNumber', route),
                                            'city', city),
                                        'street', street),
                                    number),
                                appPayButtonPress)
                             : []
        
        const cities = items ? [...new Set(items.map((item) => item.city))].sort() : [];
        const routes = items ? [...new Set(items.map((item) => item.carNumber))].sort() : [];

        return (
            <Row
                left={
                    <ItemList
                        listHeader="Avtomats"
                        items={visibleItems}
                        loading={loading}
                        renderItem={this.renderAvtomatItem}
                        onItemSelected={this.onAvtomatSelected}
                    />
                }
                right={
                    <React.Fragment>
                        <AvtomatFilters
                            cities={cities}
                            routes={routes}
                            onFieldChange={this.onFieldChange}
                            onAppPayButtonClick={this.onAppPayButtonClick}
                        />
                        <AvtomatDetail
                            avtomatNumber={selectedAvtomatNumber}
                            onUpdateAvtomat={this.onUpdateAvtomat}/>
                    </React.Fragment>
                }
            />
        )
    }
}