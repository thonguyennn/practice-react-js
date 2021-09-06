import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC_awl3BGTUVoqiWkoMxvYAFeZSq5fR5zA",
  authDomain: "notelistreactjs-48358.firebaseapp.com",
  databaseURL: "https://notelistreactjs-48358-default-rtdb.firebaseio.com",
  projectId: "notelistreactjs-48358",
  storageBucket: "notelistreactjs-48358.appspot.com",
  messagingSenderId: "7521187304",
  appId: "1:7521187304:web:cc0217535ef29ea937605d",
  measurementId: "G-P9LH2GCMF5"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebase.messaging();

export const app = firebase.database().ref('notelistreactjs-48358')
