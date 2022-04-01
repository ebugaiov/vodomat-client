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

    render() {
        const { items, loading, avtomatAddress } = this.state;
        const lineHeader = avtomatAddress ? avtomatAddress : "Select Avtomat and Period";

        return (
            <div className="content">
                <StatisticLinesFilters 
                    onFieldChange={this.onFieldChange}
                />
                
                <ItemList
                    listHeader={lineHeader}
                    items={items}
                    loading={loading}
                    renderItem={RenderStatisticLine}
                    onItemSelected={() => {}}
                />
            </div>
        )
    }
}