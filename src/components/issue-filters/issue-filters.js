import React, { Component } from 'react';

import './issue-filters.css';

export default class IssueFilters extends Component {
    
    state = {
        date: new Date().toISOString().substring(0, 10),
        address: '',
        avtomatNumber: '',
    }

    inputDateMinMax = () => {
        const today = new Date();
        const max = today.toISOString().slice(0, 10);
        today.setMonth(today.getMonth() - 3);
        const min = today.toISOString().slice(0, 10);
        return [min, max];
    }

    onFieldChange = (event, field) => {
        this.setState({
            [field]: event.target.value
        })
        this.props.onFieldChange(field, event.target.value)
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
        
        const { date, address, avtomatNumber } = this.state;

        return (
            <div className="issue-filters card mb-3">
                <div className="card-header">Filter Issues</div>
                <div className="card-body">

                    <div className="mb-3">
                        <input type="date" className="form-control"
                               value={date}
                               min={this.inputDateMinMax()[0]}
                               max={this.inputDateMinMax()[1]}
                               onChange={(event) => this.onFieldChange(event, 'date')}>
                        </input>
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Input Avtomat Address"
                               value={address}
                               onChange={(event) => this.onFieldChange(event, 'address')}>
                        </input>
                    </div>

                    <div>
                        <input type="text" className="form-control" placeholder="Input Avtomat Number"
                                value={avtomatNumber}
                                onChange={(event) => this.onFieldChange(event, 'avtomatNumber')}>
                        </input>
                    </div>
                </div>
            </div>
        )
    }
}