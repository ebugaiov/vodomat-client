import React, { Component, useState, useEffect } from 'react';

import VodomatService from '../../services/vodomat-service';

import Row from '../row';
import ItemList from '../item-list';

export default class StreetPage extends Component {

    vodomatService = new VodomatService();

    state = {
        items: [],
        loading: true,
        streetUpdated: false,
        selectedStreet: {id: '', street: '', city: '', cityId: ''},
        streetFilter: ''
    }

    onItemsLoaded = (items) => {
        this.setState({
           items,
           loading: false,
           selectedStreet: items[0]
        })
    }

    updateStreets = () => {
        this.vodomatService
            .getAllStreets()
            .then(this.onItemsLoaded)
    }

    componentDidMount() {
        this.updateStreets()
    }

    componentDidUpdate() {
        if (this.state.streetUpdated) {
            this.setState({
                items: [],
                loading: true,
                streetUpdated: false
            })
            this.updateStreets()
        }
    }

    renderStreetItem = (item) => {

        const { street, city } = item;

        return (
            <div className="d-flex justify-content-between">
                <span>{street}</span>
                <span>{city}</span>
            </div>
        )
    }

    onStreetSelected = (id) => {
        this.setState({
            selectedStreet: this.state.items.filter((item) => {
                return item.id ? item.id === id : false
            })[0]
        })
    }

    onStreetUpdated = () => {
        this.setState({streetUpdated: true})
    }

    onChangeFilterField = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    streetItems = (items, street) => {
        if (street.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.street ? item.street.toLowerCase().indexOf(street.toLowerCase()) > -1 : false;
        })
    }

    render() {
        
        const { items, loading, selectedStreet } = this.state;
        const cities = items ?
            [...new Set(items.map((item) => 
                JSON.stringify({cityId: item.cityId, city: item.city})))
            ].map((item) => JSON.parse(item)) :
        [];
        const visibleItems = items ? this.streetItems(items, this.state.streetFilter) : [];

        return (
            <Row
                left={
                    <ItemList
                        listHeader="Streets"
                        items={visibleItems}
                        loading={loading}
                        renderItem={this.renderStreetItem}
                        onItemSelected={this.onStreetSelected}
                    />
                }
                right={
                    <React.Fragment>
                        <StreetFilters onChangeFilterField={this.onChangeFilterField} />
                        <UpdateStreetForm
                            selectedStreet={selectedStreet}
                            cities={cities}
                            onStreetUpdated={this.onStreetUpdated}
                            vodomatService={this.vodomatService}
                        />
                        <CreateStreetForm
                            cities={cities}
                            vodomatService={this.vodomatService}
                            onStreetUpdated={this.onStreetUpdated}
                        />
                    </React.Fragment>
                }
            />
        )
    }
}

const StreetFilters = ({onChangeFilterField, cities, vodomatService}) => {

    const [city, setCity] = useState('')

    return (
        <div className="card mb-3">
            <div className="card-header" style={{backgroundColor: '#00587A', color: 'white'}}>Filter Streets</div>
            <div className="card-body">
                <input type="text" className="form-control col" placeholder="Input Street"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value)
                        onChangeFilterField('streetFilter', e.target.value)
                    }}
                />
            </div>
        </div>
    )
}

const UpdateStreetForm = ({selectedStreet, cities, onStreetUpdated, vodomatService}) => {

    const [street, setStreet] = useState('');
    const [cityId, setCityId] = useState('');

    useEffect(() => {
        setStreet(selectedStreet.street)
        setCityId(selectedStreet.cityId)
    }, [selectedStreet.street, selectedStreet.cityId])

    const onSubmitForm = (event) => {
        event.preventDefault()
        vodomatService
            .updateStreet(cityId, street, selectedStreet.id)
            .then((resp) => setTimeout(onStreetUpdated, 1000))
    }

    return (
        <div className="card mb-3">
            <div className="card-header" style={{backgroundColor: '#00587A', color: 'white'}}>Update Street</div>
            <div className="card-body">
                <form onSubmit={onSubmitForm}>
                    <input type="text" className="form-control mb-3"
                        value={street} onChange={(e) => setStreet(e.target.value)}
                    />
                    <select className="form-control mb-3" value={cityId} onChange={(e) => setCityId(e.target.value)}>
                        {
                            cities.map((city) => {
                                return <option key={city.cityId} value={city.cityId}>{city.city}</option>
                            })
                        }
                    </select>
                    <button type="submit" className="btn btn-outline-secondary">Update</button>
                </form>
            </div>
        </div>
    )
}

const CreateStreetForm = ({cities, onStreetUpdated, vodomatService}) => {

    const [street, setStreet] = useState('');
    const [cityId, setCityId] = useState('');

    const onSubmitForm = (event) => {
        event.preventDefault()
        vodomatService
            .createStreet(cityId, street)
            .then((street) => setTimeout(onStreetUpdated, 1000))
    }

    const btnClassName = 'btn btn-outline-secondary';
    const enabledBtnClassName = street && cityId ? btnClassName : btnClassName + ' disabled';

    return (
        <div className="card mb-3">
            <div className="card-header" style={{backgroundColor: '#00587A', color: 'white'}}>Create Street</div>
            <div className="card-body">
                <form onSubmit={onSubmitForm}>
                    <select className="form-control mb-3" required onChange={(e) => setCityId(e.target.value)}>
                        <option>Select City</option>
                        {cities.map((city) => {
                            return <option key={city.cityId} value={city.cityId}>{city.city}</option>
                        })}
                    </select>
                    <input type="text" className="form-control mb-3" required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <button type="submit" className={enabledBtnClassName}>Create</button>
                </form>
            </div>
        </div>
    )
}
