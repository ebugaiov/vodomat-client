import React, { Component } from 'react';

import ItemList from '../item-list';

import VodomatService from '../../services/vodomat-service';

import CollectionFilters from '../collection-filters';
import RenderCollectionItem from '../render-collection-item';

export default class TestPage extends Component {

    vodomatService = new VodomatService();
    updateInterval = 5 * 60 * 1000;

    state = {
        items: [],
        loading: true,
        autoupdate: true,
        date: '',
        carNumber: '',
        avtomatNumber: '',
        street: '',
    }

    componentDidMount() {
        this.updateCollections()
        if (this.state.autoupdate) {
            this.intervalId = setInterval(this.updateCollections, this.updateInterval)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.date !== this.state.date) {
            this.setState({
                items: [],
                loading: true
            })
            clearInterval(this.intervalId)
            this.updateCollections()
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateCollections, this.updateInterval)
            }
        }

        if (prevState.autoupdate !== this.state.autoupdate) {
            clearInterval(this.intervalId)
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateCollections, this.updateInterval)
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

    updateCollections = () => {
        this.vodomatService
            .getCollections(this.state.date)
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
            return item.avtomatNumber ? item.avtomatNumber.toString().indexOf(avtomatNumber.toString()) > -1 : false
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

    render() {

        const { items, loading } = this.state;
        const { carNumber, avtomatNumber, street } = this.state;
        const carNumbers = items ? [...new Set(items.map((item) => item.carNumber))] : [];

        const visibleItems = items ?
                             this.avtomatNumberItems(
                                 this.inputFieldItems(
                                     this.inputFieldItems(items, 'street', street),
                                     'carNumber', carNumber
                                 ),
                                 avtomatNumber
                             ) : [];

        const sumVisible = visibleItems.reduce((sum, item) => {
            const moneyApp = item.moneyApp ? item.moneyApp : 0;
            sum += item.money + moneyApp
            return Math.round((sum + Number.EPSILON) * 100) / 100;
        }, 0)

        const listHeader = (
            <span>
                Collections
                <span className='badge badge-light ml-2'>Count&nbsp;{visibleItems.length}</span>
                <span className="badge badge-light ml-2">Sum&nbsp;{sumVisible}</span>
            </span>
        )

        return (
            <div className='content'>
                <CollectionFilters
                    onFieldChange={this.onFieldChange}
                    carNumbers={carNumbers}
                />
                <ItemList
                    listHeader={listHeader}
                    items={visibleItems}
                    loading={loading}
                    onAutoupdateChange={this.onAutoupdateChange}
                    renderItem={RenderCollectionItem}
                    onItemSelected={() => {}}
                />
            </div>
        )
    }
}
