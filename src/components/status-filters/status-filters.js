import React, { Component } from 'react';

import './status-filters.css';

export default class StatusFilters extends Component {

    state = {
        noErrorButton: false,
        errorButton: false,
        lowWaterButton: false,
        noLowWaterButton: false,
        noConnectionButton: false,
        avtomatNumber: '',
        street: '',
        city: '',
        carNumber: '',
        withCarCheckBox: true
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

    render() {

        const { avtomatNumber, street, city, carNumber } = this.state;
        const { noErrorButton, errorButton, lowWaterButton, noLowWaterButton } = this.state;
        const { noConnectionButton } = this.state;
        const { withCarCheckBox } = this.state;
        const { carNumbers, cities } = this.props;

        const setButtonClassName = (buttonState) => {
            const buttonClassName = "btn btn-outline-secondary"
            return !buttonState ? buttonClassName : buttonClassName + " active"
        }

        return (
            <div className="form-row mb-2 ml-2 mr-2">
                <div className='col btn-group status-errors-button'>
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
                        data-toggle="tooltip" title="Not Low Water Balance"
                    >
                        <i className="fas fa-tint"></i>
                    </button>
                    <button type='button'
                        className={setButtonClassName(noConnectionButton)}
                        onClick={() => this.onButtonClick('noConnectionButton')}
                        data-toggle="tooltip" title="No Data from Avtomat"
                    >
                        <i className="fas fa-bell-slash"></i>
                    </button>
                </div>
                <div className='col'>
                    <input type="text" className="form-control" placeholder="Avtomat Number"
                           value={avtomatNumber}
                           onChange={(event) => this.onFieldChange(event, 'avtomatNumber')}
                    />
                </div>
                <div className='col'>
                    <input type="text" className="form-control" placeholder="Street"
                           value={street}
                           onChange={(event) => this.onFieldChange(event, 'street')}
                    />
                </div>
                <div className="col">
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
                            <label className="form-check-label">With Car</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
