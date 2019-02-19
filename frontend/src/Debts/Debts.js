import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {withRouter} from "react-router-dom";



class Debts extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);


        this.state = {
            id: 0,
            questions: null,
            show: false,
        };
    }

    async componentDidMount() {
        const questions = (await axios.get('http://192.168.33.10:8081/')).data;
        this.setState({
            questions,
        });

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(id) {
        this.state.id =id;
        this.setState({ show: true });
    }

    getBgColor(is_borrow) {
        if (is_borrow) return '#b32400';
        return 'default';

    }

    async close(id) {
        this.setState({
            disabled: true,
        });

        await axios.post('http://192.168.33.10:8081/close', {
            id: id,
        });

        this.props.history.push('/');
        window.location.reload(true);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.questions === null && <p>Loading questions...</p>}
                    {
                        this.state.questions && this.state.questions.map(question => (
                            <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">

                                <div className="card text-white bg-success mb-3">
                                    <div className="card-header"
                                         style={{backgroundColor: this.getBgColor(question.is_borrow)}}>
                                        Person: {question.person_id}
                                        <Button variant="primary" className="float-lg-right" onClick={this.handleShow.bind(this, question.id)}>
                                            Close
                                        </Button>
                                    </div>
                                    <div className="card-body"
                                         style={{backgroundColor: this.getBgColor(question.is_borrow)}}>
                                        <h4 className="card-title">{question.sum}</h4>
                                        <p className="card-text">{question.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Closing debt</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure want close this debt?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                No
                            </Button>
                            <Button variant="primary" onClick={() => {
                                this.close(this.state.id)
                            }}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withRouter(Debts);