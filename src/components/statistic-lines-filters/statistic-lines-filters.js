import React, { Component } from 'react';

export default class StatisticLinesFilters extends Component {

    state = {
        avtomatNumber: '',
        startPeriod: new Date().toISOString().substring(0, 10),
        endPeriod: new Date().toISOString().substring(0, 10)
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

    onSelectButtonClick = () => {
        if (this.state.avtomatNumber) {
            this.props.onFieldChange('updateData', true)
        }
    }

    render() {

        const { avtomatNumber, startPeriod, endPeriod } = this.state

        return (
            <div className="form-row mb-2 ml-2 mr-2">
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
                <div className='col'>
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