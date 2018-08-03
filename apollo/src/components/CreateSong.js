import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class CreateSong extends Component {
  state = { song: '' };
  onSubmit = event => {
    console.log('clicked');
    event.preventDefault();

    this.props
      .mutate({
        variables: { songName: this.state.song }
      })
      .then(() => hashHistory.push('/home'));
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Create a new song</h3>
        <form onSubmit={event => this.onSubmit(event)}>
          <input
            onChange={event => this.setState({ song: event.target.value })}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation createSong($songName: String!) {
    song(songName: $songName) {
      id
      songs {
        id
        songName
      }
    }
  }
`;

export default graphql(mutation, {
  options: {
    context: { headers: { authorization: localStorage.getItem('token') } }
  }
})(CreateSong);
