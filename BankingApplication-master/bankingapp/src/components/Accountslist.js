import React, { Component } from 'react';
import { Table, Card } from 'react-bootstrap';
import axios from 'axios';
import './Userslist.css';

export default class Accountslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/accounts")
      .then(response => {
        this.setState({ accounts: response.data });
      }).catch(error => {
        console.error("There was an error!", error);
      });
  }

  render() {
    const { accounts } = this.state;
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Body>
          <Table className="custom-table">
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.balance}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
