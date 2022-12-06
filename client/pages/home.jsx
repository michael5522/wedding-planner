import React from 'react';
import AppContext from '../lib/app-context';
import Carousel from '../components/carousel';
import MenuInfo from '../components/menu-info';

// export default function Home(props) {
//   return (
//     <div className="container">
//       <div className="row mb-2">
//         <div className="col">
//           <h2 className="mt-1">Online</h2>
//           <h2>Wedding Planning</h2>
//           <h2>Assistant</h2>
//           <h5 className="mb-3">Get started with planning</h5>
//           <a href="#register" className="btn btn-outline-secondary mt-2" role="button">Sign up for free!</a>

//         </div>
//         <div className="col d-flex align-items-center">
//           <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="rounded img-fluid" alt="Responsive image" />
//         </div>
//       </div>
//       <div className="row">
//         <h3>Example Benefits:</h3>
//       </div>
//       <div className="row bg-light">
//         <div className="col-md-4 border rounded">
//           <h4>Guest List Manager</h4>
//           <h6 className="italic">Simplify address collection</h6>
//           <p className="text-justify"><br />Whether you’re having a wedding shower, bach party, engagement party or rehearsal dinner, our guest list manager was thoughtfully designed to help you gather guest info and keep it organized for any and all of your events.</p>
//         </div>

//         <div className="col-md-4 border rounded">
//           <h4>Wedding Checklist</h4>
//           <h6 className="italic">A Wedding To-Do List</h6>
//           <p className="text-justify"><br />Add. Remove. Update. <br />
//             Your wedding to-do list is what you make it. <br />
//             Easily update or change to fit your needs.</p>
//         </div>

//         <div className="col-md-4 border rounded">
//           <h4>Budgeter</h4>
//           <h6 className="italic">Set up your Budget!</h6>
//           <p className="text-justify"><br />Stay on top of yours spending - keep track of your total budget, prices, deposits, and any outstanding fees</p>
//         </div>
//       </div>
//     </div>
//   );
// }
const pokedex = [
  { url: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80', number: 0 },
  { url: 'https://images.unsplash.com/photo-1525441273400-056e9c7517b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', number: 1 },
  { url: 'https://images.unsplash.com/reserve/xd45Y326SvKzSR3Nanc8_MRJ_8125-1.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80', number: 2 },
  { url: 'https://images.unsplash.com/photo-1624067078399-be29c52a2b12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', number: 3 },
  { url: 'https://images.unsplash.com/photo-1523974715800-1f7cef033969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', number: 4 }
];

export default class Home extends React.Component {
  render() {
    let homePageButton = null;
    const { user } = this.context;
    if (!user) {
      homePageButton = 'Sign up for Free!';
    } else {
      homePageButton = 'Click to Start Now!';
    }
    return (
      <div>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center home-background">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h2 className="display-4 font-weight-normal lustria-font"> A-List Wedding Planning Services</h2>
            <p className="lead font-weight-normal lustria-font italic"> Your dream is our wish!</p>
          </div>
        </div>
        <div className="container">
          <div className="row mb-2 align-items-center justify-content-center">

            <div className="col-12 col-md-6">
              <h2 className="mt-1 lustria-font">Online</h2>
              <h2 className="lustria-font">Wedding Planning</h2>
              <h2 className="lustria-font">Assistant</h2>
              <h5 className="mb-3 lustria-font">Get started with planning</h5>
              <a href="#register" className="btn btn-outline-secondary mt-2 splash-button" role="button">{homePageButton}</a>

            </div>

            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              {/* <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="rounded img-fluid" alt="Responsive image" /> */}
              <Carousel poke={pokedex} />
            </div>
          </div>

          <MenuInfo />

          <div className="row align-items-center justify-content-center custom-row-2 mt-1">
            <h3 className="lustria-font">Example Features:</h3>
          </div>
          <div className="row custom-row-2">

            <div className="col-md-4 d-flex align-items-stretch justify-content-center ">
              <div className="card border-dark mb-3 card-shadow">
                <div className="card-header lustria-font">Guest List Manager</div>
                <div className="card-body text-dark">
                  <p className="card-text">Simplify address collection. <br />
                    Whether you’re having a wedding shower, engagement party or dinner, our guest list manager will assemble all your guest info.</p>
                </div>
              </div>

            </div>

            <div className="col-md-4 d-flex align-items-stretch justify-content-center menu-top-margin">
              <div className="card border-dark mb-3 card-shadow">
                <div className="card-header lustria-font">A Wedding To-Do List</div>
                <div className="card-body text-dark">
                  <p className="card-text">Add. Remove. Update. <br />
                    Your wedding to-do list is what you make it.
                    Easily update or change to fit your needs.</p>
                </div>
              </div>

            </div>

            <div className="col-md-4 d-flex align-items-stretch justify-content-center menu-top-margin">
              <div className="card border-dark mb-3 card-shadow">
                <div className="card-header lustria-font">Set up your Budget!</div>
                <div className="card-body text-dark">
                  <p className="card-text">Stay on top of yours spending -<br /> Keep track of your total budget, the prices of everything, and any further outstanding fees!</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    );
  }
}

Home.contextType = AppContext;
