import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { firestore, uploadImage } from '../../firebase/firebase.utils';
import CustomButton from '../../components/custom-button/custom-button';
import { setFoundTrip } from '../../redux/trip/trip.actions';
import loader from '../../assets/loader.gif';
import left from '../../assets/left.svg';

import './find-ride.scss';
import FormSelect from '../../components/form-select/form-select';
class FindRide extends Component {
  state = {
    location: '',
    destination: '',
    file: '',
    errorMessage: '',
    isLoading: false,
  };
  // toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  handleFileChange = async (event) => {
    const { name, value } = event.target;
    // const file = event.target.files[0];
    // await uploadImage(file);
    this.setState({
      [name]: value,
      errorMessage: '',
    });
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
    const { location, destination, file, errorMessage, isLoading } = this.state;
    return (
      <div className="find-ride">
        <div>
          <h3 className="title">FIND TRIP</h3>
          {errorMessage !== '' ? (
            <span className="error">{errorMessage}</span>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <input
              type="file"
              name="file"
              value={file}
              onChange={this.handleFileChange}
            />
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
