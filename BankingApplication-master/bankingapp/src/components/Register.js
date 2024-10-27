import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', mobile: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, mobile, password } = this.state;
    axios.post('http://localhost:8080/Register', { email, mobile, password })
      .then(response => {
        console.log('Registration successful', response);
        alert('Registration successful');
      })
      .catch(error => {
        console.error('There was an error registering!', error);
        alert('There was an error registering!');
      });
  }

  render() {
    return (
      <div className="login-container">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header className="custom-card-header">Register</Card.Header>
          <Form onSubmit={this.handleSubmit} className="custom-form" id="registerFormId">
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="custom-label">Email</Form.Label>
                  <Form.Control required
                    type="email" name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Email" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridMobile">
                  <Form.Label className="custom-label">Mobile</Form.Label>
                  <Form.Control required
                    type="text" name="mobile"
                    value={this.state.mobile}
                    onChange={this.handleChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Mobile Number" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="custom-label">Password</Form.Label>
                  <Form.Control required
                    type="password" name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Password" />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer className="form-footer">
              <Button size="sm" className="custom-button" type="submit">
                Register
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}