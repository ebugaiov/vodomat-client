import React, { Component } from 'react';

import './statistic-lines.css';

import StatisticLinesFilters from '../../statistic-lines-filters';
import ItemList from '../../item-list';
import RenderStatisticLine from '../../render-statistic-line';

import VodomatService from '../../../services/vodomat-service';

export default class StatisticLinesPage extends Component {

    vodomatService = new VodomatService();

    state = {
        updateData: false,
        avtomatAddress: '',
        items: [],
        loading: false,
        avtomatNumber: '',
        startPeriod: new Date().toISOString().substring(0, 10),
        endPeriod: new Date().toISOString().substring(0, 10),
        collectionsButton: false,
        eventsButton: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.updateData !== this.state.updateData) {
            if (this.state.updateData) {
                this.setState({
                    avtomatAddress: '',
                    items: [],
                    loading: true
                })
                this.updateAvtomatAddress()
                this.updateStatisticLines()
            }
        }
    }

    onItemsLoaded = (items) => {
        this.setState({
            items,
            loading: false,
            updateData: false
        })
    } 

    updateStatisticLines = () => {
        this.vodomatService
            .getStatisticLines(this.state.avtomatNumber, this.state.startPeriod, this.state.endPeriod)
            .then(this.onItemsLoaded)
    }

    updateAvtomatAddress = () => {
        this.vodomatService
            .getAvtomat(this.state.avtomatNumber)
            .then((avtomat) => {
                const address = `${avtomat.street} ${avtomat.house}`
                this.setState({
                    avtomatAddress: address
                })
            })
    }

    onFieldChange = (field, value) => {
        this.setState({[field]: value})
    }

    onButtonClick = (buttonName, state) => {
        this.setState({[buttonName]: state})
    }

    collectionsButtonItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return item.event === 3;
        })
    }

    eventsButtonItems = (items, state) => {
        if (!state) {
            return items;
        }
        return items.filter((item) => {
            return item.event !== 6 && item.event !== 3;
        })
    }

    render() {
        const { items, loading, avtomatAddress } = this.state;
        const { collectionsButton, eventsButton } = this.state;

        const visibleItems = items ?
                             this.collectionsButtonItems(
                                 this.eventsButtonItems(items, eventsButton),
                                 collectionsButton
                             ) : []

        const loadedLineHeader = (
            <span>
                { avtomatAddress }
                <span className='badge badge-light ml-2'>
                    Count&nbsp;{ visibleItems.length }
                </span>
                <span className='badge badge-warning ml-2'>
                    Collections&nbsp;{ visibleItems.filter((item) => {
                        return item.event === 3;
                    }).length }
                </span>
                <span className="badge badge-info ml-2">
                    Other Events&nbsp;{ visibleItems.filter((item) => {
                        return item.event !== 6 && item.event !== 3;
                    }).length }
                </span>
            </span>
        )
        
        const lineHeader = avtomatAddress ? loadedLineHeader : 'Select Period and Avtomat Number'

        return (
            <div className="content">
                <StatisticLinesFilters 
                    onFieldChange={this.onFieldChange}
                    onButtonClick={this.onButtonClick}
                />
                
                <ItemList
                    listHeader={lineHeader}
                    items={visibleItems}
                    loading={loading}
                    renderItem={RenderStatisticLine}
                    onItemSelected={() => {}}
                />
            </div>
        )
    }
}