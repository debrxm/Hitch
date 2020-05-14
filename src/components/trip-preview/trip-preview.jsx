import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { updateTrip } from '../../firebase/firebase.utils';
import { PostFetch, Message } from '../email/message';
import './trip-preview.scss';
const TripPreview = ({
  trip: {
    driver,
    pickUpPoint,
    destination,
    date,
    time,
    vacantSeats,
    carType,
    id,
  },
  currentUser,
}) => {
  const [state, setState] = useState({ numberOfPassanger: '' });
  const handleJoinTrip = async (e) => {
    e.preventDefault();
    if (state.numberOfPassanger) {
      await updateTrip(id, state.numberOfPassanger);
      // const { displayName, phone, email } = currentUser;
      // // const url = 'https://treep-back-end.herokuapp.com/jointrip';
      // const url = 'http://localhost:8080/jointrip';
      // const messageHtml = Message({
      //   displayName,
      //   phone,
      //   email,
      //   destination,
      //   date,
      //   driver,
      // });
      // const messageToSend = {
      //   wmail: driver.email,
      //   subject: `New Message From Treep`,
      //   html: messageHtml,
      // };
      // PostFetch(url, messageToSend);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      [name]: value,
      errorMessage: '',
    });
  };
  return (
    <div className="trip-preview">
      <ul>
        <li>Pick Up Point: {pickUpPoint}</li>
        <li>Destination: {destination}</li>
        <li>Date: {date}</li>
        <li>Time: {time}</li>
        <li>Vacant Seat (s): {vacantSeats}</li>
        <li>Car Type: {carType}</li>
      </ul>
      <form onSubmit={handleJoinTrip}>
        <input
          type="number"
          className="form-input"
          name="numberOfPassanger"
          value={state.numberOfPassanger}
          placeholder="No of passanger"
          max={vacantSeats}
          onChange={handleChange}
        />
        <button className="btn">Join Trip</button>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(TripPreview);
