import React from 'react';
import firebase from 'firebase/app';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { updateProfileData } from '../../firebase/firebase.utils';
import cancel from '../../assets/cancel.svg';
import cam from '../../assets/cam.svg';
import FormInput from '../../components/form-input/form-input';
import FormSelect from '../../components/form-select/form-select';
import Spinner from '../../components/spinner/spinner';
import './editprofile.scss';
class EditProfile extends React.Component {
  state = {
    fullName: '',
    website: '',
    profile_pic: '',
    location: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    isLoading: false,
  };
  componentDidMount() {
    this.setState({
      fullName: this.props.currentUser.displayName
        ? this.props.currentUser.displayName
        : '',
      location: this.props.currentUser.location
        ? this.props.currentUser.location
        : '',
      profile_pic: this.props.currentUser.profile_pic
        ? this.props.currentUser.profile_pic
        : '',
      email: this.props.currentUser.email
        ? this.props.currentUser.email
        : '',
      phone: this.props.currentUser.phone
        ? this.props.currentUser.phone
        : '',
      age: this.props.currentUser.age
        ? this.props.currentUser.age
        : '',
      gender: this.props.currentUser.gender
        ? this.props.currentUser.gender
        : '',
    });
  }

  handlePpChange = async (e) => {
    this.setState({ isLoading: true });
    const selectedFile = e.target.files[0]
    this.fetchImageUrl(selectedFile, 'profile-pic')
  };

  fetchImageUrl = async (selectedFile, dest) => {
    const storageRef = firebase.storage().ref(`users/${this.props.currentUser.id}/${dest}/${selectedFile}`)
    const uploadTask = storageRef.put(selectedFile);
    uploadTask.on('state_changed', snapshot => {
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, error => {
      console.log(error);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(
        downloadURL => {
          this.setState({ profile_pic: downloadURL })
        });
    });
    this.setState({ isLoading: false })
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSave = async () => {
    const {
      fullName,
      location,
      profile_pic,
      email,
      phone,
      age,
      gender,
    } = this.state;
    const incomingData = {
      fullName,
      profile_pic,
      location,
      email,
      phone,
      age,
      gender,
    };
    await updateProfileData(this.props.currentUser.id, incomingData);
    this.props.history.push('/my-profile');
  };
  render() {
    const { currentUser } = this.props;
    const {
      fullName,
      location,
      profile_pic,
      email,
      phone,
      age,
      gender,
    } = this.state;
    return (
      <div className="profile-edit-page main">
        {this.state.isLoading ? (
          <Spinner />
        ) : null}
        {currentUser ? (
          <div className="profile-edit">
            <div className="profile-edit-page-header">
              <div className="edit-control">
                <div className="cancel_title">
                  <Link to="/my-profile">
                    <img src={cancel} alt="cancel icon" />
                  </Link>
                </div>
                <span className="save" onClick={this.handleSave}>
                  Save
                </span>
              </div>
              <div className="profile-pic_buttons">
                <div className="profile-pic" style={{ backgroundImage: `linear-gradient(#0000008e, #000000a1), url(${profile_pic})` }}>
                  <div className="pp">
                    <div className="upload-btn-wrapper">
                      <img src={cam} alt="upload icon" />
                      <input
                        type="file"
                        name="profile_pic"
                        accept="image/gif, image/jpeg, image/png"
                        onChange={this.handlePpChange}
                      />
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <form onSubmit={this.handleSave}>
              <FormInput
                type="text"
                name="fullName"
                value={fullName}
                label="Fullname"
                onChange={this.handleChange}
                edit
              />
              <FormInput
                type="email"
                name="email"
                value={email}
                label="Email"
                onChange={this.handleChange}
                edit
              />
              <FormInput
                type="number"
                name="phone"
                value={phone}
                label="Phone"
                onChange={this.handleChange}
                edit
              />
              <FormInput
                type="number"
                name="age"
                value={age}
                label="Age"
                onChange={this.handleChange}
                edit
              />
              <FormInput
                type="text"
                name="gender"
                value={gender}
                label="Gender"
                onChange={this.handleChange}
                edit
              />
              <FormSelect
                name="location"
                value={location}
                opt="Location"
                handleChange={this.handleChange}
                options={[
                  'Alor Setar',
                  'Batu Pahat',
                  'Butterworth',
                  'Cukai',
                  'George Town',
                  'Johor Bahru',
                  'Ipoh',
                  'Kampong Baharu',
                  'Kampung Lemal',
                  'Kampung Sungai Pasir',
                  'Kangar',
                  'Ketereh',
                  'Klang',
                  'Kulang',
                  'Kota Bharu',
                  'Kota Kinabalu',
                  'Kuala Lipis',
                  'Kuala Lumpur',
                  'Kuala Terangganu',
                  'Kuantan',
                  'Kuching',
                  'Melaka',
                  'Lahad Datu',
                  'Miri',
                  'Muar',
                  'Pasri Mas',
                  'Pulai Chondong',
                  'Raub',
                  'Sandakan',
                  'Seramban',
                  'Seramban Garden',
                  'Shah Alam',
                  'Taiping',
                  'Tawau',
                  'Teluk intan',
                  'Tumpat',
                  'Victoria',
                ]}
              />
            </form>
            {/* </>
          )} */}
          </div>
        ) : (
            <Spinner />
          )}
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(EditProfile));
