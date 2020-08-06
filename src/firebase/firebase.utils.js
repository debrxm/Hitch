import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAEwJl07UCffdmdT1DoSzwCTk6LdnFEDDE",
  authDomain: "onling-b072c.firebaseapp.com",
  databaseURL: "https://onling-b072c.firebaseio.com",
  projectId: "onling-b072c",
  storageBucket: "onling-b072c.appspot.com",
  messagingSenderId: "63531467346",
  appId: "1:63531467346:web:400aa185a592af85acd58b",
  measurementId: "G-M6TD4GEXY4",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(
//   'BFEX8njqxk-OiiIwyOdvb08Nty3IWRahvuvZRVvSzHbQ5XAIQ4Z9Vu_B06vXreru2Tq6eDG04xICQEL37uVjMtA'
// );

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email, uid } = userAuth;
    const joined = new Date();
    try {
      await userRef.set({
        id: uid,
        verified: false,
        trips: [],
        displayName,
        email,
        joined,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user");
    }
  }
  return userRef;
};

export const createTrip = async (trip, id) => {
  const newTripRef = firestore.collection(`trips`).doc(`${id}`);
  try {
    await newTripRef.set(trip);
    return newTripRef;
  } catch (error) {
    console.log("Error Creating Trip", error.message);
  }
};
export const cancelTrip = async (id) => {
  const newTripRef = firestore.collection(`trips`).doc(`${id}`);
  try {
    await newTripRef.delete();
    return newTripRef;
  } catch (error) {
    console.log("Error Creating Trip", error.message);
  }
};

export const editTrip = async (trip, id) => {
  const newTripRef = firestore.doc(`trips/${id}`);
  try {
    await newTripRef.update(trip);
    return newTripRef;
  } catch (error) {
    console.log("Error Creating Trip", error.message);
  }
};

export const addNotification = async (notificationId, userId, notification) => {
  const userRef = firestore.doc(
    `users/${userId}/notifications/${notificationId}`
  );
  try {
    await userRef.set(notification);
  } catch (error) {}
};
export const updateRead = async (userId, notificationId) => {
  const userRef = firestore.doc(
    `users/${userId}/notifications/${notificationId}`
  );
  try {
    await userRef.update({ isRead: true });
  } catch (error) {}
};
export const updateTrip = async (tripId, numberOfPassanger, user) => {
  const tripRef = firestore.doc(`trips/${tripId}`);
  const userData = {
    id: user.id,
    name: user.displayName,
    profile_pic: user.profile_pic && user.profile_pic,
    phone: user.phone,
    email: user.email,
  };
  const snapShot = await tripRef.get();
  if (snapShot.exists) {
    let passangers = [];
    passangers = snapShot.data().passangers;
    passangers.push(userData);
    try {
      await tripRef.update({
        vacantSeats: snapShot.data().vacantSeats - numberOfPassanger,
        passangers: passangers,
      });
      return tripRef;
    } catch (error) {
      console.log("error updating trip", error.message);
    }
  }
};
export const unJoinTrip = async (tripId, userId) => {
  const tripRef = firestore.doc(`trips/${tripId}`);
  const snapShot = await tripRef.get();
  if (snapShot.exists) {
    let passangers = snapShot
      .data()
      .passangers.filter((item, index) => item.id !== userId);
    try {
      await tripRef.update({
        vacantSeats: snapShot.data().vacantSeats + 1,
        passangers: passangers,
      });
      return tripRef;
    } catch (error) {
      console.log("error updating trip", error.message);
    }
  }
};
export const driverCancelTrip = async (
  notificationId,
  passangers,
  notification
) => {
  passangers.forEach((item) => {
    console.log(item);
    addNotification(notificationId, item.id, notification);
  });
};

export const updateProfile = async (userId, tripId) => {
  const userRef = firestore.doc(`users/${userId}`);
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    let oldTrip = [];
    oldTrip = snapShot.data().trips;
    oldTrip.push(tripId);
    try {
      await userRef.update({
        trips: oldTrip,
      });
      return userRef;
    } catch (error) {
      console.log("error updating profile", error.message);
    }
  }
};

export const updateProfileData = async (userId, incomingData) => {
  const {
    fullName,
    profile_pic,
    location,
    email,
    phone,
    age,
    gender,
  } = incomingData;
  const userRef = firestore.doc(`users/${userId}`);
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    try {
      await userRef.update({
        displayName: fullName,
        profile_pic,
        location,
        email,
        phone,
        age,
        gender,
      });
      return userRef;
    } catch (error) {
      console.log("error updating profile", error.message);
    }
  }
};

export default firebase;
