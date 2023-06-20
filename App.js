import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import homeScreen from './folder/homeScreen';

export default function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const firebaseConfig = {
    apiKey: "AIzaSyBcbuLJaODarVj-wngx47X3D2vlsiETTdY",
    authDomain: "notes-app-44.firebaseapp.com",
    databaseURL: "https://notes-app-44-default-rtdb.firebaseio.com",
    projectId: "notes-app-44",
    storageBucket: "notes-app-44.appspot.com",
    messagingSenderId: "70213484242",
    appId: "1:70213484242:web:ec0208ffd06279a4ee770b",
    measurementId: "G-VV2PSYYYFV"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // create a user using email and password of firebase auth
  function createNewUser(email, password){
    const auth = getAuth(app);
    if(email === '' || password === ''){
      alert("Please enter email and password");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error code:", errorCode);
      console.log("error message:", errorMessage);
      alert(errorMessage);
    });
    setDoc(doc(db, "users", email), {
      email: email,
      password: password,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      alert(error);
    });

    console.log("user created successfully Id:", email);
  }
  // get user data from firebase
  async function getUserData(email){
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      alert(`Your name is ${docSnap.data().email} and your password is ${docSnap.data().password}`);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      alert("No such document!");
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <Text style={styles.text}>Made By Nirnay Raval</Text>
      {/* take input and print it and give the style text */}
      <TextInput style={styles.input}  placeholder="Enter your email"
      onChangeText={newText => setEmail(newText)}
      />
      <TextInput style={styles.input} placeholder="Enter your Password"
      onChangeText={newText => setPassword(newText)}
      secureTextEntry={true}
      keyboardType='phone-pad'
      />
      {/* {/* print the input */}
      {/* <Text>Your name is:{name}</Text>
      <Text>Your age is: {age}</Text>  */}
      <View style={styles.button}>
      <Button title="Submit" 
      onPress={() => {
        createNewUser(email, password);
      }}
      />
      </View>
      <View style={styles.button}>
      <Button title="search" onPress={() => {
        getUserData(email) ;
      }}
      />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
      alignContent:'center',
      color: 'green',
      fontSize: 30,
      fontWeight: 'bold',
  },
  input:{
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  button:{
    margin: 10,
    width: 200,
  }
});
