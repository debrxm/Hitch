import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAEwJl07UCffdmdT1DoSzwCTk6LdnFEDDE',
  authDomain: 'onling-b072c.firebaseapp.com',
  databaseURL: 'https://onling-b072c.firebaseio.com',
  projectId: 'onling-b072c',
  storageBucket: 'onling-b072c.appspot.com',
  messagingSenderId: '63531467346',
  appId: '1:63531467346:web:400aa185a592af85acd58b',
  measurementId: 'G-M6TD4GEXY4',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

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
      console.log('Error creating user');
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
    console.log('Error Creating Trip', error.message);
  }
};

export const updateTrip = async (tripId, numberOfPassanger, user) => {
  const tripRef = firestore.doc(`trips/${tripId}`);
  const userData = {
    id: user.id,
    name: user.displayName,
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
      console.log('error updating trip', error.message);
    }
  }
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
      console.log('error updating profile', error.message);
    }
  }
};

export const updateProfileData = async (userId, incomingData) => {
  const { fullName, profile_pic, location, } = incomingData;
  const userRef = firestore.doc(`users/${userId}`);
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    try {
      await userRef.update({
        displayName: fullName,
        profile_pic,
        location,
      });
      return userRef;
    } catch (error) {
      console.log('error updating profile', error.message);
    }
  }
};

export default firebase;
