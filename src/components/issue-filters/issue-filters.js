import React, { Component } from 'react';

import './issue-filters.css';

export default class IssueFilters extends Component {
    
    state = {
        dateTerm: new Date().toISOString().substring(0, 10),
        addressTerm: '',
        avtomatNumberTerm: '',
    }

    inputDateMinMax = () => {
        const today = new Date();
        const max = today.toISOString().slice(0, 10);
        today.setMonth(today.getMonth() - 3);
        const min = today.toISOString().slice(0, 10);
        return [min, max];
    }

    onDateTermChange = (event) => {
        this.setState({
            dateTerm: event.target.value
        })
        this.props.onDateChange(event.target.value)
    }

    onAddressTermChange = (event) => {
        this.setState({
            addressTerm: event.target.value
        })
        this.props.onAddressChange(event.target.value)
    }

    onAvtomatNumberTermChange = (event) => {
        this.setState({
            avtomatNumberTerm: event.target.value
        })
        this.props.onAvtomatNumberChange(event.target.value)
    }

    render() {

        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        if (screenHeight < 900 || screenWidth < 1200) {
            const inputElements = document.getElementsByClassName('form-control')
            const btnElements = document.getElementsByClassName('btn')
            for (let i = 0; i < inputElements.length; i++) {
                inputElements[i].classList.add('form-control-sm')
            }
            for (let j = 0; j < btnElements.length; j++) {
                btnElements[j].classList.add('btn-sm')
            }
        }
        
        const { dateTerm, addressTerm, avtomatNumberTerm } = this.state;

        return (
            <div className="issue-filters card mb-3">
                <div className="card-header">Filter Issues</div>
                <div className="card-body">

                    <div className="mb-3">
                        <input type="date" className="form-control"
                               value={dateTerm}
                               min={this.inputDateMinMax()[0]}
                               max={this.inputDateMinMax()[1]}
                               onChange={this.onDateTermChange}>
                        </input>
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Input Avtomat Address"
                               value={addressTerm}
                               onChange={this.onAddressTermChange}>
                        </input>
                    </div>

                    <div>
                        <input type="text" className="form-control" placeholder="Input Avtomat Number"
                                value={avtomatNumberTerm}
                                onChange={this.onAvtomatNumberTermChange}>
                        </input>
                    </div>
                </div>
            </div>
        )
    }
}