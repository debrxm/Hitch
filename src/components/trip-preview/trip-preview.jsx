import React, { useState, useEffect } from 'react';
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
    passangers,
  },
  currentUser,
}) => {
  const [state, setState] = useState({
    numberOfPassanger: '',
    isPassanger: false,
    isSuccess: false,
  });
  useEffect(() => {
    passangers.forEach((item) => {
      if (item.id === currentUser.id) {
        setState({ isPassanger: true });
      }
    });
  }, []);
  const handleJoinTrip = async (e) => {
    e.preventDefault();
    if (state.numberOfPassanger) {
      await updateTrip(id, state.numberOfPassanger, currentUser);
      const { displayName, phone, email } = currentUser;
      // const url = 'https://treep-back-end.herokuapp.com/jointrip';
      const url = 'http://localhost:8080/jointrip';
      const messageHtml = Message({
        displayName,
        phone,
        email,
        destination,
        date,
        driver,
      });
      const messageToSend = {
        email: driver.email,
        subject: `New Message From Treep`,
        html: messageHtml,
      };
      PostFetch(url, messageToSend);
      setState({ isSuccess: true });
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
      {!state.isSuccess ? (
        <span className="success">Trip Successfully Joined</span>
      ) : null}
      <ul>
        <li>Pick Up Point: {pickUpPoint}</li>
        <li>Destination: {destination}</li>
        <li>Date: {date}</li>
        <li>Time: {time}</li>
        <li>Vacant Seat (s): {vacantSeats}</li>
        <li>Car Type: {carType}</li>
      </ul>
      {state.isPassanger || state.isSuccess ? (
        <button className="btn" style={{ marginTop: '15px' }}>
          Joined
        </button>
      ) : vacantSeats === 0 ? (
        <button className="btn" style={{ marginTop: '15px' }}>
          No Vacant Seat
        </button>
      ) : (
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
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(TripPreview);
