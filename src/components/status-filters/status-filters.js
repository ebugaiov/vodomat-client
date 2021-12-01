import React, { Component } from 'react';

import './status-filters.css';

export default class StatusFilters extends Component {

    state = {
        streetTerm: '',
        routeTerm: '',
        cityTerm: 'all',
        minWaterButton: false,
        errorButton: false,
    }

    onTermStreetChange = (event) => {
        this.setState({
            streetTerm: event.target.value
        })
        this.props.onStreetChange(event.target.value)
    }

    onTermRouteChange = (event) => {         // TODO insert '-' in car number
        this.setState({
            routeTerm: event.target.value
        });
        this.props.onRouteChange(event.target.value)
    }

    onTermCityChange = (event) => {
        this.setState({
            cityTerm: event.target.value
        })
        this.props.onCityChange(event.target.value)
    }

    onMinWaterClick = () => {
        this.setState(({minWaterButton}) => {
            this.props.onMinWaterClick(!minWaterButton)
            return { minWaterButton: !minWaterButton }
        })
    }

    onErrorClick = () => {
        this.setState(({errorButton}) => {
            this.props.onErrorClick(!errorButton)
            return { errorButton: !errorButton }
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

        const { minWaterButton, errorButton } = this.state;
        const buttonClassName = "btn btn-outline-secondary";
        const activeButtonClassName = buttonClassName + " active";

        const minWaterButtonClassName = minWaterButton ? activeButtonClassName : buttonClassName;
        const errorButtonClassName = errorButton ? activeButtonClassName : buttonClassName;

        return (
            <div className="status-filters card mb-3">
                <div className="card-header">Filter Statuses</div>
                <div className="card-body">

                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Input Street" autoFocus
                                value={this.state.streetTerm}
                                onChange={this.onTermStreetChange} />
                        </div>

                        <div className="col">
                            <input type="text" className="form-control" placeholder="Input Route"
                                value={this.state.routeTerm}
                                onChange={this.onTermRouteChange} />
                        </div>
                    </div>

                    <select className="mb-3 form-control" value={this.state.cityTerm} onChange={this.onTermCityChange}>
                        <option value="all">All Cities</option>
                        { this.props.cities.map((city) => {
                            return (
                                <option key={city} value={city}>{city}</option>
                            )
                        }) }
                    </select>

                    <div className="btn-group d-flex">
                        <button type="button"
                                className={minWaterButtonClassName}
                                onClick={this.onMinWaterClick}>
                            Min Water
                        </button>
                        <button type="button"
                                className={errorButtonClassName}
                                onClick={this.onErrorClick}>
                            With Error
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}
