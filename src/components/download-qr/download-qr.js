import React from 'react';
import QRCode from 'qrcode.react';

import './download-qr.css';

const DownloadQR = ({id, paymentAppUrl}) => {

    const url = `http://${paymentAppUrl}`;

    const htmlElementId = `qrCode-${id}`;

    const downloadQR = () => {
        const canvas = document.getElementById(htmlElementId);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${htmlElementId}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return (
        <div>
            <div hidden>
                <QRCode
                    id={htmlElementId}
                    value={`${url}?id=${id}`}
                    size={420}
                    includeMargin={true}
                />
            </div>
            <button type="button" className="btn btn-link p-0 qrButton" onClick={downloadQR}>
                <i className="fas fa-qrcode fa-lg"></i>
            </button>
        </div>
    )
}

export default DownloadQR;