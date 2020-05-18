import React from 'react';
import { connect } from 'react-redux';
import { selectJoinedTrip } from '../../redux/trip/trip.selectors';
import TripPreview from '../../components/trip-preview/trip-preview';
import './upcoming.scss';

const UpcomingTrip = ({ trips }) => {
  return (
    <div className="upcoming-trip">
      <h1>Your Upcoming Trip(s): {trips.length}</h1>
      {trips.map((trip, index) => (
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
