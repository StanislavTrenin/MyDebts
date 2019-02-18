import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Lend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            person_id: 0,
            sum: 0,
            description: '',
        };
    }

    updateDescription(value) {
        this.setState({
            description: value,
        });
    }

    updatePersonId(value) {
        this.setState({
            person_id: value,
        });
    }

    updateSum(value) {
        this.setState({
            sum: value,
        });
    }


    async submit() {
        this.setState({
            disabled: true,
        });

        await axios.post('http://192.168.33.10:8081', {
            person_id: this.state.person_id,
            sum: this.state.sum,
            description: this.state.description,
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-primary">
                            <div className="card-header">Lend Money</div>
                            <div className="card-body text-left">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Person:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => {
                                            this.updatePersonId(e.target.value)
                                        }}
                                        className="form-control"
                                        placeholder="Give more context to your question."
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Sum:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => {
                                            this.updateSum(e.target.value)
                                        }}
                                        className="form-control"
                                        placeholder="Give your question a title."
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Description:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => {
                                            this.updateDescription(e.target.value)
                                        }}
                                        className="form-control"
                                        placeholder="Give more context to your question."
                                    />
                                </div>
                                <button
                                    disabled={this.state.disabled}
                                    className="btn btn-primary"
                                    onClick={() => {
                                        this.submit()
                                    }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Lend);