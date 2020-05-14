import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="btns">
        <Link to="/find-ride">
          <button className="btn">Find Trip</button>
        </Link>
        <Link to="/create-ride">
          <button className="btn">Create Trip</button>
        </Link>
      </div>
      <p className="copyright">&copy; Hitch {new Date().getFullYear}</p>
    </footer>
  );
};

export default Footer;
