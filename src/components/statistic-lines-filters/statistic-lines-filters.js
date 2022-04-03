import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class StatisticLinesFilters extends Component {

    threeDaysAgo = new Date() - 1000 * 60 * 60 * 24 * 2;

    state = {
        avtomatNumber: this.props.match.params.avtomatNumber,
        startPeriod: new Date(this.threeDaysAgo).toISOString().substring(0, 10),
        endPeriod: new Date().toISOString().substring(0, 10),
        collectionsButton: false,
        eventsButton: false
    }

    inputDateMinMax = () => {
        const today = new Date();
        const max = today.toISOString().slice(0, 10);
        today.setMonth(today.getMonth() - 1);
        const min = today.toISOString().slice(0, 10);
        return [min, max];
    }

    onFieldChange = (event, field) => {
        this.setState({[field]: event.target.value})
        this.props.onFieldChange(field, event.target.value)
    }

    onButtonClick = (buttonName) => {
        this.setState((state) => {
            this.props.onButtonClick(buttonName, !state[buttonName])
            return {[buttonName]: !state[buttonName]}
        })
    }

    onSelectButtonClick = () => {
        if (this.state.avtomatNumber) {
            this.props.onFieldChange('updateData', true)
        }
    }

    render() {

        const { avtomatNumber, startPeriod, endPeriod } = this.state;
        const { collectionsButton, eventsButton } = this.state;

        const setButtonClassName = (buttonState) => {
            const buttonClassName = "btn btn-outline-secondary"
            return !buttonState ? buttonClassName : buttonClassName + " active"
        }

        return (
            <div className="form-row mb-2 ml-2 mr-2">
                <div className='col-auto btn-group'>
                    <button type='button'
                        className={setButtonClassName(collectionsButton)}
                        onClick={() => this.onButtonClick('collectionsButton')}
                        data-toggle="tooltip" title="Collections"
                    >
                        <i className='fas fa-coins text-warning'></i>
                    </button>
                    <button type='button'
                        className={setButtonClassName(eventsButton)}
                        onClick={() => this.onButtonClick('eventsButton')}
                        data-toggle="tooltip" title='Other Events'
                    >
                        <i className="fas fa-bell text-info"></i>
                    </button>
                </div>

                <div className="col input-group">
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Start Period</span>
                    </div>
                    <input type="date" className="form-control"
                        value={startPeriod}
                        min={this.inputDateMinMax()[0]}
                        max={this.inputDateMinMax()[1]}
                        onChange={(event) => this.onFieldChange(event, 'startPeriod')}
                    >
                    </input>
                </div>
                <div className="col input-group">
                    <div className='input-group-prepend'>
                        <span className="input-group-text">End Period</span>
                    </div>
                    <input type="date" className="form-control"
                        value={endPeriod}
                        min={this.inputDateMinMax()[0]}
                        max={this.inputDateMinMax()[1]}
                        onChange={(event) => this.onFieldChange(event, 'endPeriod')}
                    >
                    </input>
                </div>

                <div className='col-auto'>
                    <input type="number" className="form-control" placeholder="Avtomat Number"
                        value={avtomatNumber}
                        onChange={(event) => this.onFieldChange(event, 'avtomatNumber')}
                    />
                </div>

                <button type="submit" className="btn btn-outline-secondary"
                    onClick={this.onSelectButtonClick}
                >
                    Select
                </button>
            </div>
        )
    }

}

export default withRouter(StatisticLinesFilters);