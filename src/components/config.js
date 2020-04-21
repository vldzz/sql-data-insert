import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCRaFC5SSMotW4M2fgq6f9kNYC02117HKc",
    authDomain: "react-statistics.firebaseapp.com",
    databaseURL: "https://react-statistics.firebaseio.com",
    projectId: "react-statistics",
    storageBucket: "react-statistics.appspot.com",
    messagingSenderId: "1071644581271",
    appId: "1:1071644581271:web:c313efeb8a4a34570f78d2",
    measurementId: "G-V57EG3KFZK"
  };

firebase.initializeApp(config);
export default firebase;