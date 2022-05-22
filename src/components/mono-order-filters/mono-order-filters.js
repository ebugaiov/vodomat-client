import React, { Component } from 'react';

import MonoOrderModal from '../mono-order-modal';

import PayService from '../../services/pay-service';

export default class MonoOrderFilters extends Component {

    payService = new PayService();

    state = {
        date: new Date().toISOString().substring(0, 10),
        avtomatNumber: '',
        address: '',
        id: '',
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

        return (
            <div className="form-row mb-2 ml-2 mr-2">
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
                    <input type="text" className="form-control" placeholder='App ID'
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
                    <MonoOrderModal id={this.state.id} closeOrderModal={this.closeOrderModal} /> :
                null }

            </div>
        )
    }
}
