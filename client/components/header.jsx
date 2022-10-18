import React from 'react';

export default function Header(props) {
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
