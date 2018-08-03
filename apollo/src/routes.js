import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import CreateSong from './components/CreateSong';

const greeting = () => {
  return <div>hey there!</div>;
};
export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginForm} />
    <Route path="home" component={Home} />
    <Route path="signup" component={SignupForm} />
    <Route path="create/song" component={CreateSong} />
  </Route>
);
