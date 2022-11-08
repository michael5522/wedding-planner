/* eslint-disable */
import React from 'react';
import AppContext from '../lib/app-context';
import GuestList from '../components/guestlist-manager-list';


export default class GuestListManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestFirstName: '',
      guestLastName: '',
      guestEmail: '',
      guestRelationship: '',
      bList: [],
      gettingData: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const myInit = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    }
    fetch('/api/guestListManager', myInit)
      .then(res => res.json())
      .then(data =>
        this.setState({
          bList: data,
          gettingData: false
        }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    // console.log(name, value)
    this.setState({ [name]: value });
  }

  addToGuestListManager(newItem) {
    const guestList = this.state.bList;
    const guestListCopy = [...guestList];
    const myInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(newItem)
    };
    fetch('api/GuestListAddEntry', myInit)
      .then(res => res.json())
      .then(data =>
        this.setState({
          bList: guestListCopy.concat(data),
          guestFirstName: '',
          guestLastName: '',
          guestEmail: '',
          guestRelationship: ''
        })
      );
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('it is a handle submit of the form inside wedding checklist---------');
    // console.log('inside handle submit', this.state);

    const newItem = {
      guestFirstName: this.state.guestFirstName,
      guestLastName: this.state.guestLastName,
      guestEmail: this.state.guestEmail,
      guestRelationship: this.state.guestRelationship
    };
    // console.log('new itammm', newItem)
    this.addToGuestListManager(newItem);
  }

  render() {
    console.log('this state current', this.state)
    if (this.state.gettingData) {
      // console.log('hit 1st run returning null going to component did mount')
      return null;
    }
    const { user } = this.context;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="container">

        <section>
          <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="rounded img-fluid img-half mx-auto d-block mb-4" alt="Responsive image" />
          <h3 className="text-center mb-2 pb-2 text-primary fw-bold">Guest List Manager</h3>
          <p className="text-center mb-2">
            Fill out your guest information below!
          </p>
          <a className="d-flex justify-content-center btn btn-outline-secondary mb-3" href="#menu"> Return to Menu</a>


          <div className="row">

            <div className="col-12 col-md-6">
              <form className="w-100" onSubmit={handleSubmit}>

                <div className="mb-1 mt-3">
                  <h4>Add to Guest List</h4>
                  <label htmlFor="guestFirstName" className="form-label">
                    First name:
                  </label>
                  <input
                    required
                    autoFocus
                    id="guestFirstName"
                    type="text"
                    name="guestFirstName"
                    value={this.state.guestFirstName}
                    onChange={handleChange}
                    className="form-control bg-light" />
                </div>

                <div className="mb-1">
                  <label htmlFor="guestLastName" className="form-label">
                    Last name:
                  </label>
                  <input
                    required
                    autoFocus
                    id="guestLastName"
                    type="text"
                    name="guestLastName"
                    value={this.state.guestLastName}
                    onChange={handleChange}
                    className="form-control bg-light" />
                </div>

                <div className="mb-1">
                  <label htmlFor="guestEmail" className="form-label">
                    Email address:
                  </label>
                  <input
                    required
                    autoFocus
                    id="guestEmail"
                    type="text"
                    name="guestEmail"
                    value={this.state.guestEmail}
                    onChange={handleChange}
                    className="form-control bg-light" />
                </div>

                <div className="mb-1">
                  <label htmlFor="guestRelationship" className="form-label">
                    Relationship:
                  </label>
                  <br />
                  <select name="guestRelationship" value={this.state.guestRelationship} onChange={handleChange} className="form-select form-control mb-3 bg-light show-tick" required>
                    <option value="" disabled>Make selection here</option>
                    <option value="Parent">Parent</option>
                    <option value="Close relative">Close relative</option>
                    <option value="Relative">Relative</option>
                    <option value="Close friend">Close friend</option>
                    <option value="Friend">friend</option>
                    <option value="Misc">Misc</option>
                  </select>
                </div>

                <div className="d-flex mt-2 mb-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Add to the List
                  </button>
                </div>

              </form>
            </div>

            <div className="col-12 col-md-6">
              <h4 className="d-flex justify-content-between align-items-center mb-2 mt-2">
                <span className="text-muted">Guest List</span>
                <span className="badge badge-secondary">#</span>
              </h4>

              <ul className="list-group mb-5 overflow-control">

                <GuestList gList={this.state.bList} />
                {/* <li className="list-group-item">

                  <h6>Hana Liu, friendo</h6>
                  <h6 className="text-muted font-italic">michekl@gmaio.com</h6>
                </li> */}

              </ul>
            </div>

          </div>
        </section>

      </div>
    );
  }

}
