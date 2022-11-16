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
    // console.log(name, value)
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
      // console.log('1',a.foodCategory,'2', b.foodCategory)
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
        console.log('this is the latest list',newList)
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
    // console.log('handle submit ------it is a handle submit of the form inside wedding checklist');
    // console.log('handle submit -------inside handle submit', this.state);

    const newItem = {
      foodItem: this.state.foodItem,
      foodCategory: this.state.foodCategory
    };
    console.log('new itammm', newItem)
    this.addToFoodList(newItem);
  }

  deleteItem(itemToBeDeleted){
    console.log('delete item triggering item:', itemToBeDeleted.foodId);
    const iDofItem = itemToBeDeleted.foodId;
    console.log(iDofItem);
    const foodList = this.state.foodList;
    const foodListCopy = [...foodList];
    console.log('food list complete', foodList, foodListCopy);
    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.foodId === id);
      arr.splice(objWithIdIndex, 1);

      return arr;
    }

    removeObjectWithId(foodListCopy, iDofItem);
    console.log('answer????',foodListCopy)
  }

  render() {
    // console.log(this.state)

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
          <h3 className="text-center mb-2 pb-2 text-primary fw-bold">Wedding Catering List</h3>
          <p className="text-center mb-2">
            Please list your food requirements below!
          </p>
          <a className="d-flex justify-content-center btn btn-outline-secondary mb-3" href="#menu"> Return to Menu</a>


          <div className="row">

            <div className="col-12 col-md-6">
              <form className="w-100" onSubmit={handleSubmit}>

                <div className="mb-3 mt-3">
                  <label htmlFor="foodItem" className="form-label">
                    Add to Food List:
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
                  <button type="submit" className="btn btn-primary btn-block">
                    Add to the List
                  </button>
                </div>

              </form>
            </div>

            <div className="col-12 col-md-6">
              <h4 className="d-flex justify-content-between align-items-center mb-2 mt-2">
                <span className="text-muted">Food List</span>
                <span className="badge badge-secondary">Category</span>
              </h4>

              <ul className="list-group mb-5 overflow-control">
                <WeddingCateringList todos={this.state.foodList} delete={this.deleteItem}/>
              </ul>
            </div>

          </div>
        </section>

      </div>
    );
  }

}
