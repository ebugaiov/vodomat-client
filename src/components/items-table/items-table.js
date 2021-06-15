import React from 'react'

import './items-table.css'

export default class ItemsTable extends React.Component {

    state = {
        itemsTable: null
    }

    componentDidMount() {
        const { getData } = this.props;
        this.setState({
            itemsTable: getData
        })
    }

    renderItems = (arr) => {
        return arr.map((item) => {
            const { avtomatNumber } = item
            const tr = this.props.renderItem(item)
            return (
                <tr key={avtomatNumber} onClick={() => this.props.onItemSelected(avtomatNumber)}>
                    {tr}
                </tr>
            )
        })
    }

    render() {
        const { itemsTable } = this.state;

        if (!itemsTable) {
            return <Spinner />
        }

        return (
            <div className="table-responsive">
                <table className="item-table table table-hover table-striped">
                    <thead>
                        <tr>
                            {this.props.renderTableHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderItems(itemsTable) }
                    </tbody>
                </table>
            </div>
        )
    }
}

const Spinner = () => {
    return (
        <div className="text-center">
            <div className="spinner spinner-border"></div>
        </div>
    )
}
