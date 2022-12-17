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

        <div className="home-ultrabackground p-1 mb-0 mt-0 d-flex container-fluid" />

        <div className="album py-5 bg-light menu-background-fixed">
          <div className="container">
            <div className="row justify-content-center">

              <div className="col-md-4 d-flex">
                <a href="#faq" className="card mb-4 border rounded card-shadow border-dark home-card-background effect">
                  <div className="mx-auto mt-3 mb-3">
                    <i className="far fa-map pe-2 mr-2 fa-2x menu-text" />
                  </div>
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font text-white">FAQ</h5>
                    <p className="card-text italic mb-1 text-white">Frequently asked Questions!</p>
                    <p className="card-text indent text-justify text-white">Learn how to use this application. Anybody planning a wedding can take advantage of the easy-to-use interface that breaks wedding plans down into individual task checklists.</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#guestlist" className="card mb-4 border rounded card-shadow border-dark home-card-background effect">
                  <div className="mx-auto mt-3 mb-3">
                    <i className="fas fa-phone pe-2 mr-2 fa-2x menu-text" />
                  </div>
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font text-white">Guest List Manager</h5>
                    <p className="card-text italic mb-1 text-white">Simplify address Collection!</p>
                    <p className="card-text indent text-justify text-white">Whether you’re having a wedding shower, bach party, engagement party or rehearsal dinner, our guest list manager was thoughtfully designed to help you gather guest info and keep it organized for any and all of your events!</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#weddingchecklist" className="card mb-4 border rounded card-shadow border-dark home-card-background effect">
                  <div className="mx-auto mt-3 mb-3">
                    <i className="fas fa-route pe-2 mr-2 fa-2x menu-text" />
                  </div>
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font text-white">Wedding Timeline</h5>
                    <p className="card-text italic mb-1 text-white">A Wedding arrangement of events!</p>
                    <p className="card-text indent text-justify text-white">Add. Remove. Your wedding timeline list is what you make it.Easily update or change to fit your needs.</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#budgetlist" className="card mb-4 border rounded card-shadow border-dark home-card-background effect">
                  <div className="mx-auto mt-3 mb-3">
                    <i className="fas fa-balance-scale-left pe-2 mr-2 fa-2x menu-text" />
                  </div>
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font text-white">Budgeter</h5>
                    <p className="card-text italic mb-1 text-white">Set up your Budget!</p>
                    <p className="card-text indent text-justify text-white">Stay on top of yours spending - keep track of your total budget, prices, deposits, and any outstanding fees!</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#cateringlist" className="card mb-4 border rounded card-shadow border-dark home-card-background effect">
                  <div className="mx-auto mt-3 mb-3">
                    <i className="fas fa-utensils pe-2 mr-2 fa-2x menu-text" />
                  </div>
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font text-white">Catering List</h5>
                    <p className="card-text italic mb-1 text-white">Keep track of the foods!</p>
                    <p className="card-text indent text-justify text-white">Whether you’re having a wedding shower, bach party, engagement party or rehearsal dinner, our guest list manager was thoughtfully designed to help you gather guest info and keep it organized for any and all of your events!</p>
                  </div>
                </a>
              </div>

              <div className="col-md-4 d-flex">
                <a href="#guideline" className="card mb-4 border rounded card-shadow border-dark home-card-background effect">
                  <div className="mx-auto mt-3 mb-3">
                    <i className="fas fa-hands-helping pe-2 mr-2 fa-2x menu-text" />
                  </div>
                  <div className="card-body padding-0-for-card-body">
                    <h5 className="card-title mb-2 text-center lustria-font text-white">Wedding Planning Guide</h5>
                    <p className="card-text italic mb-1 text-white">Click here for a clickstart guide!</p>
                    <p className="card-text indent text-justify text-white">This Guide will help you visualize what you need to do, and when to do it! We will help you walk though step by step and make it as easy as 1,2,3!</p>
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* <div className="home-black p-4 mb-3 mt-0 d-flex  justify-content-center aligh-items-center container-fluid" /> */}
        <div className="home-ultrabackground p-1 mb-0 mt-0 d-flex container-fluid" />
        <div className="home-black d-flex p-5 flex-grow-1 container-fluid" />

      </div>
    );
  }
}

Menu.contextType = AppContext;
