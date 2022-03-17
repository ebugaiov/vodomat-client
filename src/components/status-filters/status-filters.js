import React, { Component } from 'react';

export default class StatusFilters extends Component {

    state = {
        errorButton: false,
        lowWaterButton: false,
        avtomatNumber: '',
        street: '',
        city: '',
        carNumber: ''
    }

    onFieldChange = (event, field) => {
        this.setState({[field]: event.target.value})
        this.props.onFieldChange(field, event.target.value)
    }

    onErrorButtonClick = () => {
        this.setState(({errorButton}) => {
            this.props.onButtonClick('errorButton', !errorButton)
            return { errorButton: !errorButton }
        })
    }

    onLowWaterButtonClick = () => {
        this.setState(({lowWaterButton}) => {
            this.props.onButtonClick('lowWaterButton', !lowWaterButton)
            return { lowWaterButton: !lowWaterButton }
        })
    }

    render() {

        const { avtomatNumber, street, city, carNumber } = this.state;
        const {errorButton, lowWaterButton } = this.state;

        const buttonClassName = "btn btn-outline-secondary";
        const activeButtonClassName = buttonClassName + ' active';
        const errorButtonClassName = errorButton ? activeButtonClassName : buttonClassName;
        const lowWaterButtonClassName = lowWaterButton ? activeButtonClassName : buttonClassName;

        return (
            <div className="form-row mb-2 ml-2 mr-2">
                <div className='col btn-group'>
                    <button type='button'
                            className={errorButtonClassName}
                            onClick={this.onErrorButtonClick}
                    >
                        With Errors
                    </button>
                    <button type='button'
                            className={lowWaterButtonClassName}
                            onClick={this.onLowWaterButtonClick}
                    >
                        Low Water
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
                    <input type="text" className="form-control" placeholder="City"
                        value={city}
                        onChange={(event) => this.onFieldChange(event, 'city')}
                    />
                </div>
                <div className='col'>
                    <input type="text" className="form-control" placeholder="Car Number"
                        value={carNumber}
                        onChange={(event) => this.onFieldChange(event, 'carNumber')}
                    />
                </div>
            </div>
        )
    }
}
