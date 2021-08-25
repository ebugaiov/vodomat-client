import React from 'react';

import './row.css';

const Row = ({ left, right }) => {
    return (
        <div className="content row">
            <div className="col-md-8 left">
                { left }
            </div>
            <div className="col-md-4 right">
                { right }
            </div>
        </div>
    )
}

export default Row;