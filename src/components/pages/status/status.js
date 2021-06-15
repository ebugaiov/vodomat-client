import React, { useState, useEffect } from 'react';

import VodomatService from '../../../services/vodomat-service';

import Header from '../../header';
import Footer from '../../footer';
import StatusFilters from '../../status-filters';
import ItemsTable from '../../items-table';
import ItemDetail from '../../item-detail';

import './status.css';

function StatusPage() {

    const vodomatService = new VodomatService()

    const [items, setItems] = useState([])

    useEffect()

    const [selectedStatus, setSelectedStatus] = useState(40)

    const [searchAddress, setSearchAddress] = useState('')

    const onStatusSelected = (avtomatNumber) => {
        setSelectedStatus(avtomatNumber)
    }

    const renderStatusTableHeaders = (
        <React.Fragment>
            <th scope="col">#</th>
            <th scope="col">Address</th>
            <th scope="col">Water</th>
            <th scope="col">Money</th>
        </React.Fragment>
    )

    const renderStatusItem = (item) => {
        const { avtomatNumber, street, house, city, water, money} = item
        return (
            <React.Fragment>
                <th scope="row">{avtomatNumber}</th>
                <td>{street} {house} <small>({city})</small></td>
                <td>{water}</td>
                <td>{money}</td>
            </React.Fragment>
        )
    }

    const onSearchByAddressChanged = (address) => {
        setSearchAddress(address)
    }

    const searchByAddress = (statuses, address) => {
        if (address.length === 0) {
            return statuses
        }
        return statuses.filter((item) => {
            console.log(item)
            return item.street.toLowerCase().indexOf(address) > -1;
        })
    }

    const visibleItems = searchByAddress(items, searchAddress)

    return (
        <div className="statusPage">
            <Header />

            <div className="content row">
                <div className="col-md-8">
                    <StatusFilters
                        onSearchByAddressChanged={onSearchByAddressChanged}
                    />
                    <ItemsTable
                        onItemSelected={onStatusSelected}
                        getData={visibleItems}
                        renderTableHeaders={renderStatusTableHeaders}
                        renderItem={renderStatusItem}
                    />
                </div>
                <div className="col-md-4">
                    <ItemDetail avtomatNumber={selectedStatus} />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default StatusPage;