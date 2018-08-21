import * as firebase from 'firebase';

  // Initialize Firebase
const config = {
  apiKey: "AIzaSyAh06Ejw0P931fdgy0AClDQfmnX5v0nFhQ",
  authDomain: "awesome-f2402.firebaseapp.com",
  databaseURL: "https://awesome-f2402.firebaseio.com",
  projectId: "awesome-f2402",
  storageBucket: "awesome-f2402.appspot.com",
  messagingSenderId: "227664281747"
};


export default class Firebase {
  static auth();

  static init() {
    firebase.initializeApp(config);
    Firebase.auth = firebase.auth()
  }
}