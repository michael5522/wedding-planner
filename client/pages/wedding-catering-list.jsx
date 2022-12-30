/* eslint-disable */
import React from 'react';
import AppContext from '../lib/app-context';
import WeddingCateringList from '../components/wedding-checklist-catering-list';

export default class CateringList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItem: '',
      foodCategory: '',
      foodList: [],
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
    fetch('/api/foodListManagerListByUser', myInit)
      .then(res => res.json())
      .then(data =>
        this.setState({
          foodList: data,
          gettingData: false
        }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addToFoodList(newItem) {
    const foodList = this.state.foodList;
    const foodListCopy = [...foodList];
    const myInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(newItem)
    };

    function compareFoodCategory(a,b){
      if(a.foodCategory > b.foodCategory){
        return 1;
      }else if (a.foodCategory < b.foodCategory){
        return -1;
      }
      return 0;
    }

    fetch('/api/addToFoodList', myInit)
      .then(res => res.json())
      .then(data => {
        const newList = foodListCopy.concat(data);
        newList.sort(compareFoodCategory);
        this.setState({
          foodList: newList,
          foodItem: '',
          foodCategory: '',
        })
      }
      );
  }

  handleSubmit(event) {
    event.preventDefault();

    const newItem = {
      foodItem: this.state.foodItem,
      foodCategory: this.state.foodCategory
    };
    this.addToFoodList(newItem);
  }

  deleteItem(itemToBeDeleted){
    const iDofItem = itemToBeDeleted.foodId;
    const foodList = this.state.foodList;
    const foodListCopy = [...foodList];

    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.foodId === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }

    removeObjectWithId(foodListCopy, iDofItem);

    const myInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`/api/deleteFoodItem/${iDofItem}`, myInit)
      .then(
        this.setState({
          foodList: foodListCopy
        })
      )
  }

  render() {

    if (this.state.gettingData) {
      return null;
    }
    const { user } = this.context;
    const { handleChange, handleSubmit } = this;

    return (
      <div>

        <div className="position-relative overflow-hidden text-center menu-row">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal lustria-font menu-text">Wedding Catering List</h1>
            <p className="lead font-weight-normal lustria-font italic menu-text">Please list your food requirements below!</p>
            <a className="btn btn-outline-secondary lustria-font menu-text" href="#menu">Return to Menu</a>
          </div>
        </div>

        <div className="home-ultrabackground-9 p-1 mb-0 mt-0 d-flex container-fluid" />
        <div className="wedding-catering-list-fixed mt-0">
          <div className="container">

            <section>
              <img src="/images/list.png" className="img-fluid img-twenty mx-auto d-block mb-4" alt="Responsive image" />

              <div className="row">

                <div className="col-12 col-md-6">
                  <form className="w-100" onSubmit={handleSubmit}>

                    <div className="mb-3 mt-3">
                      <label htmlFor="foodItem" className="form-label">
                        <h4>Add to Food List:</h4>
                      </label>
                      <input
                        required
                        autoFocus
                        id="foodItem"
                        type="text"
                        name="foodItem"
                        value={this.state.foodItem}
                        onChange={handleChange}
                        className="form-control bg-light" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="foodCategory" className="form-label">
                        Category:
                      </label>
                      <br />
                      <select name="foodCategory" value={this.state.foodCategory} onChange={handleChange} className="form-select form-control mb-3 bg-light show-tick" required>
                        <option value="" disabled>Select Category here</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Grains">Grains</option>
                        <option value="Protien Foods">Protein Foods</option>
                        <option value="Sweets">Sweets</option>
                        <option value="Vegetables">Vegetables</option>
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
                    <span className="">Food List</span>
                    <span><i className="fas fa-utensils text-muted pe-2 mr-2" /></span>
                  </h4>

                  <ul className="list-group mb-5 overflow-control">
                    <WeddingCateringList todos={this.state.foodList} delete={this.deleteItem} />
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
