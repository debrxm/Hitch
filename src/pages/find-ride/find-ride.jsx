import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input';
import CustomButton from '../../components/custom-button/custom-button';
import loader from '../../assets/loader.gif';
import left from '../../assets/left.svg';

import './find-ride.scss';
class FindRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      destination: '',
      errorMessage: '',
      isLoading: false,
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { location, destination } = this.state;

    try {
      this.setState({ isLoading: true });

      this.setState({ location: '', destination: '' });
    } catch (error) {}

    // this.setState({ location: '', destination: '' });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  };
  render() {
    const { location, destination, errorMessage, isLoading } = this.state;
    return (
      <div className="find-ride">
        <div>
          <h3 className="title">FIND RIDE</h3>
          {errorMessage !== '' ? (
            <span className="error">{errorMessage}</span>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="text"
              name="location"
              value={location}
              required
              handleChange={this.handleChange}
              label="Location"
            />
            <FormInput
              type="text"
              name="destination"
              value={destination}
              required
              handleChange={this.handleChange}
              label="Destination"
            />
            <div className="buttons">
              <CustomButton type="button" onClick={this.handleSubmit}>
                Find {isLoading ? <img src={loader} alt="Loader" /> : null}
              </CustomButton>
            </div>
          </form>
        </div>
        <div className="home">
          <Link to="/">
            <img src={left} alt="Back Icon" />
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(FindRide);
