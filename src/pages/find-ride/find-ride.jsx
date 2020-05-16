import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import FormInput from '../../components/form-input/form-input';
import CustomButton from '../../components/custom-button/custom-button';
import { setFoundTrip } from '../../redux/trip/trip.actions';
import loader from '../../assets/loader.gif';
import left from '../../assets/left.svg';

import './find-ride.scss';
class FindRide extends Component {
  state = {
    location: '',
    destination: '',
    errorMessage: '',
    isLoading: false,
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { location, destination } = this.state;
    try {
      this.setState({ isLoading: true });
      const tripUrl =
        location !== ''
          ? firestore
              .collection(`trips`)
              .where('pickUpPoint', '==', `${location.toLowerCase()}`)
              .where('destination', '==', `${destination.toLowerCase()}`)
          : firestore
              .collection(`trips`)
              .where('destination', '==', `${destination.toLowerCase()}`);
      const tripRef = tripUrl;
      tripRef.onSnapshot((snapshot) => {
        const trips = [];
        snapshot.docs.forEach((doc) => {
          trips.push(doc.data());
        });
        this.props.setFoundTrip(trips);
      });
      this.setState({
        location: '',
        destination: '',
        isLoading: false,
      });
      this.props.history.push('/found-trip');
    } catch (error) {
      console.log('Error', error);
      this.setState({
        location: '',
        destination: '',
        isLoading: false,
      });
    }

    this.setState({ location: '', destination: '' });
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
          <h3 className="title">FIND TRIP</h3>
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

const mapDispatchToProps = (dispatch) => ({
  setFoundTrip: (trip) => dispatch(setFoundTrip(trip)),
});

export default withRouter(connect(null, mapDispatchToProps)(FindRide));
