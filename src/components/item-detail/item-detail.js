import React from 'react';

import './item-detail.css';

import VodomatService from '../../services/vodomat-service';

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

        const {statusDetail: { avtomatNumber, city, street, house, carNumber,
                               water, money, price },
               loading } = this.state

        const cardTitle = loading ? <Spinner /> : <CardDetailTitle city={city} street={street} house={house} />

        return (
            <div className="item-detail">
                <div className="card">
                    <div className="card-body">
                        {cardTitle}
                        <p className="card-text text-muted"><i className="card-icon fas fa-shopping-cart"></i>{avtomatNumber}</p>
                        <p className="card-text text-muted"><i className="card-icon fas fa-road"></i>{carNumber}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Water: {water}</li>
                        <li className="list-group-item">Money: {money}</li>
                        <li className="list-group-item">Price: {price}</li>
                        <li className="list-group-item">Error: No</li>
                    </ul>
                </div>
            </div>
        )
    }
}

const Spinner = () => {
    return (
        <h5 className="card-title">
            <div className="text-center">
                <div className="spinner spinner-border"></div>
            </div>
        </h5>
    )
}

const CardDetailTitle = ({city, street, house}) => {
    return (
        <h5 className="card-title">{street}, {house} <span className="small">({city})</span></h5>
    )
}
