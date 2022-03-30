import React, { Component } from 'react';

export default class CollectionFilter extends Component {

    state = {
        date: new Date().toISOString().substring(0, 10),
        carNumber: '',
        avtomatNumber: '',
        street: ''
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

    render() {

        const { date, carNumber, avtomatNumber, street } = this.state;
        const { carNumbers } = this.props;

        return (
            <div className='form-row mb-2 ml-2 mr-2'>
                <div className="col">
                    <input type="date" className="form-control"
                           value={date}
                           min={this.inputDateMinMax()[0]}
                           max={this.inputDateMinMax()[1]}
                           onChange={(event) => this.onFieldChange(event, 'date')}>
                    </input>
                </div>
                <div className="col">
                    <select className="custom-select"
                        value={carNumber}
                        onChange={(event) => this.onFieldChange(event, 'carNumber')}
                    >
                        <option value="">All Cars</option>
                        {carNumbers.map((carNumber) => {
                            return <option key={carNumber} value={carNumber}>{carNumber}</option>
                        })}
                    </select>
                </div>
                <div className='col'>
                    <input type="number" className="form-control" placeholder="Avtomat Number"
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
            </div>
        )
    }
}