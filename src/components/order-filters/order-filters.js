import React, { Component } from 'react';

export default class OrderFilters extends Component {

    state = {
        date: new Date().toISOString().substring(0, 10),
        avtomatNumber: '',
        address: '',
        errorButton: false,
        returnButton: false,
        purchaseId: ''
    }

    inputDateMinMax = () => {
        const today = new Date();
        const max = today.toISOString().slice(0, 10);
        today.setMonth(today.getMonth() - 3);
        const min = today.toISOString().slice(0, 10);
        return [min, max];
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

    onReturnButtonClick = () => {
        this.setState(({returnButton}) => {
            this.props.onButtonClick('returnButton', !returnButton)
            return { returnButton: !returnButton }
        })
    }

    render() {

        const { date, avtomatNumber, address } = this.state;
        const {errorButton, returnButton } = this.state;

        const buttonClassName = "btn btn-outline-secondary";
        const activeButtonClassName = buttonClassName + ' active';
        const errorButtonClassName = errorButton ? activeButtonClassName : buttonClassName;
        const returnButtonClassName = returnButton ? activeButtonClassName : buttonClassName;

        return (
            <div className="form-row mb-2 ml-2 mr-2">
                <div className='col btn-group'>
                    <button type='button'
                            className={errorButtonClassName}
                            onClick={this.onErrorButtonClick}
                    >
                        Errors
                    </button>
                    <button type='button'
                            className={returnButtonClassName}
                            onClick={this.onReturnButtonClick}
                    >
                        Return
                    </button>
                </div>
                <div className="col">
                    <input type="date" className="form-control"
                           value={date}
                           min={this.inputDateMinMax()[0]}
                           max={this.inputDateMinMax()[1]}
                           onChange={(event) => this.onFieldChange(event, 'date')}>
                    </input>
                </div>
                <div className='col'>
                    <input type="text" className="form-control" placeholder="Avtomat Number"
                           value={avtomatNumber}
                           onChange={(event) => this.onFieldChange(event, 'avtomatNumber')}
                    />
                </div>
                <div className='col'>
                    <input type="text" className="form-control" placeholder="Address"
                           value={address}
                           onChange={(event) => this.onFieldChange(event, 'address')}
                    />
                </div>
                <div className='col input-group'>
                    <input type="text" className="form-control" placeholder='Pay Gate ID' />
                    <div className='input-group-append'>
                        <button className="btn btn-outline-secondary" type='submit' disabled>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}