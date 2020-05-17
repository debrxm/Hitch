import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Footer from '../../components/footer/footer';
import { selectAllTrip } from '../../redux/trip/trip.selectors';
import TripPreview from '../../components/trip-preview/trip-preview';
import './homepage.scss';

const Homepage = ({ trips }) => {
  return (
    <div className="home">
      <div className="container">
        <h1>
          ({trips.filter((item, index) => item.vacantSeats !== 0).length}
          )Upcoming Trips With Vacant Seats
        </h1>
        {trips.length !== 0
          ? trips
              .filter((item, index) => item.vacantSeats !== 0)
              .map((trip, index) => <TripPreview key={index} trip={trip} />)
          : null}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  trips: selectAllTrip,
});

export default connect(mapStateToProps)(Homepage);
