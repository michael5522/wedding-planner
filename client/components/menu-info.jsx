import React from 'react';

export default function MenuInfo(props) {
  return (
    <div className="row custom-row">
      <div className="col-12 col-md-6 d-flex justify-content-center img-hover-zoom img-hover-zoom-blur">
        <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzE1fHx3ZWRkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" className="img-fluid image-size card-shadow-type-2" alt="Responsive image" />
      </div>

      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
        <div>
          <h3 className="mb-0 lustria-font">Redefining the</h3>
          <h3 className="mb-0 lustria-font">Event Planning</h3>
          <h3 className="mb-10 lustria-font">Experience</h3>
          <p className="mt-3">
            Weddings are full of love, dancing and…planning. There’s a lot of decisions and steps, but with our checklist, you can make sure you have it all! <br />
            Inside the included tools, <strong>you can set your budget.</strong> It’s highly advised this be one of the very first priorities. Why? It’ll set the precedent for everything else.<br />
            You may also <strong>put together the guest list. </strong>Why do you have to do this early? To know approximately what sized wedding venue you’ll be booking! <br />
            <strong>Hiring a planner? </strong>Start with them early on; they have the experience to make the overall process easier.
          </p>
        </div>

      </div>

    </div>
  );
}
