/* eslint-disable */
import React from 'react';
import AppContext from '../lib/app-context';
import TodoListWeddingCheckList from '../components/wedding-checklist-to-do-list';


export default class WeddingChecklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkListToDo: '',
      checkListCategory: '',
      bList: [],
      gettingData: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    const myInit = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    }
    fetch('/api/weddingCheckListUser', myInit)
      .then(res => res.json())
      .then(data =>
        this.setState({
          bList: data,
          gettingData: false
        }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addToWeddingChecklist(newItem) {
    const budgetList = this.state.bList;
    const budgetListCopy = [...budgetList];
    const myInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(newItem)
    };

    function compareNumbers(a, b) {
      return a.checkListCategory[0] - b.checkListCategory[0];
    }
    fetch('/api/weddingCheckListAdd', myInit)
      .then(res => res.json())
      .then(data => {
        const newList = this.state.bList.concat(data);
        newList.sort(compareNumbers);
        this.setState({
          bList: newList,
          checkListToDo: '',
          checkListCategory: '',
        })
      }
    );
  }

  deleteItem(itemToBeDeleted) {
    const iDofItem = itemToBeDeleted.checkListId;
    console.log(iDofItem);
    const weddingCheckList = this.state.bList;
    const weddingCheckListCopy = [...weddingCheckList];

    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.checkListId === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }

    removeObjectWithId(weddingCheckListCopy, iDofItem);

    const myInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`/api/deleteWeddingCheckListItem/${iDofItem}`, myInit)
      .then(
        this.setState({
          bList: weddingCheckListCopy
        })
      )

  }

  handleSubmit(event) {
    event.preventDefault();

    const newItem = {
      checkListToDo: this.state.checkListToDo,
      checkListCategory: this.state.checkListCategory
    };
    console.log('new itammm',newItem)
    this.addToWeddingChecklist(newItem);
  }

  render() {
    if (this.state.gettingData) {
      console.log('hit 1st run returning null going to component did mount')
      return null;
    }
    const { user } = this.context;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <div className="position-relative overflow-hidden text-center menu-row">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal lustria-font menu-text">Wedding Timeline</h1>
            <p className="lead font-weight-normal lustria-font italic menu-text">Please fill out your timeline below!</p>
            <a className="btn btn-outline-secondary lustria-font menu-text" href="#menu">Return to Menu</a>
          </div>
        </div>

        <div className="home-ultrabackground-9 p-1 mb-0 mt-0 d-flex container-fluid" />
        <div className="wedding-checklist-fixed mt-0">
          <div className="container">

            <section>
              <img src="/images/list.png" className="img-fluid img-twenty mx-auto d-block mb-4" alt="Responsive image" />

              <div className="row">

                <div className="col-12 col-md-6">
                  <form className="w-100" onSubmit={handleSubmit}>

                    <div className="mb-3 mt-3">
                      <label htmlFor="checkListToDo" className="form-label">
                        <h4>Add to Timeline:</h4>
                      </label>
                      <input
                        required
                        autoFocus
                        id="checkListToDo"
                        type="text"
                        name="checkListToDo"
                        value={this.state.checkListToDo}
                        onChange={handleChange}
                        className="form-control bg-light" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="checkListCategory" className="form-label">
                        Category:
                      </label>
                      <br />
                      <select name="checkListCategory" value={this.state.checkListCategory} onChange={handleChange} className="form-select form-control mb-3 bg-light show-tick" required>
                        <option value="" disabled>Select Category here</option>
                        <option value="1. &nbsp;&nbsp;Day of Wedding">Day Of Wedding</option>
                        <option value="2. &nbsp;&nbsp;One week to go">1 Week to go</option>
                        <option value="3. &nbsp;&nbsp;One month to go">1 Month to go</option>
                        <option value="4. &nbsp;&nbsp;Three month to go">3 Month to go</option>
                        <option value="5. &nbsp;&nbsp;Half Year to go">6 Month to go</option>
                        <option value="6. &nbsp;&nbsp;One Year+ to go">1 Year plus to go</option>
                      </select>
                    </div>

                    <div className="d-flex mt-4">
                      <button type="submit" className="btn btn-outline-secondary btn-block">
                        Add to the List
                      </button>
                    </div>

                  </form>
                </div>

                <div className="col-12 col-md-6">
                  <h4 className="d-flex justify-content-between align-items-center mb-2 mt-2">
                    <span className="">Timeline</span>
                    <span><i className="fas fa-route text-muted pe-2 mr-2" /></span>
                  </h4>

                  <ul className="list-group mb-5 overflow-control">

                    <TodoListWeddingCheckList todos={this.state.bList} delete={this.deleteItem} />

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
