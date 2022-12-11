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
    this.deleteGuest = this.deleteGuest.bind(this);
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

    function compareRelationship(a, b) {
      console.log('1',a.guestRelationship,'2', b.guestRelationship)
      if (a.guestRelationship > b.guestRelationship) {
        return 1;
      } else if (a.guestRelationship < b.guestRelationship) {
        return -1;
      }
      return 0;
    }


    fetch('api/GuestListAddEntry', myInit)
      .then(res => res.json())
      .then(data =>{
        const newList = guestListCopy.concat(data);
        newList.sort(compareRelationship);
        console.log('this is the lateest list', newList)
        this.setState({
          bList: newList,
          guestFirstName: '',
          guestLastName: '',
          guestEmail: '',
          guestRelationship: ''
          })
        }
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

  deleteGuest(itemToBeDeleted){
    const iDofItem = itemToBeDeleted.guestId;
    console.log('id of item to be deleted',iDofItem);
    const guestList = this.state.bList;
    const guestListCopy = [...guestList];

    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.guestId === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }

    removeObjectWithId(guestListCopy, iDofItem);
    this.setState({
      bList: guestListCopy
    })

    console.log(this.state.bList);
    const myInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`/api/deleteGuest/${iDofItem}`, myInit)
    .then(
      this.setState({
        bList: guestListCopy
      })
    )
  }

  render() {
    if (this.state.gettingData) {
      // console.log('hit 1st run returning null going to component did mount')
      return null;
    }
    const { user } = this.context;
    const { handleChange, handleSubmit } = this;

    return (
      <div>

        <div className="position-relative overflow-hidden text-center menu-row">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal lustria-font menu-text">Guest List Manager</h1>
            <p className="lead font-weight-normal lustria-font italic menu-text">Fill out your guest information below!</p>
            <a className="btn btn-outline-secondary lustria-font menu-text" href="#menu">Return to Menu</a>
          </div>
        </div>

        <div className="home-ultrabackground-9 p-1 mb-0 mt-0 d-flex container-fluid" />
        <div className="guest-list-background-fixed mt-0">
          <div className="container">

            <section>
              <img src="/images/list.png" className="img-fluid img-twenty-five mx-auto d-block mb-4" alt="Responsive image" />


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
                        <option value="Friend">Friend</option>
                        <option value="Misc">Misc</option>
                      </select>
                    </div>

                    <div className="d-flex mt-2 mb-4">
                      <button type="submit" className="btn btn-outline-secondary btn-block">
                        Add to the List
                      </button>
                    </div>

                  </form>
                </div>

                <div className="col-12 col-md-6">
                  <h4 className="d-flex justify-content-between align-items-center mb-2 mt-2">
                    <span className="">Guest List</span>
                    <span><i className="fas fa-phone text-muted pe-2 mr-2" /></span>
                  </h4>

                  <ul className="list-group mb-5 overflow-control">

                    <GuestList gList={this.state.bList} delete={this.deleteGuest} />

                  </ul>
                </div>

              </div>
            </section>

          </div>

        </div>

        <div className="home-ultrabackground p-1 mb-0 mt-0 d-flex container-fluid" />
        <div className="home-black d-flex p-5 flex-grow-1 container-fluid" />
      </div>



    );
  }

}
