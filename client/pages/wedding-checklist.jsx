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
    console.log(name, value)
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

  handleSubmit(event) {
    event.preventDefault();
    // console.log('it is a handle submit of the form inside wedding checklist');
    // console.log('inside handle submit', this.state);

    const newItem = {
      checkListToDo: this.state.checkListToDo,
      checkListCategory: this.state.checkListCategory
    };
    console.log('new itammm',newItem)
    this.addToWeddingChecklist(newItem);
  }

  render() {
    // console.log(this.state)
    if (this.state.gettingData) {
      console.log('hit 1st run returning null going to component did mount')
      return null;
    }
    const { user } = this.context;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="container">

        <section>
          <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="rounded img-fluid img-half mx-auto d-block mb-4" alt="Responsive image" />
          <h3 className="text-center mb-2 pb-2 text-primary fw-bold">Wedding Checklist</h3>
          <p className="text-center mb-2">
            Please fill out your checklist below!
          </p>
          <a className="d-flex justify-content-center btn btn-outline-secondary mb-3" href="#menu"> Return to Menu</a>


          <div className="row">

            <div className="col-12 col-md-6">
              <form className="w-100" onSubmit={handleSubmit}>

                <div className="mb-3 mt-3">
                  <label htmlFor="checkListToDo" className="form-label">
                    Add to CheckList:
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
                  <br/>
                  <select  name="checkListCategory" value={this.state.checkListCategory} onChange={handleChange} className="form-select form-control mb-3 bg-light show-tick" required>
                    <option  value="" disabled>Select Category here</option>
                    <option value="1. &nbsp;&nbsp;Day of Wedding">Day Of Wedding</option>
                    <option value="2. &nbsp;&nbsp;One week to go">1 Week to go</option>
                    <option value="3. &nbsp;&nbsp;One month to go">1 Month to go</option>
                    <option value="4. &nbsp;&nbsp;Three month to go">3 Month to go</option>
                    <option value="5. &nbsp;&nbsp;Half Year to go">6 Month to go</option>
                    <option value="6. &nbsp;&nbsp;One Year+ to go">1 Year plus to go</option>
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
                <span className="text-muted">Timeline</span>
                <span className="badge badge-secondary">Tasks</span>
              </h4>

              <ul className="list-group mb-5 overflow-control">

                <TodoListWeddingCheckList todos={this.state.bList} />

              </ul>
            </div>

          </div>
        </section>

      </div>
    );
  }

}
