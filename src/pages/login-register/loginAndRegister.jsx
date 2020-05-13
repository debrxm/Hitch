import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button';
import './loginAndRegister.scss';
const LoginAndRegister = () => {
  return (
    <div className="login-register">
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
