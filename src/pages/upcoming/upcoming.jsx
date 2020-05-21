import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectJoinedTrip } from '../../redux/trip/trip.selectors';
import TripPreview from '../../components/trip-preview/trip-preview';
import './upcoming.scss';

const UpcomingTrip = ({ trips }) => {
  const [state, setState] = useState({ upcoming: [] });
  useEffect(() => {
    const upcoming = [];
    trips.forEach((item) => {
      let end = new Date(`${item.date} ${item.time}`);
      let now = new Date();
      let distance = end - now;
      if (distance > 0) {
        upcoming.push(item);
      }
    });

    return setState({ upcoming });
  }, [trips]);
  return (
    <div className="upcoming-trip">
      <h1>Your Upcoming Trip(s): {state.upcoming.length}</h1>
      {state.upcoming.map((trip, index) => (
        <TripPreview key={index} trip={trip} />
      ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    trips: selectJoinedTrip(state.user.currentUser.id)(state),
  };
};
export default connect(mapStateToProps)(UpcomingTrip);
