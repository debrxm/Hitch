import React from 'react';
import './trip-preview.scss';
const TripPreview = ({
  trip: { pickUpPoint, destination, date, time, vacantSeats, carType },
}) => {
  return (
    <div className="trip-preview">
      <ul>
        <li>Pick Up Point: {pickUpPoint}</li>
        <li>Destination: {destination}</li>
        <li>Date: {date}</li>
        <li>Time: {time}</li>
        <li>Vacant Seat(s): {vacantSeats}</li>
        <li>Car Type: {carType}</li>
      </ul>
      <button className="btn">Join Trip</button>
    </div>
  );
};

export default TripPreview;
