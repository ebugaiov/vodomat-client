import React, { Component } from 'react';

import OrderModal from '../order-modal';

import VodomatService from "../../services/vodomat-service";

export default class OrderFilters extends Component {

    vodomatService = new VodomatService();

    state = {
        date: this.props.date,
        avtomatNumber: '',
        address: '',
        id: '',
        errorButton: false,
        returnButton: false,
        doneButton: false,
        serverFailButton: false,
        showModal: false
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

    onDoneButtonClick = () => {
        this.setState(({doneButton}) => {
            this.props.onButtonClick('doneButton', !doneButton)
            return { doneButton: !doneButton }
        })
    }

    onServerFailButtonClick = () => {
        this.setState(({serverFailButton}) => {
            this.props.onButtonClick('serverFailButton', !serverFailButton)
            return { serverFailButton: !serverFailButton }
        })
    }

    showOrderModal = () => {
        if (this.state.id.length < 10) {
            return
        }
        this.setState({
            showModal: true
        })
    }

    closeOrderModal = () => {
        this.setState({
            showModal: false,
            id: ''
        })
    }

    render() {

        const { date, avtomatNumber, address, id } = this.state;
        const {errorButton, returnButton, doneButton, serverFailButton } = this.state;

        const buttonClassName = "btn btn-outline-secondary";
        const activeButtonClassName = buttonClassName + ' active';
        const errorButtonClassName = errorButton ? activeButtonClassName : buttonClassName;
        const returnButtonClassName = returnButton ? activeButtonClassName : buttonClassName;
        const doneButtonClassName = doneButton ? activeButtonClassName : buttonClassName;
        const serverFailButtonClassName = serverFailButton ? activeButtonClassName : buttonClassName;

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
                    <button type='button'
                            className={doneButtonClassName}
                            onClick={this.onDoneButtonClick}
                    >
                        Done
                    </button>
                    <button type='button'
                            className={serverFailButtonClassName}
                            onClick={this.onServerFailButtonClick}
                    >
                        Fail
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
                    <input type="text" className="form-control" placeholder='Pay Gate ID'
                        value={id}
                        onChange={(event) => this.onFieldChange(event, 'id')}
                    />
                    <div className='input-group-append'>
                        <button className="btn btn-outline-secondary" type='button'
                            onClick={this.showOrderModal}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                { this.state.showModal ?
                    <OrderModal id={this.state.id} closeOrderModal={this.closeOrderModal} /> :
                null }

            </div>
        )
    }
}
