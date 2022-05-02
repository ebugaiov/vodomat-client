import React, { Component } from 'react';

import './status-filters.css';

export default class StatusFilters extends Component {

    state = {
        noErrorButton: false,
        errorButton: false,
        lowWaterButton: false,
        noLowWaterButton: false,
        noConnectionButton: false,
        connectionButton: false,
        stateUndefinedButton: false,
        stateNormalButton: false,
        stateNoVoltButton: false,
        stateCrashedButton: false,
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
        sortByBills: false,
        sortbyCoins: false,
        sortByBillNotWork: false,
        sortByCoinNotWork: false,
        sortByRegisterNotWork: false,
    }

    onFieldChange = (event, field) => {
        this.setState({[field]: event.target.value})
        this.props.onFieldChange(field, event.target.value)
    }

    onButtonClick = (clickedButtonName, otherButtonName=null) => {
        this.setState((state) => {
            this.props.onButtonClick(clickedButtonName, !state[clickedButtonName])
            if (!otherButtonName || !state[otherButtonName]) {
                return { [clickedButtonName]: !state[clickedButtonName] }
            } else if (!state[clickedButtonName] && state[otherButtonName]) {
                this.props.onButtonClick(otherButtonName, false)
                return {
                    [clickedButtonName]: true,
                    [otherButtonName]: false
                }
            }
        })
    }

    onSortSelect = (selected) => {
        Object.keys(this.state).forEach((key) => {
            if (key.startsWith('sort')) {
                this.setState({[key]: false})
                this.props.onButtonClick(key, false)
            }
        })
        this.setState({[selected]: true})
        this.props.onButtonClick(selected, true)
    }

