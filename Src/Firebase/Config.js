import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDq1QWYS0ZgUpM0s83pWlcaCerF54-NLdw',
  authDomain: 'chatapp-2850f.firebaseapp.com',
  projectId: 'chatapp-2850f',
  storageBucket: 'chatapp-2850f.appspot.com',
  messagingSenderId: '333472655416',
  appId: '1:333472655416:web:cf8c04980b5f6462c45ecd',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
