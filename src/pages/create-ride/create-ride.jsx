import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Link, withRouter } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input';
import { createTrip } from '../../firebase/firebase.utils';
import CustomButton from '../../components/custom-button/custom-button';
import loader from '../../assets/loader.gif';
import left from '../../assets/left.svg';

import './create-ride.scss';
class CreateRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickUpPoint: '',
      destination: '',
      date: '',
      time: '',
      carType: '',
      vacantSeats: '',
      errorMessage: '',
      isLoading: false,
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      pickUpPoint,
      destination,
      date,
      time,
      vacantSeats,
      carType,
    } = this.state;

    try {
      this.setState({ isLoading: true });
      const tripData = {
        driver: {
          name: this.props.currentUser.displayName,
          phone: this.props.currentUser.phone,
          email: this.props.currentUser.email,
        },
        pickUpPoint,
        destination,
        date,
        time,
        vacantSeats,
        carType,
        passangers: [],
      };
      await createTrip(tripData);

      this.setState({
        pickUpPoint: '',
        destination: '',
        date: '',
        time: '',
        carType: '',
        vacantSeats: '',
      });
    } catch (error) {}

    // this.setState({ pickUpPoint: '', destination: '' });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  };
  render() {
    const {
      pickUpPoint,
      destination,
      date,
      time,
      vacantSeats,
      carType,
      errorMessage,
      isLoading,
    } = this.state;
    return (
      <div className="create-ride">
        <div>
          <h3 className="title">CREATE RIDE</h3>
          {errorMessage !== '' ? (
            <span className="error">{errorMessage}</span>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="text"
              name="pickUpPoint"
              value={pickUpPoint}
              required
              handleChange={this.handleChange}
              label="Pick Up Point"
            />
            <FormInput
              type="date"
              name="date"
              value={date}
              required
              handleChange={this.handleChange}
              label=""
            />
            <FormInput
              type="time"
              name="time"
              value={time}
              required
              handleChange={this.handleChange}
              label=""
            />
            <FormInput
              type="text"
              name="carType"
              value={carType}
              required
              handleChange={this.handleChange}
              label="Car Type"
            />
            <FormInput
              type="number"
              name="vacantSeats"
              value={vacantSeats}
              required
              handleChange={this.handleChange}
              label="Vacant Seats"
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
                CREATE {isLoading ? <img src={loader} alt="Loader" /> : null}
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
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(CreateRide));
