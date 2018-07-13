import * as firebase from 'firebase';



// Initialize Firebase
  const config = {
    apiKey: "AIzaSyC6uQ2oekPonf2KfeRwIzAYhd52dZT3u2s",
    authDomain: "strangels-d87d6.firebaseapp.com",
    databaseURL: "https://strangels-d87d6.firebaseio.com",
    projectId: "strangels-d87d6",
    storageBucket: "strangels-d87d6.appspot.com",
    messagingSenderId: "646381650697"
  };
export const firebaseApp = firebase.initializeApp(config);

export const channelNode = firebaseApp.database().ref(`Channels/`);

export const userNode = firebaseApp.database().ref(`Users/`);

export const submitNewMessage = (messageData, channelId) => {
    firebaseApp.database().ref(`Messages/${channelId}`).push(messageData).then(
        (completedResponse) => {

        }
    )
}

export const messageNode = firebaseApp.database().ref(`Messages`);

export const addnewChannel = ({
  channelName,
  channelSubName,
  creator,
  folks
}, onComplete) => {
  firebaseApp.database().ref(`Channels`).push(
    {
      channelName: channelName,
      channelSubName:channelSubName,
      creator:creator,
      folks:folks
    }
  ).then(()=> typeof onComplete==='function' && onComplete())
}


export const writeNewUserInDatabase = ({values,onSuccess, name}) => {
      const {uid} = values;
      const userName = name ? name : 'Anonymous';

      firebaseApp.database().ref(`Users/${uid}`).set({
        name: userName,
        isOnline: true,
        registrationDate: Date.now(),
        lastLogin: Date.now()
      })
      .then((onUserWrittenInDatabase) =>{
         onSuccess();
      });
}

export const logOutFromFirebase = () => {
  firebaseApp.auth().signOut();
}

// se tutto va bene lancia onSuccess passandogli il risultato della promise
export const registerWithEmail = ({onSuccess, onFail, values}) => {
      const {userMail, userPassword} = values;

      firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(
          firebaseApp.auth().createUserWithEmailAndPassword(userMail, userPassword)

          .then((promise)=>{
              onSuccess(promise);
          })

          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            onFail(errorMessage)
          })
      )
      .catch((error)=>{
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
      });
}

export const loginWithEmail = ({userMail, userPassword, onSuccess, onFail}) => {
  console.log('requesting login')
  firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
  firebaseApp.auth().signInWithEmailAndPassword(userMail, userPassword)
  .then(
    (value) => {
  },
    (reason) => {
    onFail(reason)
  })
  .catch(
    (reason) => {
    onFail(reason)
  }));
}
