import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Footer from '../../components/footer/footer';
import { firestore } from '../../firebase/firebase.utils';
import TripPreview from '../../components/trip-preview/trip-preview';
import './homepage.scss';

class Homepage extends Component {
  state = {
    trips: [],
  };
  async componentDidMount() {
    const tripRef = firestore.collection('trips').orderBy('date', 'asc');
    tripRef.onSnapshot((snapshot) => {
      const trips = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().vacantSeats !== 0) {
          trips.push(doc.data());
        }
      });
      this.setState({ trips });
    });
  }

  render() {
    return (
      <div className="home">
        <div className="container">
          <h1>({this.state.trips.length})Upcoming Trips With Vacant Seats</h1>
          {this.state.trips.length !== 0
            ? this.state.trips
                .filter((item, index) => index < 5)
                .map((trip, index) => <TripPreview key={index} trip={trip} />)
            : null}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
