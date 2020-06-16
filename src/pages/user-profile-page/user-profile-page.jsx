import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.utils';
// import StarRating from '../../components/rating/rating';
import Spinner from '../../components/spinner/spinner';

import './user-profile-page.scss';

const UserProfilePage = ({ currentUser, history }) => {

  const handleSignout = () => {
    auth.signOut();
    history.push(`/`);
  };
  return (
    <div className="user-profile-page main">
      {currentUser ? (
        <div className="user-profile">
          <div className="profile-page-header">
            <div className="profile-pic_buttons">
              <div className="group">
                <div
                  className="profile-pic"
                  style={currentUser.profile_pic !== '' ? { backgroundImage: `url(${currentUser.profile_pic} )` } : {}}
                >
                </div>
                <span>{currentUser.displayName}</span>
              </div>
              <div className="buttons">
                <Link to="/edit-profile">
                  <span>Edit Profile</span>
                </Link>
                <span className="logout" onClick={handleSignout}>
                  Logout
                </span>
              </div>
            </div>
          </div>
          <div className="user-details">
            No of Trips Created: {currentUser.trips && currentUser.trips.length}
          </div>
        </div>
      ) : (
          <Spinner />
        )}
    </div>)
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(UserProfilePage));
