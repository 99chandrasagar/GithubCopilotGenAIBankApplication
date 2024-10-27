import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
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
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post("http://localhost:8080/login", credentials)
      .then(response => {
        console.log(response);
        if (response.data) {
          // Handle successful login
          alert("Login successful");
        } else {
          // Handle login failure
          alert("Invalid credentials");
        }
      })
      .catch(error => {
        console.error("There was an error logging in!", error);
      });
  }

  render() {
    return (
      <div className="login-container">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header className="custom-card-header">Login</Card.Header>
          <Form onSubmit={this.handleSubmit} className="custom-form" id="loginFormId">
            <Card.Body>
              <Form.Group controlId="formGridUsername">
                <Form.Label className="custom-label">Email</Form.Label>
                <Form.Control required
                  type="text" name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  className={"bg-dark text-white"}
                  placeholder="Enter Email" />
              </Form.Group>
              <Form.Group controlId="formGridPassword">
                <Form.Label className="custom-label">Password</Form.Label>
                <Form.Control required
                  type="password" name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className={"bg-dark text-white"}
                  placeholder="Enter Password" />
              </Form.Group>
            </Card.Body>
            <Card.Footer className="form-footer">
              <Button size="sm" className="custom-button" type="submit">
                Login
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}