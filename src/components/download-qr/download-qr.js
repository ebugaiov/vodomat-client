import React, { Component } from 'react';
import QRCode from 'qrcode.react';

import './download-qr.css';

export default class DownloadQR extends Component {

    url  = 'https://pay.roganska.com'
    elementId = `qrCode-${this.props.id}`;

    downloadQR = () => {
        const canvas = document.getElementById(this.elementId);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${this.elementId}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    render() {
        return (
            <div>
                <div hidden>
                    <QRCode
                        id={this.elementId}
                        value={`${this.url}/${this.props.id}`}
                        size={256}
                    />
                </div>
                <button type="button" className="btn btn-link p-0 qrButton" onClick={this.downloadQR}>
                    <i className="fas fa-qrcode fa-lg"></i>
                </button>
            </div>
        )
    }
}