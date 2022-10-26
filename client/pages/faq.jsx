import React from 'react';

export default function Faq(props) {
  return (
    <div className="container">

      <section>
        <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="rounded img-fluid img-half mx-auto d-block mb-4" alt="Responsive image" />
        <h3 className="text-center mb-2 pb-2 text-primary fw-bold">FAQ</h3>
        <p className="text-center mb-2">
          Find the answers for the most frequently asked questions below
        </p>
        <a className="d-flex justify-content-center btn btn-outline-secondary mb-2" href="#menu"> Return to Menu</a>

        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary"><i className="far fa-paper-plane text-primary pe-2" /> Do I need a wedding planner?</h6>
            <p>
              <strong><u>Absolutely</u></strong> not! We believe that a wedding planner is nice to have but not necessary.Some may be incredible at their jobs, and will go above and beyond, but most will not.
            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary"><i className="fas fa-pen-alt text-primary pe-2" /> What Does A Venue Coordinator Do?</h6>
            <p>
              Their job is to be your <strong><u>venue liaison, and ensure the smooth running of your day</u></strong> - but only for things that fall under the remit of the venue.
              Some venue coordinators will work with a local stylist or rental company on custom choices like centrepieces or chair coverings.

            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary"><i className="fas fa-user text-primary pe-2" /> How much does a wedding planner cost?
            </h6>
            <p>
              <strong><u>The cost of wedding planner can differ wildly depending on their experience</u></strong>, what they offer, and the kind of wedding you&apos; re having. Some will charge an hourly rate anywhere from $40 to $200, others will offer a package that includes a certain number of calls, in-person meetings as well as their day-of service, and others will charge a rate depending on your overall budget, usually 10-15%.
            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary"><i className="fas fa-rocket text-primary pe-2" /> Do you have to pay a wedding coordinator?
            </h6>
            <p>
              <strong><u>A venue coordinator is complimentary with the venue</u></strong>, though it is nice to leave a gratuity or give them a gift, or a thank-you card, if you&apos; re happy with their service.
            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary"><i className="fas fa-home text-primary pe-2" /> What Does A Wedding Stylist Do?
            </h6>
            <p><strong><u>A wedding stylist will design and decorate your wedding for you.</u></strong> A wedding stylist&apos; s role can be as in-depth as a creative director, and involve coming up with a colour palette and concept for your wedding. At other weddings, their role is as simple as executing the set-up on the day, and making sure everything is place.</p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary"><i className="fas fa-book-open text-primary pe-2" /> What Does A Wedding Planner Do?
            </h6>
            <p>
              <strong><u>A full-service wedding planner will help you find the right venue, source suppliers, realise your vision and stay in budget and that&apos; s all <i>before</i> the big day.</u></strong> On the day itself, they and their team will set the venue up for you, they&apos; ll keep tabs on all the suppliers, and they&apos; ll ensure you never hear about any last minute near-disasters.On the big day, you don&apos;t have to worry about a thing.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
