import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    if (user != null) {
      return (
        <header className="">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <div className="col py-2 text-muted">
                A-List Wedding
              </div>
              <button className="btn btn-light text-muted" onClick={handleSignOut}>
                Sign out
                <i className="ms-2 fas fa-sign-out-alt" />
              </button>
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
              <a className="btn btn-light text-muted" href="#login">
                Login
              </a>
              <a className="btn btn-light text-muted" href="#register">
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
