import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllTrip } from '../../redux/trip/trip.selectors';
import Footer from '../../components/footer/footer';
import TripPreview from '../../components/trip-preview/trip-preview';
import './alltrip.scss';

const AllTripPage = ({ trips }) => {
  const [state, setState] = useState({ treeps: [] });
  useEffect(() => {
    const treeps = [];
    trips.forEach((item) => {
      let end = new Date(`${item.date} ${item.time}`);
      let now = new Date();
      let distance = end - now;
      if (distance <= 0) {
        item.isExpired = true
      }
      treeps.push(item)
    });

    return setState({ treeps });
  }, [trips]);
  return (
    <div className="all-trip-page">
      <div className="container">
        <h1>
          ({state.treeps.length}
          )Trips
        </h1>
        {state.treeps.length !== 0
          ? trips
            .filter((item, index) => index < 10)
            .map((trip, index) => trip.isExpired ? <TripPreview key={index} trip={trip} expired /> : <TripPreview key={index} trip={trip} />)
          : null}
        <div className="all-trip">
          {state.treeps.length > 10 ? (
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
