import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectJoinedTrip } from '../../redux/trip/trip.selectors';
import TripPreview from '../../components/trip-preview/trip-preview';
import './history.scss';
const History = ({ trips }) => {
  const [state, setState] = useState({ history: [] });
  useEffect(() => {
    const history = [];
    trips.forEach((item) => {
      let end = new Date(`${item.date} ${item.time}`);
      let now = new Date();
      let distance = end - now;
      if (distance <= 0) {
        history.push(item);
      }
    });

    return setState({ history });
  }, [trips]);
  return (
    <div className="history">
      <h1>HISTORY</h1>
      {state.history.map((trip, index) => (
        <TripPreview key={index} trip={trip} expired />
      ))}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    trips: selectJoinedTrip(state.user.currentUser.id)(state),
  };
};
export default connect(mapStateToProps)(History);
