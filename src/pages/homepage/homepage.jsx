import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectAllTrip } from '../../redux/trip/trip.selectors';
import Footer from '../../components/footer/footer';
import TripPreview from '../../components/trip-preview/trip-preview';
import './homepage.scss';

const Homepage = ({ trips }) => {
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
    <div className="home">
      <div className="container">
        <h1>
          ({state.upcoming.filter((item, index) => item.vacantSeats !== 0).length}
          )Upcoming Trips With Vacant Seats
        </h1>
        {state.upcoming.length !== 0
          ? state.upcoming
            .filter((item, index) => item.vacantSeats !== 0)
            .map((trip, index) => <TripPreview key={index} trip={trip} />)
          : null}
        <div className="all-trip">
          <Link to="/trips">
            <button className="btn">Show All Trips</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  trips: selectAllTrip,
});

export default connect(mapStateToProps)(Homepage);
