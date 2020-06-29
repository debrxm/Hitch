import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectATrip } from '../../redux/trip/trip.selectors';
import { updateTrip } from '../../firebase/firebase.utils';
import { PostFetch, Message } from '../../components/email/message';
import { editTrip } from '../../redux/trip/trip.actions';
import './trippage.scss';
const TripPage = ({ trip, currentUser, history, editTrip }) => {
  const {
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
  } = trip[0];
  const [state, setState] = useState({
    numberOfPassanger: '',
    isPassanger: false,
    isSuccess: false,
  });
  useEffect(() => {
    passangers.filter((item, index) => {
      return item.id === currentUser.id ? setState({ isPassanger: true }) : '';
    });
  }, [currentUser.id, passangers]);
  const goToEditTripPage = () => {
    editTrip(trip[0]);
    history.push(`/edit-trip`);
  };
  const handleJoinTrip = async (e) => {
    e.preventDefault();
    console.log(id, 1, currentUser);
    await updateTrip(id, 1, currentUser);
    const { displayName, phone, email } = currentUser;
    const url = 'https://treep-back-end.herokuapp.com/jointrip';
    // const url = 'http://localhost:8080/jointrip';
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
  };
  return (
    <div className="trip-page">
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
          <div className="trip-owner">
            <img
              src={
                driver.profile_pic
                  ? driver.profile_pic
                  : 'https://user-images.githubusercontent.com/1927295/68068778-fed0c900-fd69-11e9-95c1-29dd8e8134af.png'
              }
              alt="driver pic"
            />
            <div className="text-content">
              <span className="driver-name">
                <strong>Driver</strong>:{' '}
                <small>
                  {driver.id === currentUser.id ? 'You' : driver.name}
                </small>
              </span>
              <br />
              <span className="driver-age">
                <strong>Age</strong>:{' '}
                <small>{driver.age ? driver.age : '-'}</small>
              </span>
              <br />
              <span className="driver-email">
                <strong>Gender</strong>:{' '}
                <small>{driver.gender ? driver.gender : '-'}</small>
              </span>
              <br />
              <span className="driver-phone">
                <strong>Phone</strong>: <small>{driver.phone}</small>
              </span>
            </div>
          </div>
          <br />
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
            <strong>Number Plate:</strong>{' '}
            <small>{numberPlate ? numberPlate : 'YTW653T'}</small>
          </span>
          <br />

          <div className="passangers">
            <h6>Passanger(s): {passangers.length}</h6>
            <ul>
              {passangers.map((item, index) => (
                <li key={index} className="passanger">
                  <img
                    src={
                      item.profile_pic
                        ? item.profile_pic
                        : 'https://p7.hiclipart.com/preview/702/518/323/passenger-computer-icons-travel-baggage-business-travel.jpg'
                    }
                    alt="passanger pic"
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {driver.id === currentUser.id ? (
          <button
            className="btn edit"
            style={{ marginTop: '15px' }}
            onClick={goToEditTripPage}
          >
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
          <button className="btn" onClick={handleJoinTrip}>
            Join Trip
          </button>
        )}
      </div>
      {/* <div className="car-image">Car Image</div> */}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  editTrip: (trip) => dispatch(editTrip(trip)),
});

const mapStateToProps = (state, ownProps) => {
  return {
    trip: selectATrip(ownProps.match.params.tripId, ownProps.match.url)(state),
    currentUser: state.user.currentUser,
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TripPage)
);
