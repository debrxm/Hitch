import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { firestore } from '../../firebase/firebase.utils';
import './upcoming.scss';

const UpcomingTrip = ({ currentUser }) => {
  const [state, setState] = useState({ upcomingTrip: '' });
  useEffect(() => {
    const tripRef = firestore.collection(`trips`);
    tripRef.onSnapshot((snapshot) => {
      const trips = [];
      snapshot.docs.forEach((doc) => {
        // trips =
        console.log(doc.data().passangers);

        // trips.push(
        //   doc
        //     .data()
        //     .passangers.filter((item, index) => item.id === currentUser.id)[0]
        // );
      });
      setState({ upcomingTrip: trips });
      console.log(state.upcomingTrip);
    });
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
