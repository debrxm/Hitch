import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { setCurrentUser } from '../../redux/user/user.actions';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import FormInput from '../../components/form-input/form-input';
import CustomButton from '../../components/custom-button/custom-button';
import loader from '../../assets/loader.gif';
import left from '../../assets/left.svg';

import './register.scss';

class Register extends Component {
  state = {
    displayName: '',
    email: '',
    phone: '',
    age: '',
    selectGender: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    isLoading: false,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: '' });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      displayName,
      email,
      phone,
      age,
      selectGender,
      password,
      confirmPassword,
    } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        errorMessage: `Password did not match!`,
      });
      return;
    }
    try {
      this.setState({ isLoading: true });
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, {
        displayName,
        phone,
        age,
        gender: selectGender,
      });
      this.setState({ isSuccess: true }, () => this.props.history.push('/edit-profile'));
    } catch (error) {
      error.code === 'auth/email-already-in-use'
        ? this.setState({
          isLoading: false,
          errorMessage:
            'The email address is already in use by another account',
        })
        : error.code === 'auth/weak-password'
          ? this.setState({
            isLoading: false,
            errorMessage: 'Password should be at least 6 characters',
          })
          : this.setState({
            isLoading: false,
            errorMessage: 'Shit just got real',
          });
    }
    this.setState({
      displayName: '',
      email: '',
      phone: '',
      age: '',
      selectGender: '',
      password: '',
      confirmPassword: '',
    });
  };
  render() {
    const {
      displayName,
      email,
      phone,
      age,
      selectGender,
      password,
      confirmPassword,
      errorMessage,
      isLoading,
    } = this.state;
    return (
      <div className="register">
        <div>
          <h3 className="title">REGISTER</h3>
          {errorMessage !== '' ? (
            <span className="error">{errorMessage}</span>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              required
              label="Name"
              onChange={this.handleChange}
            />
            <FormInput
              type="number"
              name="phone"
              value={phone}
              required
              label="Phone Number"
              onChange={this.handleChange}
            />
            <FormInput
              type="email"
              name="email"
              value={email}
              required
              label="Email"
              onChange={this.handleChange}
            />
            <FormInput
              type="number"
              name="age"
              value={age}
              required
              label="Age"
              onChange={this.handleChange}
            />
            <select
              className="select-gender"
              name="selectGender"
              value={selectGender}
              onChange={this.handleChange}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <FormInput
              type="password"
              name="password"
              value={password}
              required
              label="Password"
              onChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
              label="Confirm password"
              onChange={this.handleChange}
            />
            <div className="buttons">
              <CustomButton type="submit">
                Register {isLoading ? <img src={loader} alt="Loader" /> : null}
              </CustomButton>
            </div>
          </form>
        </div>
        <div className="home">
          <Link to="/">
            <img src={left} alt="Back Icon" />
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(Register));
