import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CreateRide from '../../pages/create-ride/create-ride';
import FindRide from '../../pages/find-ride/find-ride';
import Footer from '../../components/footer/footer';
import { firestore } from '../../firebase/firebase.utils';
import TripPreview from '../../components/trip-preview/trip-preview';
import './homepage.scss';

class Homepage extends Component {
  state = {
    trips: [],
  };
  async componentDidMount() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const lat = position.coords.latitude;
    //     const long = position.coords.longitude;
    //   });
    // }
    const tripRef = firestore.collection('trips').orderBy('date', 'asc');
    tripRef.onSnapshot((snapshot) => {
      const trips = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().vacantSeats !== 0) {
          trips.push(doc.data());
        }
      });
      this.setState({ trips });
      console.log(this.state.trips);
    });
  }

  render() {
    return (
      <div className="home">
        {/* <div className="landing">
          <img src={home} alt="home" />
        </div> */}
        <div className="container">
          {this.state.trips.length !== 0
            ? this.state.trips.map((trip, index) => <TripPreview trip={trip} />)
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
