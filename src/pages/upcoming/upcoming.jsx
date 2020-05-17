import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllTrip } from '../../redux/trip/trip.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import TripPreview from '../../components/trip-preview/trip-preview';
import './upcoming.scss';

const UpcomingTrip = ({ currentUser, trips }) => {
  const [state, setState] = useState({ upcomingTrip: [] });
  useEffect(() => {
    const comingTrip = [];
    trips.forEach((item) => {
      item.passangers.forEach((sItem) => {
        if (sItem.id === currentUser.id) {
          comingTrip.push(item);
        }
      });
    });
    setState({ upcomingTrip: comingTrip });
  }, []);

  return (
    <div className="upcoming-trip">
      <h1>Your Upcoming Trip(s): {state.upcomingTrip.length}</h1>
      {state.upcomingTrip.map((trip, index) => (
        <TripPreview key={index} trip={trip} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  trips: selectAllTrip,
});
export default connect(mapStateToProps)(UpcomingTrip);
