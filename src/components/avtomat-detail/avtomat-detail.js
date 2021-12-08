import React, { Component } from 'react';

import VodomatService from '../../services/vodomat-service';

import Spinner from '../spinner';
import DownloadQR from '../download-qr';

import './avtomat-detail.css';

export default class AvtomatDetail extends Component {

    vodomatService = new VodomatService()

    state = {
        avtomatDetail: {},
        cities: [],
        streets: [],
        loading: true,
    }

    onAvtomatLoaded = (avtomatDetail) => {
        this.setState({
            loading: false,
            avtomatDetail
        })
    }

    updateAvtomat = () => {
        const { avtomatNumber } = this.props;
        if (!avtomatNumber) {
            return;
        }
        this.vodomatService
            .getAvtomat(avtomatNumber)
            .then(this.onAvtomatLoaded)
    }

    downloadCities = () => {
        this.vodomatService
            .getAllCities()
            .then((cities) => {
                this.setState({
                    cities
                })
            })
    }

    downloadStreets = () => {
        this.vodomatService
            .getAllStreets()
            .then((streets) => {
                this.setState({
                    streets
                })
            })
    }

    componentDidMount() {
        this.downloadCities()
        this.downloadStreets()
        this.updateAvtomat()
    }

    componentDidUpdate(prevProps) {
        if (this.props.avtomatNumber !== prevProps.avtomatNumber) {
            this.setState({loading: true})
        }
        this.updateAvtomat()
    }

    onSubmitUpdateForm = (event) => {
        event.prevent.default()

        setTimeout(this.props.onUpdateAvtomat, 1000)
    }

    onChangeFormField = (event, field) => {
        this.setState(({avtomatDetail}) => {
            return {avtomatDetail: {...avtomatDetail, [field]: event.target.value}}
        })
    }

    cardBody = () => {

        const { id } = this.state.avtomatDetail;

        return (
            <div className="card-body">
                <p className="card-text text-muted d-flex justify-content-between">
                    <div>
                        <i className="card-icon fas fa-shopping-cart"></i>
                        <span className="h6 ml-2">{ id }</span>
                    </div>
                    <div>
                        <DownloadQR id={this.props.avtomatNumber} />
                    </div>
                </p>
                { this.updateForm() }
            </div>
        )
    }

    updateForm = () => {

        const { city, street, house } = this.state.avtomatDetail;
        const { cities, streets } = this.state;

        return (
            <form onSubmit={this.onSubmitUpdateForm}>
                <div className="row">
                    <div className="col-lg-6">
                        <select className="form-control mb-3" value={city} onChange={() => this.onChangeFormField('city')}>
                            { cities.map((city) => {
                                return <option key={city.id} value={city.city}>{city.city}</option>
                            }) }
                        </select>
                    </div>
                    <div className="col-lg-6">
                        <select className="form-control mb-3" value={street} onChange={() => this.onChangeFormField('street')}>
                            { streets.map((street) => {
                                return <option key={street.id} value={street.street}>{street.street}</option>
                            })}
                        </select>
                    </div>
                </div>
                <input type="text" className="form-control mb-3" value={house} onChange={() => this.onChangeFormField('house')} />
                <button type="submit" className="btn btn-outline-secondary">Update</button>
            </form>
        )
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

        const { loading, avtomatDetail } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const cardBody = !loading && avtomatDetail ? this.cardBody() : null;

        return (
            <div className="avtomat-detail">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        Avtomat Detail
                        { spinner }
                    </div>
                    { cardBody }
                </div>
            </div>
        )
    }
}