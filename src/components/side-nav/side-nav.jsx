import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase.utils';
import { Link, withRouter } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import logout from '../../assets/logout.svg';
import './side-nav.scss';
const SideNav = ({ history, isShow, currentUser }) => {
  const logUserOut = async () => {
    await auth.signOut();
    window.location.reload();
    history.push('/login');
  };
  return (
    <div className={`${isShow ? 'active' : ''} side-nav`}>
      <ul className="links">
        <li>
          <Link to="/history" className="link">
            HISTORY
          </Link>
        </li>
        <li>
          <Link to="/upcoming-trip" className="link">
            UPCOMING TRIP
          </Link>
        </li>
        <li>
          <Link to="/expired-trip" className="link">
            EXPIRED TRIP
          </Link>
        </li>
      </ul>
      {currentUser ? (
        <div className="logout" onClick={logUserOut}>
          <span>Logout</span>
          <img src={logout} alt="Logout-Button" />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(SideNav));
