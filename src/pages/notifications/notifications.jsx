import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NotificationView from '../../components/notification-view/notification-view';
import './notifications.scss';
import { firestore } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Notifications = ({ currentUser }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const getNotifications = async () => {
      const userRef = firestore
        .collection('users')
        .doc(currentUser.id)
        .collection('notifications');
      // .orderBy('time', 'desc');

      const notys = [];
      userRef.onSnapshot((snapShot) => {
        snapShot.docs.forEach((item) => {
          notys.push(item.data());
        });
        setNotifications(notys);
      });
    };
    getNotifications();
  }, ['']);
  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      <div className="notifications">
        {notifications.map((item, index) => (
          <NotificationView key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Notifications);
