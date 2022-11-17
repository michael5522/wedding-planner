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
    // fetch('/api/budgeter44')
    //   .then(res => res.json())
    //   .then(data =>
    //     this.setState({
    //       bList: data,
    //       gettingData: false
    //     }));
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
    // console.log('it is a register handle submit');
    // console.log('inside handle submit', this.state);
    const newItem = {
      item: this.state.item,
      cost: this.state.cost
    };
    // console.log('new itammm',newItem)
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
      console.log('hit 1st run returning null going to component did mount')
      return null;
    }
    const { user } = this.context;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="container">

        <section>
          <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="rounded img-fluid img-half mx-auto d-block mb-4" alt="Responsive image" />
          <h3 className="text-center mb-2 pb-2 text-primary fw-bold">Budget Manager</h3>
          <p className="text-center mb-2">
            Please fill out your budget below!
          </p>
          <a className="d-flex justify-content-center btn btn-outline-secondary mb-3" href="#menu"> Return to Menu</a>


          <div className="row">

            <div className="col-12 col-md-6">

              <form className="w-100" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="item" className="form-label">
                    Add an Item:
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
                  <button type="submit" className="btn btn-primary btn-block">
                    Add to List
                  </button>
                </div>
              </form>

            </div>

            <div className="col-12 col-md-6">
              <h4 className="d-flex justify-content-between align-items-center mb-2 mt-2">
                <span className="text-muted">Item List</span>
                <span className="badge badge-secondary">#</span>
              </h4>

              <ul className="list-group mb-2">

                <TodoList todos={this.state.bList} delete={this.deleteItem}/>

              </ul>
            </div>

          </div>
        </section>

      </div>
    );
  }

}
