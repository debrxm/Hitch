import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button';
import carpool from '../../assets/carpool.svg';
import './loginAndRegister.scss';
const LoginAndRegister = () => {
  return (
    <div
      className="login-register"
      style={{
        backgroundImage: `linear-gradient(#000000c5, #0000009d), url(${carpool})`,
      }}
    >
      <div className="wrap">
        <div className="buttons">
          <Link to="/login">
            <CustomButton>Login</CustomButton>
          </Link>
          <Link to="/register">
            <CustomButton>Register</CustomButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
