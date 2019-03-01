import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import {NavLink, Redirect} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            redirectTo: null
        };
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
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
            .post('http://192.168.33.10:8081/login', {
                login: this.state.login,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ');
                console.log(response);
                if (response.status === 200) {
                    // update App.js state
                    //alert('yes!!!');
                    /*this.props.updateUser({
                        loggedIn: true,
                        login: response.data.login
                    });*/
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/debts'
                    })
                }
            }).catch(error => {
            console.log('login error: ');
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
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={this.state.password}
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
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                                <NavLink to="/signup">
                                    Sign up
                                </NavLink>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Login