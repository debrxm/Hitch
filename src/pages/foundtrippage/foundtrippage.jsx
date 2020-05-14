import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFoundTrip } from '../../redux/trip/trip.selectors';
import './foundtrippage.scss';
import TripPreview from '../../components/trip-preview/trip-preview';
const FoundTripPage = ({ foundTrip }) => {
  return (
    <div className="foundtrippage">
      {foundTrip.length === 0 ? '' : <h1>Found {foundTrip.length} Trip(s)</h1>}
      {foundTrip.length === 0 ? (
        <div className="no-trip-found">
          <h1>No Trip Found</h1>
        </div>
      ) : (
        foundTrip.map((trip, index) => (
          <div className="found-trip" key={index}>
            <div className="trips">
              <TripPreview trip={trip} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  foundTrip: selectFoundTrip,
});

export default connect(mapStateToProps)(FoundTripPage);
