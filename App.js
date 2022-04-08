import * as React from 'react';

//Navigation---------------------------------------
import { NavigationContainer} from '@react-navigation/native';
//-------------------------------------------------

// Screens------------------------------------
import Tabs from './TAB'
//------------------------------------------------

//firebase-----------------------------------------------
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
//-------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyC0RUKHGFYkmcyVeHLBskpH9THzHVxeQDI",
  authDomain: "artcom-9c824.firebaseapp.com",
  projectId: "artcom-9c824",
  storageBucket: "artcom-9c824.appspot.com",
  messagingSenderId: "746931429302",
  appId: "1:746931429302:web:2e4a94f6bec4ae7af56b17",
  measurementId: "G-LD7QS7BJ9H"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const App = () => {


  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
 }




 export default App;