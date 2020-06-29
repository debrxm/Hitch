import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import CustomButton from '../../components/custom-button/custom-button';
import { setFoundTrip } from '../../redux/trip/trip.actions';
import loader from '../../assets/loader.gif';
import left from '../../assets/left.svg';
import FormInput from '../../components/form-input/form-input';
import FormSelect from '../../components/form-select/form-select';

import './find-ride.scss';
class FindRide extends Component {
  state = {
    location: '',
    destination: '',
    date: '',
    time: '',
    today: '',
    errorMessage: '',
    isLoading: false,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
        errorMessage: '',
      },
      () => console.log(this.state)
    );
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { location, destination, date, time } = this.state;
    try {
      this.setState({ isLoading: true });
      const tripUrl =
        location !== '' && destination !== '' && date !== '' && time !== ''
          ? firestore
              .collection(`trips`)
              .where('pickUpPoint', '==', `${location.toLowerCase()}`)
              .where('destination', '==', `${destination.toLowerCase()}`)
              .where('date', '==', `${date}`)
              .where('time', '==', `${time}`)
          : location !== '' && destination !== ''
          ? firestore
              .collection(`trips`)
              .where('pickUpPoint', '==', `${location.toLowerCase()}`)
              .where('destination', '==', `${destination.toLowerCase()}`)
          : destination !== '' && date !== ''
          ? firestore
              .collection(`trips`)
              .where('destination', '==', `${destination.toLowerCase()}`)
              .where('date', '==', `${date}`)
          : destination !== '' && time !== ''
          ? firestore
              .collection(`trips`)
              .where('destination', '==', `${destination.toLowerCase()}`)
              .where('time', '==', `${time}`)
          : date !== '' && time !== ''
          ? firestore
              .collection(`trips`)
              .where('date', '==', `${date}`)
              .where('time', '==', `${time}`)
          : destination !== ''
          ? firestore
              .collection(`trips`)
              .where('destination', '==', `${destination.toLowerCase()}`)
          : date !== ''
          ? firestore.collection(`trips`).where('date', '==', `${date}`)
          : firestore.collection(`trips`).where('time', '==', `${time}`);

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
  componentDidMount() {
    const now = new Date();

    const day = ('0' + (now.getDate() + 1)).slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);

    const today = now.getFullYear() + '-' + month + '-' + day;
    this.setState({ today });
  }
  render() {
    const {
      location,
      destination,
      date,
      time,
      today,
      errorMessage,
      isLoading,
    } = this.state;
    return (
      <div className="find-ride">
        <div>
          <h3 className="title">FIND TRIP</h3>
          {errorMessage !== '' ? (
            <span className="error">{errorMessage}</span>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <FormSelect
              name="location"
              value={location}
              opt="Pick Up Point"
              handleChange={this.handleChange}
              options={[
                'Alor Setar',
                'Batu Pahat',
                'Butterworth',
                'Cukai',
                'George Town',
                'Johor Bahru',
                'Ipoh',
                'Kampong Baharu',
                'Kampung Lemal',
                'Kampung Sungai Pasir',
                'Kangar',
                'Ketereh',
                'Klang',
                'Kulang',
                'Kota Bharu',
                'Kota Kinabalu',
                'Kuala Lipis',
                'Kuala Lumpur',
                'Kuala Terangganu',
                'Kuantan',
                'Kuching',
                'Melaka',
                'Lahad Datu',
                'Miri',
                'Muar',
                'Pasri Mas',
                'Pulai Chondong',
                'Raub',
                'Sandakan',
                'Seramban',
                'Seramban Garden',
                'Shah Alam',
                'Taiping',
                'Tawau',
                'Teluk intan',
                'Tumpat',
                'Victoria',
              ]}
            />
            <FormSelect
              name="destination"
              value={destination}
              opt="Destination"
              handleChange={this.handleChange}
              options={[
                'Alor Setar',
                'Batu Pahat',
                'Butterworth',
                'Cukai',
                'George Town',
                'Johor Bahru',
                'Ipoh',
                'Kampong Baharu',
                'Kampung Lemal',
                'Kampung Sungai Pasir',
                'Kangar',
                'Ketereh',
                'Klang',
                'Kulang',
                'Kota Bharu',
                'Kota Kinabalu',
                'Kuala Lipis',
                'Kuala Lumpur',
                'Kuala Terangganu',
                'Kuantan',
                'Kuching',
                'Melaka',
                'Lahad Datu',
                'Miri',
                'Muar',
                'Pasri Mas',
                'Pulai Chondong',
                'Raub',
                'Sandakan',
                'Seramban',
                'Seramban Garden',
                'Shah Alam',
                'Taiping',
                'Tawau',
                'Teluk intan',
                'Tumpat',
                'Victoria',
              ]}
            />
            <FormInput
              type="text"
              name="date"
              value={date}
              required
              min={today}
              handleChange={this.handleChange}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              label="Trip Date"
            />
            <FormInput
              type="text"
              name="time"
              value={time}
              required
              handleChange={this.handleChange}
              onFocus={(e) => (e.target.type = 'time')}
              onBlur={(e) => (e.target.type = 'text')}
              label="Trip Time"
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
