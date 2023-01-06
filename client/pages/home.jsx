import React from 'react';
import AppContext from '../lib/app-context';
import Carousel from '../components/carousel';
import MenuInfo from '../components/menu-info';

const fiveImages = [
  { url: '/images/img1.png', number: 0 },
  { url: '/images/img2.png', number: 1 },
  { url: '/images/img3.png', number: 2 },
  { url: '/images/img4.png', number: 3 },
  { url: '/images/img5.png', number: 4 }
];

export default class Home extends React.Component {
  render() {
    let homePageButton = null;
    const { user } = this.context;
    if (!user) {
      homePageButton = 'Register now!';
    } else {
      homePageButton = 'Click to Start Now!';
    }
    return (
      <div className="home-ultrabackground">
        <div className="position-relative overflow-hidden home-background" />

        <div className="home-black p-4 mb-3 mt-3 d-flex  justify-content-center aligh-items-center container-fluid">
          <div className="row">
            <h2 className="font-weight-bold mate-font col-12 text-center"> Your Customized Wedding Lists</h2>
            <h6 className="font-weight-normal mate-font italic col-12 text-center"> Start planning today!</h6>
          </div>

        </div>

        <div className="container">
          <div className="row mb-3 align-items-center justify-content-center">

            <div className="col-12 col-md-6">
              <h2 className="mt-1 lustria-font">Online</h2>
              <h2 className="lustria-font">Wedding Planning</h2>
              <h2 className="lustria-font">Assistant</h2>
              <h5 className="mb-3 lustria-font">Get started with planning</h5>
              <a href="#register" className="btn btn-outline-secondary mt-2 splash-button" role="button">{homePageButton}</a>

            </div>

            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Carousel poke={fiveImages} />
            </div>
          </div>
        </div>

        <div className="container">

          <MenuInfo />

        </div>

        <div className="home-black p-3 mb-3 mt-3 d-flex  justify-content-center aligh-items-center container-fluid">
          <div className="row">
            <h2 className="font-weight-bold mate-font col-12 text-center"> Example Features</h2>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-md-4 d-flex align-items-stretch justify-content-center">
              <div className="card border-dark mb-3 card-shadow home-card-background effect">
                <h5 className="card-header lustria-font text-white">Guest List Manager</h5>
                <div className="card-body text-white">
                  <p className="card-text lustria-font">Simplify address collection. <br />
                    Whether you’re having a wedding shower, engagement party or dinner, our guest list manager will assemble all your guest info.</p>
                </div>
              </div>

            </div>

            <div className="col-md-4 d-flex align-items-stretch justify-content-center">
              <div className="card border-dark mb-3 card-shadow home-card-background effect">
                <h5 className="card-header lustria-font text-white">A Wedding To-Do List</h5>
                <div className="card-body text-white">
                  <p className="card-text lustria-font">Add. Remove. Update. <br />
                    Your wedding to-do list is what you make it.
                    Easily update or change to fit your needs.</p>
                </div>
              </div>

            </div>

            <div className="col-md-4 d-flex align-items-stretch justify-content-center">
              <div className="card border-dark mb-3 card-shadow home-card-background effect">
                <h5 className="card-header lustria-font text-white">Set up your Budget</h5>
                <div className="card-body text-white">
                  <p className="card-text lustria-font">Stay on top of yours spending -<br /> Keep track of your total budget, the prices of everything, and any further outstanding fees!</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div className="position-relative overflow-hidden text-center  home-background-second menu-background">
          <div className="col-md-5 p-lg-5 mt-2">

            <h3 className="customfont1 mate-font">What people say</h3>
          </div>
          <h2 className="customfont1 mate-font text-white"> It is never too early to start planning</h2>
          <a href="#register" className="btn btn-link customfont1 lustria-font italic" role="button">{homePageButton}</a>
        </div>

      </div>

    );
  }
}

Home.contextType = AppContext;
