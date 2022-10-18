/* eslint-disable */
import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import NotFound from './pages/not-found';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    /**
     * Listen for hash change events on the window object
     * Each time the window.location.hash changes, parse
     * it with the parseRoute() function and update state
     */
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });

      showView(window.location.hash);
    });

    function showView(newHash) {

      console.log('newHash:', newHash);
    }

  }

  renderPage() {
    console.log('111', this.state.route);
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    return <NotFound />;
  }

  render() {
    // console.log(this.state.route);
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    );
  }
}
