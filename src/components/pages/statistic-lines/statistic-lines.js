import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import './statistic-lines.css';

import StatisticLinesFilters from '../../statistic-lines-filters';
import ItemList from '../../item-list';
import RenderStatisticLine from '../../render-statistic-line';

import VodomatService from '../../../services/vodomat-service';

class StatisticLinesPage extends Component {

    vodomatService = new VodomatService();
    threeDaysAgo = new Date() - 1000 * 60 * 60 * 24 * 2;

    state = {
        updateData: false,
        avtomatAddress: '',
        items: [],
        loading: false,
        avtomatNumber: '',
        startPeriod: new Date(this.threeDaysAgo).toISOString().substring(0, 10),
        endPeriod: new Date().toISOString().substring(0, 10),
        collectionsButton: false,
        eventsButton: false
    }

    componentDidMount() {
        const avtomatNumber = this.props.match.params.avtomatNumber;
        if (avtomatNumber) {
            this.setState({
                avtomatNumber,
                updateData: true
            })
        }
        const query_params = queryString.parse(this.props.location.search);
        if (query_params.start_period && query_params.end_period) {
            this.setState({
                startPeriod: query_params.start_period,
                endPeriod: query_params.end_period
            })
        }
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
                const address = `${avtomat.city} ${avtomat.street} ${avtomat.house}`
                this.setState({
                    avtomatAddress: address,
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

    copyToClipboard = (str) => {
        console.log(this.props.location)
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

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
                <span
                    onMouseDown={(e) => {
                        e.target.className = 'pressedAvtomatAddressSpan';
                        this.copyToClipboard(avtomatAddress);
                    }}
                    onMouseUp={(e) => {
                        setTimeout(() => e.target.className = 'avtomatAddressSpan', 500)
                    }}
                    className='avtomatAddressSpan'
                >
                    { avtomatAddress }
                </span>
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

export default withRouter(StatisticLinesPage);
