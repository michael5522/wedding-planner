/* eslint-disable */
import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    console.log('it is a register handle submit');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        console.log('auth result:', result);
        console.log('token', result.token);
        console.log('result.user', result.user);
        if (action === 'register') {
          window.location.hash = 'login';
        } else if (result.user && result.token) {
          console.log('this is triggering!!1');
          this.props.onSignIn(result);
        }
      });

  }

  render() {
    console.log(this.state);
    const { action } = this.props;
    console.log('inside auth form', action);
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'register'
      ? '#login'
      : '#register';
    const alternatActionText = action === 'register'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'register'
      ? 'Register'
      : 'Log In';
    if (action === 'login') {
      return (
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label lustria-font">
              <i className="fas fa-envelope fa-fw"></i>
              Email
            </label>
            <input
              required
              autoFocus
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label lustria-font">
              <i className="fas fa-key fa-fw"></i>
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small>
              <a className="text-muted lustria-font" href={alternateActionHref}>
                {alternatActionText}
              </a>
            </small>
            <button type="submit" className="btn btn-light lustria-font">
              {submitButtonText}
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label lustria-font">
              <i className="fas fa-user fa-fw"></i>
               First Name
            </label>
            <input
              required
              autoFocus
              id="firstName"
              type="text"
              name="firstName"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label lustria-font">
              <i className="fas fa-user fa-fw"></i>
              Last Name
            </label>
            <input
              required
              autoFocus
              id="lastName"
              type="text"
              name="lastName"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label lustria-font">
              <i className="fas fa-envelope fa-fw"></i>
              Email
            </label>
            <input
              required
              autoFocus
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label lustria-font">
              <i className="fas fa-key fa-fw"></i>
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <small>
              <a className="text-muted lustria-font" href={alternateActionHref}>
                {alternatActionText}
              </a>
            </small>
            <button type="submit" className="btn btn-light lustria-font">
              {submitButtonText}
            </button>
          </div>
        </form>
      );
    }
  }

}
