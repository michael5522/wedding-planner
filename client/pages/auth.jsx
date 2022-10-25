import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { user, route, handleSignIn } = this.context;
    // console.log('111', user, '222', route, '333', handleSignIn);

    if (user) return <Redirect to="#menu" />;

    const welcomeMessage = route.path === 'login'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';
    return (
      <div className="row pt-5 align-items-center">
        <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
          <header className="text-center">
            <h2 className="mb-2">
              <i className="fa-solid fa-ring" />
              A-List Wedding
            </h2>
            <p className="text-muted mb-4">{welcomeMessage}</p>
          </header>
          <div className="card p-3 ">
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
