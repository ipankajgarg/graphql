import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';
import gql from 'graphql-tag';
class LoginForm extends Component {
  state = { emial: '', password: '', username: '', error: '' };
  onSubmit(event) {
    event.preventDefault();
    console.log('clicked');
    this.props
      .mutate({
        variables: {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        }
      })
      .then(response => {
        console.log(response);
        hashHistory.push('/');
      })
      .catch(() => this.setState({ error: 'system error' }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Email</label>
          <br />
          <input
            onChange={event => this.setState({ email: event.target.value })}
          />
          <br />
          <label>password</label>
          <br />
          <input
            onChange={event => this.setState({ password: event.target.value })}
          />
          <br />
          <label>username</label>
          <br />
          <input
            onChange={event => this.setState({ username: event.target.value })}
          />
          <input type="submit" onClick={this.onSubmit.bind(this)} />
        </form>
        <div>{this.state.error}</div>
      </div>
    );
  }
}
const mutation = gql`
  mutation UserRegister(
    $email: String!
    $password: String!
    $username: String!
  ) {
    userRegister(email: $email, password: $password, username: $username) {
      id
      username
    }
  }
`;
// const query = gql`
//   {
//     demo(id: "10") {
//       token
//     }
//   }
// `;

export default graphql(mutation)(LoginForm);
