import React, { Component } from 'react';

import './issue-detail.css'

import Spinner from '../spinner';

import VodomatService from "../../services/vodomat-service";

export default class IssueDetail extends Component {

    vodomatService = new VodomatService()

    state = {
        issueDetail: {},
        loading: true,
        comment: ''
    }

    componentDidMount() {
        this.updateIssue()
    }

    componentDidUpdate(prevProps) {
        if (this.props.issueId !== prevProps.issueId) {
            this.setState({
                loading: true
            })
            this.updateIssue()
        }
    } 

    onIssueLoaded = (issueDetail) => {
        this.setState({
            issueDetail,
            loading: false,
            comment: issueDetail.comment ? issueDetail.comment : ''
        })
    }

    updateIssue = () => {
        const { issueId } = this.props;
        if (!issueId) {
            return;
        }
        this.vodomatService
            .getIssue(issueId)
            .then(this.onIssueLoaded)
    }

    onCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    onSubmitComment = (event) => {
        event.preventDefault();
        const { id } = this.state.issueDetail;
        const { comment } = this.state;
        this.vodomatService.commentIssue(id, comment)
            .then((issueDetail) => {
                this.onIssueLoaded(issueDetail)
            })
        setTimeout(this.props.onCommented, 1000)
    }

    cardBody = () => {
        const { address, avtomatNumber, createdAt, email, issue } = this.state.issueDetail;
        const { comment } = this.state;

        return (
            <div className="card-body">
                <h6 className="card-title">{ address }</h6>
                <p className="card-text text-muted">
                    <i className="card-icon fas fa-shopping-cart"></i>&nbsp;
                    <a target='_blank' rel='noopener noreferrer'
                       href={`/order?avtomat_number=${avtomatNumber}&date=${createdAt.split(' ')[0]}`}>
                        { avtomatNumber }
                    </a>
                </p>
                <p className="card-text text-muted">
                    <i className="card-icon fas fa-clock"></i>&nbsp;{ createdAt }
                </p>
                <p className="card-text text-muted">
                    <i className="card-icon fas fa-at"></i>&nbsp;{ email }
                </p>
                <p>{ issue }</p>
                <form onSubmit={this.onSubmitComment}>
                    <textarea className="form-control mb-3" value={comment} onChange={this.onCommentChange}></textarea>
                    <button type="submit" className="btn btn-sm btn-outline-secondary">Comment</button>
                </form>
            </div>
        )
    }

    render() {

        const { loading, issueDetail } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const cardBody = !loading && issueDetail ? this.cardBody() : null;

        return (
            <div className="issue-detail">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        Issue Details
                        { spinner }
                    </div>
                    { cardBody }
                </div>
            </div>
        )
    }
}
