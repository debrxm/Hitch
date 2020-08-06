import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import firebase from "../../firebase/firebase.utils";
import { selectCurrentChannel } from "../../redux/messaging/messaging.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

export class MessageForm extends Component {
  state = {
    message: "",
    loading: false,
    errors: [],
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    storageRef: firebase.storage().ref(),
    messagesRef: firebase.database().ref("messages"),
  };

  getPath = () => {
    if (this.props.isPrivateChannel) {
      return `chat/private-${this.state.channel.id}`;
    } else {
      return "chat/public";
    }
  };

  uploadFile = (file, metadata) => {
    const { storageRef } = this.state;
    const { id } = this.state.channel;
    const { getMessagesRef } = this.props;

    const pathToUpload = id;
    const ref = getMessagesRef();
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: storageRef.storage.ref(filePath).put(file, metadata),
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          (snap) => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.props.isProgressBarVisible(percentUploaded);
            this.setState({ percentUploaded });
          },
          (err) => {
            console.error(err);
            let errors = this.state.errors.concat(err);
            this.setState({ errors, uploadState: "error", uploadTask: null });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadUrl) => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch((err) => {
                console.error(err);
                let errors = this.state.errors.concat(err);
                this.setState({
                  errors,
                  uploadState: "error",
                  uploadTask: null,
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: "done" });
      })
      .catch((err) => {
        console.error(err);
        let errors = this.state.errors.concat(err);
        this.setState({ errors });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = (fileUrl) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.props.currentUser.id,
        name: this.props.currentUser.displayName,
        avatar: this.props.currentUser.profile_pic
          ? this.props.currentUser.profile_pic
          : null,
      },
    };

    if (fileUrl && fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = this.state.message;
    }

    return message;
  };

  sendMessage = (e) => {
    e.preventDefault();
    const { createMessage } = this;
    const { message, channel, messagesRef } = this.state;

    // const { id } = channel;
    console.log(this.props.currentChannel);

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(this.props.currentChannel)
        .push()
        .set(createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch((err) => {
          let errors = this.state.errors.concat(err);
          this.setState({ loading: false, errors });
        });
    } else {
      let errors = this.state.errors.concat({ message: "Add a message" });
      this.setState({ errors });
    }
  };

  render() {
    const { errors, message, loading } = this.state;
    const { handleChange, sendMessage } = this;

    return (
      <section className="message__form">
        <input
          name="message"
          value={message}
          placeholder="Write your message..."
          onChange={handleChange}
          className={
            errors.some(({ message }) => message.includes("message"))
              ? "error"
              : ""
          }
        />

        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </section>
    );
  }
}
const mapPropsToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel,
});
export default connect(mapPropsToProps)(MessageForm);
