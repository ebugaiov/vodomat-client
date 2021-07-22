import React from 'react';

import './item-detail.css';

import VodomatService from '../../services/vodomat-service';

import Spinner from '../spinner';

export default class ItemDetail extends React.Component {

    vodomatService = new VodomatService()

    state = {
        statusDetail: {},
        loading: true
    }

    componentDidMount() {
        this.updateStatus()
    }

    componentDidUpdate(prevProps) {
        if (this.props.avtomatNumber !== prevProps.avtomatNumber) {
            this.updateStatus()
        }
    }

    onStatusLoaded = (statusDetail) => {
        this.setState({
            statusDetail,
            loading: false
        })
        
    }

    updateStatus() {
        const { avtomatNumber } = this.props;
        if (!avtomatNumber) {
            return;
        }
        this.vodomatService
            .getStatus(avtomatNumber)
            .then(this.onStatusLoaded)
    }



    render() {

        const {statusDetail: { avtomatNumber, carNumber, time }} = this.state;
        const {statusDetail: { city, street, house }} = this.state;
        const {statusDetail: { water, money, price }} = this.state;
                               
        const { loading } = this.state

        const errors = ['lowWaterBalance', 'errorVolt', 'errorBill', 'errorCounter', 'errorRegister']
        const errorsStr = errors.filter((item) => {
            return this.state.statusDetail[item]
        }).join(', ')

        console.log(errorsStr)

        const cardTitle = loading ? <Spinner /> : <CardDetailTitle city={city} street={street} house={house} />

        return (
            <div className="item-detail">
                <div className="card">
                    <div className="card-header">Avtomat Details</div>
                    <div className="card-body">
                        {cardTitle}
                        <p className="card-text text-muted"><i className="card-icon fas fa-shopping-cart"></i>{avtomatNumber}</p>
                        <p className="card-text text-muted"><i className="card-icon fas fa-clock"></i>{time}</p>
                        <p className="card-text text-muted"><i className="card-icon fas fa-road"></i>{carNumber}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Water: {water}</li>
                        <li className="list-group-item">Money: {money}</li>
                        <li className="list-group-item">Price: {price}</li>
                        <li className="list-group-item">Errors: {!errorsStr ? 'No' : errorsStr}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

const CardDetailTitle = ({city, street, house}) => {
    return (
        <h5 className="card-title">{street}, {house} <span className="small">({city})</span></h5>
    )
}
