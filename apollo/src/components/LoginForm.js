import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';
import gql from 'graphql-tag';
class LoginForm extends Component {
  state = { emial: '', password: '', error: '' };
  onSubmit(event) {
    event.preventDefault();
    console.log('clicked');
    this.props
      .mutate({
        variables: { email: this.state.email, password: this.state.password }
      })
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.userLogin.token);
        hashHistory.push('/home');
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: 'invalid credentials' });
      });
  }

  render() {
    console.log(this.props);
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
          <input type="submit" onClick={this.onSubmit.bind(this)} />
        </form>
        <div style={{ color: 'red' }}>{this.state.error}</div>
        <div>
          Create an account<Link to="/signup" style={{ color: 'red' }}>
            Signup
          </Link>
        </div>
      </div>
    );
  }
}
const mutation = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
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
