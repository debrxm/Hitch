import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CreateRide from '../../pages/create-ride/create-ride';
import FindRide from '../../pages/find-ride/find-ride';
import Footer from '../../components/footer/footer';
import home from '../../assets/home.gif';
import './homepage.scss';

class Homepage extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
      });
    }
  }

  render() {
    return (
      <div className="home">
        {/* <div className="landing">
          <img src={home} alt="home" />
        </div> */}
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
