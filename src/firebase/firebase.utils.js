import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const createTrip = async (trip) => {
  const newTripRef = firestore.doc('trips');
  try {
    await newTripRef.set({
      ...trip,
    });
    return newTripRef;
  } catch (error) {
    console.log('Error Creating Trip', error.message);
  }
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
