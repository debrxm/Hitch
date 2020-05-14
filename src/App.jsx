import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import Header from './components/header/header';
import Homepage from './pages/homepage/homepage';
import LoginAndRegister from './pages/login-register/loginAndRegister';
import Login from './pages/login/login';
import Register from './pages/register/register';
import CreateRide from './pages/create-ride/create-ride';
import FindRide from './pages/find-ride/find-ride';
import './App.scss';
import FoundTripPage from './pages/foundtrippage/foundtrippage';

class App extends React.Component {
  state = {
    isLoading: true,
  };
  unSubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
      this.setState({
        isLoading: false,
      });
    });
  }
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <div className="wrapper">
          <Header />
          <Switch>
            <Route
              exact
              path="/create-ride"
              render={() =>
                currentUser ? <CreateRide /> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/find-ride"
              render={() =>
                currentUser ? <FindRide /> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/found-trip"
              render={() =>
                currentUser ? <FoundTripPage /> : <Redirect to="/login" />
              }
            />

            <Route
              exact
              path="/"
              render={() =>
                currentUser ? <Redirect to="/home" /> : <LoginAndRegister />
              }
            />
            <Route
              exact
              path="/register"
              render={() =>
                currentUser ? <Redirect to="/home" /> : <Register />
              }
            />
            <Route
              exact
              path="/login"
              render={() => (currentUser ? <Redirect to="/home" /> : <Login />)}
            />
            <Route
              exact
              path="/home"
              render={() =>
                currentUser ? <Homepage /> : <Redirect to="/login" />
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
