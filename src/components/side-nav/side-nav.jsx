import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
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
      <h3>Sidebar</h3>
      {currentUser ? (
        <div className="user" onClick={logUserOut}>
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
