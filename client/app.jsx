/* eslint-disable */
import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import Home from './pages/home';
import Header from './components/header';
import NotFound from './pages/not-found';
import Auth from './pages/auth';
import Menu from './pages/menu';
import Faq from './pages/faq';
import Budget from './pages/budget'
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
      showView(window.location.hash);
    });
    function showView(newHash) {
      console.log('newHash:', newHash);
    }
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    console.log(user);
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    console.log('app.js handle sign in should add local storage');
    const { user, token } = result;
    console.log(user, token);
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    console.log('111', this.state.route);
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'login' || route.path === 'register') {
      return <Auth />;
    }
    if (route.path === 'menu') {
      return <Menu />;
    }
    if (route.path === 'faq') {
      return <Faq />;
    }
    if (route.path === 'budgetlist') {
      return <Budget />;
    }
    return <NotFound />;
  }

  render() {

    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };

    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Header />
          {this.renderPage()}
        </>
      </AppContext.Provider>

    );
  }
}