    render() {

        const { avtomatNumber, street, city, carNumber } = this.state;
        const { sortByAddress, sortByRoute } = this.state;
        const { sortByBills, sortByCoins } = this.state;
        const { sortByBillNotWork, sortByCoinNotWork, sortByRegisterNotWork } = this.state;
        const { stateUndefinedButton, stateNormalButton, stateNoVoltButton, stateCrashedButton } = this.state;
        const { noErrorButton, errorButton, lowWaterButton, noLowWaterButton } = this.state;
        const { noConnectionButton, connectionButton } = this.state;
        const { withCarCheckBox } = this.state;
        const { waterLevel, waterLevelDown, waterLevelUp } = this.state;
        const { carNumbers, cities } = this.props;

        const setButtonClassName = (buttonState) => {
            const buttonClassName = "btn btn-outline-secondary"
            return !buttonState ? buttonClassName : buttonClassName + " active"
        }

        const setSortItemClassName = (sortItemState) => {
            const defaultClassName = "dropdown-item"
            return !sortItemState ? defaultClassName : defaultClassName + " active"
        }

        return (
            <div className="form-row mb-2 ml-2 mr-2">
                {/* Sort By Items */}
                <div className='mr-1'>
                    <div className="dropdown">
                        <button className='btn btn-secondary dropdown-toggle' type='button' data-toggle='dropdown'>
                            Sort By&nbsp;
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className={setSortItemClassName(sortByAddress)}
                                type="button"
                                onClick={() => this.onSortSelect('sortByAddress')}
                            >
                                Address
                            </button>
                            <button className={setSortItemClassName(sortByRoute)}
                                type="button"
                                onClick={() => this.onSortSelect('sortByRoute')}
                            >
                                Route
                            </button>
                            <button className={setSortItemClassName(sortByBills)}
                                type="button"
                                onClick={() => this.onSortSelect('sortByBills')}
                            >
                                Bills
                            </button>
                            <button className={setSortItemClassName(sortByCoins)}
                                type="button"
                                onClick={() => this.onSortSelect('sortByCoins')}
                            >
                                Coins
                            </button>
                            <button className={setSortItemClassName(sortByBillNotWork)}
                                type="button"
                                onClick={() => this.onSortSelect('sortByBillNotWork')}
                            >
                                Bill Not Work
                            </button>
                            <button className={setSortItemClassName(sortByCoinNotWork)}
                                type="button"
                                onClick={() => this.onSortSelect('sortByCoinNotWork')}
                            >
                                Coin Not Work
                            </button>
                            <button className={setSortItemClassName(sortByRegisterNotWork)}
                                type="button"
                                onClick={() => this.onSortSelect('sortByRegisterNotWork')}
                            >
                                Register Not Work
                            </button>
                        </div>
                    </div>
                </div>
                {/* State Buttons Panel */}
                <div className='col-auto btn-group status-errors-button'>
                    <button type="button"
                        className={setButtonClassName(stateUndefinedButton)}
                        onClick={() => this.onButtonClick('stateUndefinedButton')}
                        data-toggle="tooltip" title="Normal Undefined"
                    >
                        <i className="fas fa-question"></i>
                    </button>
                    <button type="button"
                        className={setButtonClassName(stateNormalButton)}
                        onClick={() => this.onButtonClick('stateNormalButton')}
                        data-toggle="tooltip" title="Normal State"
                    >
                        <i className="fas fa-check text-success"></i>
                    </button>
                    <button type="button"
                        className={setButtonClassName(stateNoVoltButton)}
                        onClick={() => this.onButtonClick('stateNoVoltButton')}
                        data-toggle="tooltip" title="No Volt State"
                    >
                        <i className="fas fa-bolt text-warning"></i>
                    </button>
                    <button type="button"
                        className={setButtonClassName(stateCrashedButton)}
                        onClick={() => this.onButtonClick('stateCrashedButton')}
                        data-toggle="tooltip" title="Crashed State"
                    >
                        <i className="fas fa-trash text-danger"></i>
                    </button>
                </div>
                {/* Errors Buttons Panel */}
                <div className='col-auto btn-group status-errors-button'>
                    <button type="button"
                        className={setButtonClassName(noErrorButton)}
                        onClick={() => this.onButtonClick('noErrorButton', 'errorButton')}
                        data-toggle="tooltip" title="No Errors"
                    >
                        <i className="fas fa-exclamation-triangle text-success"></i>
                    </button>
                    <button type='button'
                        className={setButtonClassName(errorButton)}
                        onClick={() => this.onButtonClick('errorButton', 'noErrorButton')}
                        data-toggle="tooltip" title="With Errors"
                    >
                        <i className="fas fa-exclamation-triangle text-danger"></i>
                    </button>
                    <button type='button'
                        className={setButtonClassName(lowWaterButton)}
                        onClick={() => this.onButtonClick('lowWaterButton', 'noLowWaterButton')}
                        data-toggle="tooltip" title="Low Water Balance"
                    >
                        <i className="fas fa-tint-slash"></i>
                    </button>
                    <button type="button"
                        className={setButtonClassName(noLowWaterButton)}
                        onClick={() => this.onButtonClick('noLowWaterButton', 'lowWaterButton')}
                        data-toggle="tooltip" title="Normal Water Balance"
                    >
                        <i className="fas fa-tint"></i>
                    </button>
                    <button type='button'
                        className={setButtonClassName(noConnectionButton)}
                        onClick={() => this.onButtonClick('noConnectionButton', 'connectionButton')}
                        data-toggle="tooltip" title="No Data from Avtomat"
                    >
                        <i className="fas fa-bell-slash"></i>
                    </button>
                    <button type='button'
                        className={setButtonClassName(connectionButton)}
                        onClick={() => this.onButtonClick('connectionButton', 'noConnectionButton')}
                        data-toggle="tooltip" title="Avtomat Online"
                    >
                        <i className="fas fa-bell"></i>
                    </button>
                </div>
                {/* Set Min/Max in Litres */}
                <div className="col-2 input-group">
                    <input type="number" className='form-control' placeholder='Litres'
                        value={waterLevel}
                        onChange={(event) => this.onFieldChange(event, 'waterLevel')}
                    />
                    <div className='input-group-append'>
                        <button type="button"
                            className={setButtonClassName(waterLevelUp)}
                            onClick={() => this.onButtonClick('waterLevelUp', 'waterLevelDown')}
                            data-toggle="tooltip" title='More than Inputed'
                        >
                            <i className="fas fa-arrow-up"></i>
                        </button>
                        <button type="button"
                            className={setButtonClassName(waterLevelDown)}
                            onClick={() => this.onButtonClick('waterLevelDown', 'waterLevelUp')}
                            data-toggle="tooltip" title='Less than Inputed'
                        >
                            <i className="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
                {/* Select Avtomats by Car Number */}
                <div className='col input-group'>
                    <select className="custom-select"
                            value={carNumber}
                            onChange={(event) => this.onFieldChange(event, 'carNumber')}
                    >
                        <option value="">All Cars</option>
                        { carNumbers.map((carNumber) => {
                            return <option key={carNumber} value={carNumber}>{carNumber}</option>
                        }) }
                    </select>
                    <div className="input-group-append">
                        <div className='input-group-text'>
                            <input type="checkbox"
                                checked={withCarCheckBox}
                                onChange={() => this.onButtonClick('withCarCheckBox')}
                            />&nbsp;
                            <label className="form-check-label">
                                With <i className="fas fa-car"></i>
                            </label>
                        </div>
                    </div>
                </div>
                {/* Search Avtomat by Number, Stree, City */}
                <div className='col-1'>
                    <input type="number" className="form-control" placeholder="Number"
                        value={avtomatNumber}
                        onChange={(event) => this.onFieldChange(event, 'avtomatNumber')}
                    />
                </div>
                <div className='col-1'>
                    <input type="text" className="form-control" placeholder="Street"
                        value={street}
                        onChange={(event) => this.onFieldChange(event, 'street')}
                    />
                </div>
                <div className="col-1">
                    <select className='custom-select'
                        value={city}
                        onChange={(event) => this.onFieldChange(event, 'city')}
                    >
                        <option value="">All Cities</option>
                        { cities.map((city) => {
                            return <option key={city} value={city}>{city}</option>
                        }) }
                    </select>
                </div>
            </div>
        )
    }
}
