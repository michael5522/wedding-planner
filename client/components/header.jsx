import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {
  render() {
    const { user } = this.context;
    // console.log('inside the header', user);
    if (user != null) {
      return (
        <header className="mb-5">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <div className="col py-2 text-muted">
                A-List Wedding
              </div>
              <a className="ml-2 text-muted" >
                Welcome, {user.username}
              </a>
            </div>
          </nav>
        </header>
      );
    } else {
      return (
        <header className="mb-5">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <div className="col py-2 text-muted">
                A-List Wedding
              </div>
              <a className="text-muted" href="#login">
                Login
              </a>
              <a className="ml-2 text-muted" href="#register">
                Register
              </a>
            </div>
          </nav>
        </header>
      );
    }
  }
}

Header.contextType = AppContext;
