import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

const App = () => {
	// subscribe selector to access state in the store
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	// listener for authentication state change
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			// dispatch actions
			if (userAuth) {
				// login
				dispatch(
					login({
						uid: userAuth.uid,
						email: userAuth.email
					})
				);
			} else {
				// logout
				dispatch(logout());
			}
		});

		return unsubscribe;
		// useEffect depends on a dispatch
	}, [dispatch]);

	return (
		<div className='app'>
			<Router>
				{!user ? (
					<LoginScreen />
				) : (
					<Switch>
						<Route exact path='/profile'>
							<ProfileScreen />
						</Route>
						<Route exact path='/'>
							<HomeScreen />
						</Route>
					</Switch>
				)}
			</Router>
		</div>
	);
};

export default App;
