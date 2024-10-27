import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import './SharedStyles.css';

export default class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = { accountId: '', amount: '' };
    this.withdrawChange = this.withdrawChange.bind(this);
    this.submitWithdraw = this.submitWithdraw.bind(this);
  }

  submitWithdraw(event) {
    event.preventDefault();

    const withdraw = {
      accountId: this.state.accountId,
      amount: this.state.amount
    };

    axios.get("http://localhost:8080/withdrawmoney", { params: withdraw }, {
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
        alert("Withdrawal amount exceeded");
      }
    });
  }

  withdrawChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="login-container">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header className="custom-card-header">Withdrawal Form</Card.Header>
          <Form onSubmit={this.submitWithdraw} className="custom-form" id="withdrawFormId">
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAccountId">
                  <Form.Label className="custom-label">Account Id</Form.Label>
                  <Form.Control required
                    type="text" name="accountId"
                    value={this.state.accountId}
                    onChange={this.withdrawChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Account Id" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAmount">
                  <Form.Label className="custom-label">Amount</Form.Label>
                  <Form.Control required
                    type="number" name="amount"
                    value={this.state.amount}
                    onChange={this.withdrawChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Amount" />
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