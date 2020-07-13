import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { updateRead } from '../../firebase/firebase.utils';
import './notification-view.scss';

const NotificationView = ({ data, currentUser }) => {
  const [read, setRead] = useState(false);
  const handleRead = () => {
    setRead(true);
    updateRead(currentUser.id, data.id);
  };
  return (
    <div
      className="notification-view"
      style={
        data.isRead
          ? { borderColor: 'black' }
          : { borderColor: 'green', boxShadow: '0px 3px 5px #008000a8' }
      }
    >
      <img src={data.pic} alt="user icon" />
      <div className="message-text">
        <div className="message-head" onClick={handleRead}>
          <h2>{data.title}</h2>
          <svg
            style={
              read
                ? { transform: 'rotate(0deg)' }
                : { transform: 'rotate(180deg)' }
            }
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.4 0.300049L6 4.90009L10.6 0.300049L12 1.70009L6 7.70005L0 1.70009L1.4 0.300049Z"
              fill="black"
            />
          </svg>
        </div>
        {read && <span>{data.info}</span>}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(NotificationView);
