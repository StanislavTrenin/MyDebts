import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Link, withRouter} from "react-router-dom";


class Signup extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            login: '',
            password: '',
            repeat: '',
        };

    }

    handleChange(event) {
        event.preventDefault();
        console.log('handleChange ');
        console.log(this.state.login);

    }

    handleSubmit() {
        console.log('handleSubmit '+this.input.value);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicLogin">
                                <Form.Label>Login name</Form.Label>
                                <Form.Control type="login" placeholder="Login"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicRepeat">
                                <Form.Label>Repeat</Form.Label>
                                <Form.Control type="password" placeholder="Repeat password"/>
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Button variant="primary" type="submit" onClick={this.handleSubmit} className="float-lg-right">
                                        Create account
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>


        );
    }
}

export default withRouter(Signup);