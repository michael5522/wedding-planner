import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Menu extends React.Component {
  render() {

    // if (!this.context.user) return <Redirect to="sign-in" />;
    if (!this.context.user) return <Redirect to="" />;
    const { user } = this.context;
    return (
      <div>

        <div className="position-relative overflow-hidden text-center menu-row">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal lustria-font menu-text">Welcome {user.username},</h1>
            <p className="lead font-weight-normal lustria-font italic menu-text">Get Started by clicking on an option below!</p>
            <a className="btn btn-outline-secondary lustria-font menu-text" href="#">Return Home</a>
          </div>
        </div>

        <div className="album py-5 bg-light menu-background-fixed">
          <div className="container">
            <div className="row justify-content-center">

              <div className="col-md-4 d-flex">
                <a href="#faq" className="card mb-4 box-shadow border rounded card-shadow border-dark">
                  <img className="card-img-top img-fluid" src="/images/happy.jpeg" alt="Card image cap" />
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font"><i className="far fa-map text-muted pe-2 mr-2" />FAQ</h5>
                    <p className="card-text italic mb-1">Click here to quickstart guide!</p>
                    <p className="card-text indent text-justify">Learn how to use this application. Anybody planning a wedding can take advantage of the easy-to-use interface that breaks wedding plans down into individual task checklists.</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#guestlist" className="card mb-4 box-shadow border card-shadow border-dark rounded">
                  <img className="card-img-top img-fluid" src="/images/happy.jpeg" alt="Card image cap"/>
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font"><i className="fas fa-phone text-muted pe-2 mr-2" />Guest List Manager</h5>
                    <p className="card-text italic mb-1">Simplify address Collection!</p>
                    <p className="card-text indent text-justify">Whether you’re having a wedding shower, bach party, engagement party or rehearsal dinner, our guest list manager was thoughtfully designed to help you gather guest info and keep it organized for any and all of your events!</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#weddingchecklist" className="card mb-4 box-shadow border rounded card-shadow border-dark">
                  <img className="card-img-top img-fluid" src="/images/happy.jpeg" alt="Card image cap" />
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font"><i className="fas fa-route text-muted pe-2 mr-2" />Wedding Timeline</h5>
                    <p className="card-text italic mb-1">A Wedding arrangement of events!</p>
                    <p className="card-text indent text-justify">Add. Remove. Your wedding timeline list is what you make it.Easily update or change to fit your needs.</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#budgetlist" className="card mb-4 box-shadow border rounded card-shadow border-dark">
                  <img className="card-img-top img-fluid" src="/images/happy.jpeg" alt="Card image cap" />
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font"><i className="fas fa-balance-scale-left text-muted pe-2 mr-2" />Budgeter</h5>
                    <p className="card-text italic mb-1">Set up your Budget!</p>
                    <p className="card-text indent text-justify">Stay on top of yours spending - keep track of your total budget, prices, deposits, and any outstanding fees!</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#cateringlist" className="card mb-4 box-shadow border rounded card-shadow border-dark">
                  <img className="card-img-top img-fluid" src="/images/happy.jpeg" alt="Card image cap" />
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font"><i className="fas fa-utensils text-muted pe-2 mr-2" />Catering List</h5>
                    <p className="card-text italic mb-1">Keep track of the foods!</p>
                    <p className="card-text indent text-justify">Whether you’re having a wedding shower, bach party, engagement party or rehearsal dinner, our guest list manager was thoughtfully designed to help you gather guest info and keep it organized for any and all of your events!</p>
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

Menu.contextType = AppContext;
