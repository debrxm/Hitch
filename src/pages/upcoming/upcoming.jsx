import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { firestore } from '../../firebase/firebase.utils';
import './upcoming.scss';

const UpcomingTrip = ({ currentUser }) => {
  const [state, setState] = useState({ upcomingTrip: [] });
  useEffect(async () => {
    const tripRef = firestore.collection(`trips`);
    await tripRef.onSnapshot(async (snapshot) => {
      const trips = [];
      await snapshot.docs.forEach(async (doc) => {
        // trips =
        await doc.data().passangers.forEach((item) => {
          if (item.id === currentUser.id) {
            trips.push(doc.data());
          }
        });
        setState({ upcomingTrip: trips });
      });
    });
    console.log(state.upcomingTrip);
  }, []);
  return (
    <div className="upcoming-trip">
      <h1>Your Upcoming Trip(s)</h1>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(UpcomingTrip);
