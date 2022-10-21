import React, { Component } from 'react';

import VodomatService from '../../services/vodomat-service';

import Spinner from '../spinner';
import DownloadQR from '../download-qr';

import './avtomat-detail.css';

export default class AvtomatDetail extends Component {

    vodomatService = new VodomatService()

    state = {
        avtomatDetail: {},
        loading: true
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

    componentDidMount() {
        this.updateAvtomat()
    }

    componentDidUpdate(prevProps) {
        if (this.props.avtomatNumber !== prevProps.avtomatNumber) {
            this.setState({loading: true})
        }
        this.updateAvtomat()
    }

    cardBody = () => {

        const { id, paymentAppUrl } = this.state.avtomatDetail;

        return (
            <div className="card-body">
                <div className="card-text text-muted d-flex justify-content-between mb-3">
                    <div>
                        <i className="card-icon fas fa-shopping-cart"></i>
                        <span className="h5 ml-2">{ id }</span>
                    </div>
                    <div>
                        <DownloadQR id={id} paymentAppUrl={paymentAppUrl} />
                    </div>
                </div>

            </div>
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
                        Download QR
                        { spinner }
                    </div>
                    { cardBody }
                </div>
            </div>
        )
    }
}
