import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
class Home extends Component {
  renderList = () => {
    return this.props.data.content.songs.map(song => {
      return (
        <li className="list-group-item" key={song.id}>
          {song.songName}
        </li>
      );
    });
  };

  render() {
    console.log(this.props);
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h3>Welcome</h3>

        <div>
          <ul className="list-group">{this.renderList()}</ul>
        </div>
        <div>
          <Link to="/create/song">
            <button>
              <span className="glyphicon glyphicon-plus" />Add
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
const query = gql`
  {
    content {
      id
      songs {
        id
        songName
      }
    }
  }
`;

export default graphql(query, {
  options: {
    context: { headers: { authorization: localStorage.getItem('token') } }
  }
})(Home);
// (fetchSong, {
//   options: props => {
//     return { variables: { id: props.params.id } };
//   }
// })
