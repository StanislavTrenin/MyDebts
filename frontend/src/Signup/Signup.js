import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import {Redirect} from "react-router-dom";


class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            email: "",
            password: "",
            repeat: "",
            redirectTo: null
        };
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0 && this.state.password === this.state.repeat;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log('handle submit ' + this.state.login + ' ' + this.state.password);
        axios
            .post('http://192.168.33.10:8081/signup', {
                login: this.state.login,
                email: this.state.email,
                password: this.state.password,
            })
            .then(response => {
                console.log('login response: ');
                console.log(response);
                if (response.status === 200) {
                    //alert('success!!!');
                    // update App.js state
                    /*this.props.updateUser({
                        loggedIn: true,
                        login: response.data.login
                    });*/
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
            console.log('signup error: ');
            console.log(error);

        })
    };

    render() {
        if (this.state.redirectTo) {
            //alert('lol');
            return <Redirect to={{pathname: this.state.redirectTo}}/>
        } else {

            return (

                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="login">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        value={this.state.login}
                                        onChange={this.handleChange}
                                        type="text"
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        type="email"
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                    />
                                </Form.Group>
                                <Form.Group controlId="repeat">
                                    <Form.Label>repeat password</Form.Label>
                                    <Form.Control
                                        value={this.state.repeat}
                                        onChange={this.handleChange}
                                        type="password"
                                    />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Button
                                            block
                                            disabled={!this.validateForm()}
                                            type="submit"
                                            variant="primary"
                                            className="float-lg-right"
                                        >
                                            Submit
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
}
export default Signup