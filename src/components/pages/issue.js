import React, { Component } from 'react';

import Row from '../row';
import ItemList from '../item-list';
import IssueFilters from '../issue-filters';
import IssueDetail from '../issue-detail';

import PayService from '../../services/pay-service';

export default class IssuePage extends Component {

    state = {
        items: [],
        loading: true,
        autoupdate: true,
        startPeriod: new Date().toISOString().substring(0, 10),
        endPeriod: new Date().toISOString().substring(0, 10),
        address: '',
        avtomatNumber: null,
        selectedIssueId: null,
        commented: false
    }

    payService = new PayService();
    updateInterval = 5 * 60 * 1000;

    onItemsLoaded = (items) => {
        this.setState({
            items,
            loading: false,
            selectedIssueId: !this.state.selectedIssueId ?
                     items[0] ? items[0].id : null :
                     this.state.selectedIssueId
        })
    }

    updateIssue = () => {
        this.payService
            .getIssuesPeriod(this.state.startPeriod, this.state.endPeriod)
            .then(this.onItemsLoaded)
    }

    componentDidMount() {
        this.updateIssue()
        if (this.state.autoupdate) {
            this.intervalId = setInterval(this.updateIssue, this.updateInterval)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.startPeriod !== this.state.startPeriod || 
            prevState.endPeriod !== this.state.endPeriod ||
            this.state.commented) {
                this.setState({
                    loading: true,
                    items: [],
                    commented: false
                })
                this.updateIssue()
                clearInterval(this.intervalId)
                if (this.state.autoupdate) {
                    this.intervalId = setInterval(this.updateIssue, this.updateInterval)
                }
        }
        if (prevState.autoupdate !== this.state.autoupdate) {
            clearInterval(this.intervalId)
            if (this.state.autoupdate) {
                this.intervalId = setInterval(this.updateIssue, this.updateInterval)
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    renderIssueItem = (item) => {

        const { avtomatNumber, address, createdAt, issue, comment } = item;
        const processedIcon = comment ? <i className="fas fa-check"></i> : null;
        const issueStr = issue.length > 20 ? `${issue.slice(0, 20)} ...` : issue;

        return (
            <div className="d-flex justify-content-between">
                <div>
                    <span className="pr-4 text-info">{avtomatNumber}</span>
                    <span className="pr-4">{ address }</span>
                    <small>{createdAt.slice(4, 25)}</small>
                </div>
                <div>
                    <span>{ processedIcon } { issueStr }</span>
                </div>
            </div>
        )
    }

    onIssueSelected = (id) => {
        this.setState({
            selectedIssueId: id
        })
    }

    onAutoupdateChange = (state) => {
        this.setState({
            autoupdate: state
        })
    }

    onCommented = () => {
        this.setState({commented: true})
    }

    onFieldChange = (field, value) => {
        this.setState({
            [field]: value
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

    avtomatNumberItems = (items, avtomatNumber) => {
        if (!avtomatNumber) {
            return items
        }
        const avtomatNumberString = avtomatNumber.toString()
        if (avtomatNumberString.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.avtomatNumber ? item.avtomatNumber.toString().indexOf(avtomatNumberString) > -1 : false;
        })
    }

    render() {

        const { items, loading, startPeriod, endPeriod, avtomatNumber, address } = this.state;

        const visibleItems = items ?
                             this.avtomatNumberItems(
                                 this.addressItems(items, address),
                                 avtomatNumber)
                             : []

        return (
            <Row 
                left={
                    <ItemList
                        listHeader="Issues"
                        items={visibleItems}
                        loading={loading}
                        onAutoupdateChange={this.onAutoupdateChange}
                        renderItem={this.renderIssueItem}
                        onItemSelected={this.onIssueSelected}
                    />
                }
                right={
                    <React.Fragment>
                        <IssueFilters
                            onFieldChange={this.onFieldChange}
                            startPeriod={startPeriod}
                            endPeriod={endPeriod}
                        />
                        <IssueDetail issueId={this.state.selectedIssueId} onCommented={this.onCommented} />
                    </React.Fragment>
                }
            />
        )
    }
}