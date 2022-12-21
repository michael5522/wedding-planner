import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="#menu" />;

    const welcomeMessage = route.path === 'login'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';

    const headerMessage = route.path === 'login'
      ? 'Login'
      : 'Registration';
    return (
      <div>

        <div className="position-relative overflow-hidden text-center menu-row">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal lustria-font menu-text">{headerMessage}</h1>
            <p className="lead font-weight-normal lustria-font italic menu-text">Please fill out your info below!</p>
            <a className="btn btn-outline-secondary lustria-font menu-text" href="#menu">Return to Menu</a>
          </div>
        </div>

        <div className="home-ultrabackground-9 p-1 mb-0 mt-0 d-flex container-fluid" />

        <div className="row pt-5 align-items-center custom-row-login-register">
          <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
            <header className="text-center">
              <p className="text-muted mb-4 lustria-font italic">{welcomeMessage}</p>
            </header>
            <div className="card p-3 card-shadow">
              <AuthForm
                key={route.path}
                action={route.path}
                onSignIn={handleSignIn} />
            </div>
          </div>
        </div>

        <div className="home-ultrabackground p-1 mb-0 mt-0 d-flex container-fluid" />
        <div className="home-black d-flex p-5 flex-grow-1 container-fluid" />
      </div>

    );
  }
}

AuthPage.contextType = AppContext;
