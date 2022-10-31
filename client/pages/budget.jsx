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
  }

  componentDidMount(){
    fetch('/api/budgeter44')
      .then(res => res.json())
      .then(data =>
        this.setState({
          bList: data,
          gettingData: false
        }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    // console.log('name--', name);
    // console.log('value--', value);
    this.setState({ [name]: value });
  }

  handleSubmit(event) {

    event.preventDefault();
    console.log('it is a register handle submit');
    console.log('inside handle submit', this.state);
    // const req = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // };
    // fetch(`/api/auth/${action}`, req)
    //   .then(res => res.json())
    //   .then(result => {
    //     console.log('auth result:', result);
    //     console.log('token', result.token);
    //     console.log('result.user', result.user);
    //     if (action === 'register') {
    //       window.location.hash = 'login';
    //     } else if (result.user && result.token) {
    //       console.log('this is triggering!!1');
    //       this.props.onSignIn(result);
    //     }
    //   });
    this.setState({
      item: '',
      cost: ''
    });
  }

  render() {
    if(this.state.gettingData){
      console.log('hit 1st run returning null going to component did mount')
      return null;
    }
    console.log('this is isnide budget',this.state.bList);
    const { user } = this.context;
    const { handleChange, handleSubmit } = this;
    // console.log(' inside budget, the state', this.state);
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
            <div className="col">
              <h4 className="d-flex justify-content-between align-items-center mb-2 mt-2">
                <span className="text-muted">Item List</span>
                <span className="badge badge-secondary">3</span>
              </h4>

              <ul className="list-group mb-2">

                {/* <li className="list-group-item d-flex justify-content-between">
                  <h6>Cake</h6>
                  <h6 className="text-muted">$500</h6>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <h6>Wedding Dress</h6>
                  <h6 className="text-muted">$2000</h6>
                </li> */}
                <TodoList todos={this.state.bList} />

              </ul>
            </div>
            <div className="col">

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
          </div>
        </section>

      </div>
    );
  }

}

// function TodoList() {
//   return (
//     <ul className="list-group shadow-sm">
//       {
//         this.state.todos.map(todo => {
//           return (
//             <p>
//               <li className="list-group-item d-flex justify-content-between">
//                 <h6>{item}</h6>
//                 <h6 className="text-muted">{cost}</h6>
//               </li>
//             </p>
//           );
//         })
//       }
//     </ul>
//   );
// }
