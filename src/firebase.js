import firebase from 'firebase';

// firebase > settings icon > Project settings > Config:
const firebaseConfig = {
	apiKey: 'AIzaSyBwBpu7RllWO3_QEyy9VjVFF2XU8udchUU',
	authDomain: 'netflix-clone-634c1.firebaseapp.com',
	projectId: 'netflix-clone-634c1',
	storageBucket: 'netflix-clone-634c1.appspot.com',
	messagingSenderId: '346389830560',
	appId: '1:346389830560:web:eeca7eb895760e34dd62c5'
};

// initialise firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);
// access to firebase realtime database
const db = firebaseApp.firestore();
// access to firebase authentication
const auth = firebase.auth();

// export explicit content
export { auth };
// only aloud 1 default export
export default db;
