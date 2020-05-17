import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectAllTrip } from '../../redux/trip/trip.selectors';
import Footer from '../../components/footer/footer';
import TripPreview from '../../components/trip-preview/trip-preview';
import './alltrip.scss';

const AllTripPage = ({ trips }) => {
  return (
    <div className="home">
      <div className="container">
        <h1>
          ({trips.length}
          )Trips
        </h1>
        {trips.length !== 0
          ? trips
              .filter((item, index) => index < 10)
              .map((trip, index) => <TripPreview key={index} trip={trip} />)
          : null}
        <div className="all-trip">
          {trips.length > 10 ? (
            <button className="btn">Load More</button>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  trips: selectAllTrip,
});

export default connect(mapStateToProps)(AllTripPage);
