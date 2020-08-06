import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import menu from '../../assets/menu.svg';
import logo from '../../assets/logo.png';
import close from '../../assets/close.svg';
import SideNav from '../side-nav/side-nav';
import './header.scss';

const Header = ({ currentUser }) => {
  const [isShow, setisShow] = useState(false);
  const handleToggleSidebar = () => {
    setisShow(!isShow);
  };
  return (
    <>
      <SideNav handleToggleSidebar={handleToggleSidebar} isShow={isShow} />
      <div className="container">
        <div className="header">
          {currentUser ? (
            <div className="menu">
              <img
                src={isShow ? close : menu}
                alt="Menu-Button"
                className="menu-btn"
                onClick={handleToggleSidebar}
              />
            </div>
          ) : null}

          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(Header));
