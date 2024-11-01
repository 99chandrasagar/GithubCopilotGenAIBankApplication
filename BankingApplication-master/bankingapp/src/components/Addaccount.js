import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import './SharedStyles.css';

export default class Addaccount extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: '', balance: '' };
    this.accountChange = this.accountChange.bind(this);
    this.submitAccount = this.submitAccount.bind(this);
  }

  submitAccount(event) {
    event.preventDefault();

    const account = {
      userId: this.state.userId,
      balance: this.state.balance
    };

    axios.get("http://localhost:8080/addaccount", { params: account }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Access-Control-Allow-Credentials': true
      },
      withCredentials: true,
      crossorigin: true
    })
    .then(response => {
      console.log(response);
      if (response.data === "") {
        alert("More than 3 accounts found for User Id " + account.userId);
      }
    });
  }

  accountChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="login-container">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header className="custom-card-header">Add Account</Card.Header>
          <Form onSubmit={this.submitAccount} className="custom-form" id="accountFormId">
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridUserId">
                  <Form.Label className="custom-label">User Id</Form.Label>
                  <Form.Control required
                    type="text" name="userId"
                    value={this.state.userId}
                    onChange={this.accountChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter User Id" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridBalance">
                  <Form.Label className="custom-label">Balance</Form.Label>
                  <Form.Control required
                    type="number" name="balance"
                    value={this.state.balance}
                    onChange={this.accountChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Balance" />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer className="form-footer">
              <Button size="sm" className="custom-button" type="submit">
                Submit
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}