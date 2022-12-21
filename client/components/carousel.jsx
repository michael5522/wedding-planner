import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: 0,
      status: null
    };
    this.autoTimer = this.autoTimer.bind(this);
  }

  autoTimer(event) {
    if (this.state.photo === this.props.poke.length - 1) {
      this.setState({
        photo: 0
      });
    } else {
      this.setState({
        photo: this.state.photo + 1
      });
    }
    clearInterval(this.state.status);
    this.setState({
      status: setInterval(this.autoTimer, 8000)
    });
  }

  componentDidMount() {
    this.setState({ status: setInterval(this.autoTimer, 8000) });

  }

  render() {
    const total = this.props.poke;

    return (
      <div><img src={total[this.state.photo].url} className="rounded card-shadow img-fluid" alt="Responsive image" /></div>
    );
  }
}

export default Carousel;
