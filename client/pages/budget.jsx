/* eslint-disable */
import React from 'react';
import AppContext from '../lib/app-context';
import TodoList from '../components/budget-list'

export default class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      cost: '',
      bList: [],
      gettingData: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount(){
    const myInit = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    }
    fetch('/api/budgeter4', myInit)
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

  addToBudget(newItem){
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
    fetch('api/budgeterAdd', myInit)
      .then(res => res.json())
      .then(data =>
        this.setState({
          bList: budgetListCopy.concat(data),
          item: '',
          cost: ''
        })
      );
  }

  handleSubmit(event) {

    event.preventDefault();

    const newItem = {
      item: this.state.item,
      cost: this.state.cost
    };

    this.addToBudget(newItem);
  }

  deleteItem(itemToBeDeleted) {
    const iDofItem = itemToBeDeleted.itemId;
    console.log(iDofItem);
    const budgetList = this.state.bList;
    const budgetListCopy = [...budgetList];

    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.itemId === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }

    removeObjectWithId(budgetListCopy, iDofItem);
    const myInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`/api/deleteBudgetItem/${iDofItem}`, myInit)
      .then(
        this.setState({
          bList: budgetListCopy
        })
      )
  }

  render() {

    if(this.state.gettingData){
      return null;
    }
    const { user } = this.context;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <div className="position-relative overflow-hidden text-center menu-row">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal lustria-font menu-text">Budget Manager</h1>
            <p className="lead font-weight-normal lustria-font italic menu-text">Please fill out your budget below!</p>
            <a className="btn btn-outline-secondary lustria-font menu-text" href="#menu">Return to Menu</a>
          </div>
        </div>

        <div className="home-ultrabackground-9 p-1 mb-0 mt-0 d-flex container-fluid" />
        <div className="budget-fixed mt-0">
          <div className="container">

            <section>
              <img src="/images/list.png" className="img-fluid img-twenty mx-auto d-block mb-4" alt="Responsive image" />

              <div className="row">

                <div className="col-12 col-md-6">

                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="item" className="form-label">
                        <h4>Add an Category:</h4>
                      </label>
                      <input
                        required
                        autoFocus
                        id="item"
                        type="text"
                        name="item"
                        value={this.state.item}
                        onChange={handleChange}
                        className="form-control bg-light" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cost" className="form-label">
                        Cost:
                      </label>
                      <input
                        required
                        id="cost"
                        type="text"
                        name="cost"
                        value={this.state.cost}
                        onChange={handleChange}
                        className="form-control bg-light" />
                    </div>
                    <div className="d-flex ">
                      <button type="submit" className="btn btn-outline-secondary btn-block">
                        Add to List
                      </button>
                    </div>
                  </form>

                </div>

                <div className="col-12 col-md-6">
                  <h4 className="d-flex justify-content-between align-items-center mb-2 mt-2">
                    <span className="">Item List</span>
                    <span><i className="fas fa-balance-scale-left text-muted pe-2 mr-2" /></span>
                  </h4>

                  <ul className="list-group mb-2 overflow-control">

                    <TodoList todos={this.state.bList} delete={this.deleteItem} />

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
