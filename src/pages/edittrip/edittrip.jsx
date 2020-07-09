import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEditTrip } from '../../redux/trip/trip.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Link, withRouter } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input';
import { editTrip, cancelTrip } from '../../firebase/firebase.utils';
// import { GenerateId } from '../../utils/id-generator';
import CustomButton from '../../components/custom-button/custom-button';
import loader from '../../assets/loader.gif';
import left from '../../assets/left.svg';
import FormSelect from '../../components/form-select/form-select';
import './edittrip.scss';

class EditTrip extends Component {
  state = {
    pickUpPoint: this.props.editTrip.pickUpPoint
      ? this.props.editTrip.pickUpPoint
      : '',
    destination: this.props.editTrip.destination
      ? this.props.editTrip.destination
      : '',
    date: this.props.editTrip.date ? this.props.editTrip.date : '',
    time: this.props.editTrip.time ? this.props.editTrip.time : '',
    carType: this.props.editTrip.carType ? this.props.editTrip.carType : '',
    numberPlate: this.props.editTrip.numberPlate
      ? this.props.editTrip.numberPlate
      : '',
    seatCost: this.props.editTrip.seatCost ? this.props.editTrip.seatCost : '',
    vacantSeats: this.props.editTrip.vacantSeats
      ? this.props.editTrip.vacantSeats
      : '',
    today: '',
    description: this.props.editTrip.description
      ? this.props.editTrip.description
      : '',
    errorMessage: '',
    isSuccess: false,
    isLoading: false,
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      pickUpPoint,
      destination,
      date,
      time,
      numberPlate,
      description,
      seatCost,
      vacantSeats,
      carType,
    } = this.state;

    try {
      this.setState({ isLoading: true });
      //   const id = GenerateId();
      const tripData = {
        driver: {
          id: this.props.currentUser.id,
          name: this.props.currentUser.displayName,
          phone: this.props.currentUser.phone,
          email: this.props.currentUser.email,
          age: this.props.currentUser.age,
          gender: this.props.currentUser.gender,
          profile_pic: this.props.currentUser.profile_pic
            ? this.props.currentUser.profile_pic
            : '',
        },
        pickUpPoint: pickUpPoint.toLocaleLowerCase(),
        destination: destination.toLowerCase(),
        date,
        numberPlate,
        seatCost,
        description,
        time,
        vacantSeats,
        carType,
      };
      await editTrip(tripData, this.props.editTrip.id);
      this.setState({
        pickUpPoint: '',
        destination: '',
        date: '',
        time: '',
        carType: '',
        numberPlate: '',
        seatCost: '',
        description: '',
        vacantSeats: '',
        isSuccess: true,
        errorMessage: false,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: !this.setState.isLoading,
        errorMessage: 'Failed Try Again',
      });
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  };
  handleCancelTrip = async () => {
    await cancelTrip(this.props.editTrip.id);
    this.props.history.push('/home');
  };
  componentDidMount() {
    const now = new Date();

    const day = ('0' + (now.getDate() + 1)).slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);

    const today = now.getFullYear() + '-' + month + '-' + day;
    this.setState({ today });
  }
  render() {
    const {
      pickUpPoint,
      destination,
      date,
      time,
      numberPlate,
      carType,
      description,
      today,
      errorMessage,
      isSuccess,
      isLoading,
    } = this.state;
    return (
      <div className="create-ride">
        {errorMessage !== '' ? (
          <span className="error">{errorMessage}</span>
        ) : null}
        {isSuccess ? (
          <span className="success">Trip Successfully Edited</span>
        ) : null}
        <div>
          <div className="edit-head">
            <h3 className="title">EDIT TRIP</h3>{' '}
            <span className="cancel-trip" onClick={this.handleCancelTrip}>
              Cancel Trip
            </span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <FormSelect
              name="pickUpPoint"
              value={pickUpPoint}
              opt="Pick Up Point"
              handleChange={this.handleChange}
              options={[this.props.editTrip.pickUpPoint]}
            />
            <FormSelect
              name="destination"
              value={destination}
              opt="Destination"
              handleChange={this.handleChange}
              options={[this.props.editTrip.destination]}
            />
            <FormInput
              type="text"
              name="date"
              value={date}
              required
              min={today}
              handleChange={this.handleChange}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              label="Trip Date"
            />
            <FormInput
              type="text"
              name="time"
              value={time}
              required
              handleChange={this.handleChange}
              onFocus={(e) => (e.target.type = 'time')}
              onBlur={(e) => (e.target.type = 'text')}
              label="Trip Time"
            />
            <FormInput
              type="text"
              name="carType"
              value={carType}
              required
              handleChange={this.handleChange}
              label="Car Type"
            />
            <FormInput
              type="text"
              name="numberPlate"
              value={numberPlate}
              required
              handleChange={this.handleChange}
              label="Number Plate"
            />
            <FormInput
              type="number"
              name="vacantSeats"
              value={this.props.editTrip.vacantSeats}
              required
              handleChange={this.handleChange}
              label="Vacant Seats"
            />
            <FormInput
              type="number"
              name="seatCost"
              value={this.props.editTrip.seatCost}
              required
              handleChange={this.handleChange}
              label="Seat Cost"
            />
            <div className="text-area">
              <textarea
                required
                name="description"
                value={description}
                onChange={this.handleChange}
                className={`${description.length ? 'expand' : null}`}
                cols="100"
                rows="1"
              ></textarea>
              <label
                className={`${
                  description.length ? 'shrink' : ''
                } form-input-label`}
              >
                Description
              </label>
            </div>
            <div className="buttons">
              <CustomButton type="button" onClick={this.handleSubmit}>
                Update {isLoading ? <img src={loader} alt="Loader" /> : null}
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
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  editTrip: selectEditTrip,
});
export default withRouter(connect(mapStateToProps)(EditTrip));
