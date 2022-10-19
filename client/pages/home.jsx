import React from 'react';

export default function Home(props) {
  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col">
          <h2 className="mt-1">Online</h2>
          <h2>Wedding Planning</h2>
          <h2>Assistant</h2>
          <h5 className="mb-3">Get started with planning</h5>
          <a href="#login" className="btn btn-outline-secondary mt-2" role="button">Sign up for free!</a>

        </div>
        <div className="col d-flex align-items-center">
          <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="rounded img-fluid" alt="Responsive image" />
        </div>
      </div>
      <div className="row">
        <h3>Example Benefits:</h3>
      </div>
      <div className="row bg-light">
        <div className="col-md-4 border rounded">
          <h4>Guest List Manager</h4>
          <h6 className="italic">Simplify address collection</h6>
          <p className="text-justify indent"><br />Whether you’re having a wedding shower, bach party, engagement party or rehearsal dinner, our guest list manager was thoughtfully designed to help you gather guest info and keep it organized for any and all of your events.</p>
        </div>

        <div className="col-md-4 border rounded">
          <h4>Wedding Checklist</h4>
          <h6 className="italic">A Wedding To-Do List</h6>
          <p className="text-justify"><br />Add. Remove. Update. <br />
            Your wedding to-do list is what you make it. <br />
            Easily update or change to fit your needs.</p>
        </div>

        <div className="col-md-4 border rounded">
          <h4>Budgeter</h4>
          <h6 className="italic">Set up your Budget!</h6>
          <p className="text-justify"><br />Stay on top of yours spending - keep track of your total budget, prices, deposits, and any outstanding fees</p>
        </div>
      </div>
    </div>
  );
}
