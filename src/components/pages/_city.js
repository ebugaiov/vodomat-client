import React, { Component, useState, useEffect } from 'react';

import Row from '../row';
import ItemList from '../item-list';

import VodomatService from '../../services/vodomat-service';

export default class CityPage extends Component {

    vodomatService = new VodomatService();

    state = {
        items: [],
        loading: true,
        cityUpdated: false,
        selectedCityId: '',
        selectedCityCity: '',
    }

    onItemsLoaded = (items) => {
        this.setState({
            items,
            loading: false
        })
    }

    updateCities = () => {
        this.vodomatService
            .getAllCities()
            .then(this.onItemsLoaded)
    }

    componentDidMount() {
        this.updateCities()
    }

    componentDidUpdate() {
        if (this.state.cityUpdated) {
            this.setState({
                items: [],
                loading: true,
                cityUpdated: false
            })
            this.updateCities()
        }
    }

    renderCityItem = (item) => {
        const { city } = item;
        return (
            <div>
                <span>{city}</span>
            </div>
        )
    }

    onCitySelected = (id) => {
        this.setState({
            selectedCityId: id,
            selectedCityCity: this.state.items.filter((item) => {
                return item.id ? item.id === id : null;
            })[0].city
        })
    }

    onCityUpdated = () => {
        this.setState({
            cityUpdated: true
        })
    }

    render() {
        const { items, loading, selectedCityId, selectedCityCity } = this.state;
        return (
            <Row 
                left={
                    <ItemList
                        listHeader="Cities"
                        items={items}
                        loading={loading}
                        renderItem={this.renderCityItem}
                        onItemSelected={this.onCitySelected}
                    />
                }
                right={
                    <React.Fragment>
                        <CityUpdateForm id={selectedCityId}
                                city={selectedCityCity}
                                onCityUpdated={this.onCityUpdated}
                                vodomatService={this.vodomatService}
                        />
                        <CityCreateForm
                            onCityUpdated={this.onCityUpdated}
                            vodomatService={this.vodomatService}
                        />
                    </React.Fragment>
                }
            />
        )
    }
}

const CityUpdateForm = (props) => {
    
    const { id, city, onCityUpdated, vodomatService } = props;
    const [selectedId, setSelectedId] = useState(id)
    const [selectedCity, setSelectedCity] = useState(city);

    useEffect(() => {
        setSelectedId(id)
        setSelectedCity(city)
    }, [id, city])

    const onSubmitForm = (event) => {
        event.preventDefault()
        vodomatService.updateCity(selectedId, selectedCity)
                      .then((city) => {
                          setSelectedId(city.id)
                          setSelectedCity(city.city)
                      })
        setTimeout(onCityUpdated, 1000)
    }

    return (
        <div className="card mb-3">
            <div className="card-header" style={{backgroundColor: '#00587A', color: 'white'}}>Update Selected City</div>
            <div className="card-body">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <input type="hidden" value={selectedId} readOnly />
                        <input type="text" className="form-control"
                            value={selectedCity}
                            onChange={(event) => setSelectedCity(event.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">Update City</button>
                </form>
            </div>
        </div>
    )
}

const CityCreateForm = ({ vodomatService, onCityUpdated }) => {

    const [city, setCity] = useState('')

    const onSubmitForm = (event) => {
        event.preventDefault()
        vodomatService.createCity(city)
        setCity('')
        setTimeout(onCityUpdated, 1000)
    }
    
    return (
        <div className="card">
            <div className="card-header" style={{backgroundColor: '#00587A', color: 'white'}}>Create City</div>
            <div className="card-body">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <input type="text" className="form-control" value={city} 
                            onChange={(event) => setCity(event.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">Create City</button>
                </form>
            </div>
        </div>
    )
}
