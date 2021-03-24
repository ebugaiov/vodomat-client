import React from 'react'

import Header from '../header'
import ItemTable from '../item-table'
import StatusFilters from '../status-filters'
import ItemDetail from '../item-detail';
import Footer from '../footer';

import './app.css'

const App = () => {
    return (
        <div className="app">
            <Header />

            <div className="content row">
                <div className="col-md-8">
                    <StatusFilters />
                    <ItemTable />
                </div>
                <div className="col-md-4">
                    <ItemDetail />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default App