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
    seatCost,
    numberPlate,
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
  passangers.forEach((item) => {
    if (item.id === currentUser.id) {
      setState({ isPassanger: true });
    }
  });
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
    });
  };
  return (
    <div className="trip-preview">
      {state.isSuccess ? (
        <span className="success">Trip Successfully Joined</span>
      ) : null}
      <div className="trip-preview-info">
        <div className="trip-info">
          <div className="trip-info-head">
            <span>{pickUpPoint ? pickUpPoint : 'Kano'}</span>
            <span>
              <svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path
                      d="M501.333,234.667H68.417l109.792-109.792c2-2,3.125-4.708,3.125-7.542V96c0-4.313-2.594-8.208-6.583-9.854
			c-1.323-0.552-2.708-0.813-4.083-0.813c-2.771,0-5.5,1.083-7.542,3.125l-160,160c-4.167,4.167-4.167,10.917,0,15.083l160,160
			c3.063,3.042,7.615,3.969,11.625,2.313c3.99-1.646,6.583-5.542,6.583-9.854v-21.333c0-2.833-1.125-5.542-3.125-7.542
			L68.417,277.333h432.917c5.896,0,10.667-4.771,10.667-10.667v-21.333C512,239.438,507.229,234.667,501.333,234.667z"
                    />
                  </g>
                </g>
              </svg>
            </span>
            <span>{destination ? destination : 'Lagos'}</span>
          </div>
          <div className="trip-info-date-time">
            <span>{date ? date : '2020-05-21'}</span>
            <span>{time ? time : '2:40'}</span>
          </div>
          <span className="vacant">
            {' '}
            {vacantSeats ? vacantSeats : 0} seat(s) available
          </span>
          <br />
          <span className="cost"> RM{seatCost ? seatCost : 0} / seat</span>
          <br />
          <span className="car-type">{carType ? carType : 'Jeep'}</span>
          <br />
          <span className="car-type">
            {numberPlate ? numberPlate : 'YTW653T'}
          </span>
          <br />
          <span className="car-type">
            {driver.id === currentUser.id ? 'You' : driver.name} created this
            trip
          </span>
        </div>
        {driver.id === currentUser.id ? (
          <button className="btn edit" style={{ marginTop: '15px' }}>
            Edit
          </button>
        ) : state.isPassanger ? (
          <button className="btn joined" style={{ marginTop: '15px' }}>
            Joined
          </button>
        ) : state.isSuccess ? (
          <button className="btn joined" style={{ marginTop: '15px' }}>
            Joined
          </button>
        ) : vacantSeats === 0 ? (
          <button className="btn no-vacant" style={{ marginTop: '15px' }}>
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
      <div className="car-image">Car Image</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(TripPreview);
