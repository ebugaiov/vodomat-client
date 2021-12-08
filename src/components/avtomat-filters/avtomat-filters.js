import React, { Component } from 'react';

import './avtomat-filters.css';

export default class AvtomatFilters extends Component {

    state = {
        number: '',
        street: '',
        city: '',
        route: '',
        appPayButtonPress: false
    }

    onFieldChange = (event, field) => {
        this.setState({
            [field] : event.target.value
        })
        this.props.onFieldChange(field, event.target.value)
    }

    onAppPayButtonClick = () => {
        this.setState(({appPayButtonPress}) => {
            this.props.onAppPayButtonClick(!appPayButtonPress)
            return { appPayButtonPress: !appPayButtonPress }
        })
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

        const { street, number, city, route, appPayButtonPress } = this.state;

        const buttonClassName = "btn btn-outline-secondary w-100";
        const activeButtonClassName = buttonClassName + " active";
        const appPayButtonClassName = appPayButtonPress ? activeButtonClassName : buttonClassName;

        return (
            <div className="avtomat-filters card mb-3">
                <div className="card-header">Filter Avtomats</div>
                <div className="card-body">

                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Input Street" autoFocus
                                value={street}
                                onChange={(event) => this.onFieldChange(event, 'street')} />
                        </div>

                        <div className="col">
                            <input type="text" className="form-control" placeholder="Input Number"
                                value={number}
                                onChange={(event) => this.onFieldChange(event, 'number')} />
                        </div>
                    </div>

                    <select className="form-control mb-3"
                            value={city}
                            onChange={(event) => this.onFieldChange(event, 'city')}
                    >
                        <option value="">All Cities</option>
                        { this.props.cities.map((city) => {
                            return (
                                <option key={city} value={city}>{city}</option>
                            )
                        }) }
                    </select>

                    <div className="row">
                        <div className="col">
                            <select className="form-control"
                                    value={route}
                                    onChange={(event) => this.onFieldChange(event, 'route')}
                            >
                                <option value="">All Routes</option>
                                { this.props.routes.map((route) => {
                                    return (
                                        <option key={route} value={route}>{route}</option>
                                    )
                                }) }
                            </select>
                        </div>
                        <div className="col">
                            <button type="button"
                                    className={appPayButtonClassName}
                                    onClick={this.onAppPayButtonClick}
                            >
                                App Pay
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}