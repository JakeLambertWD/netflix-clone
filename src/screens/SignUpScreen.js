import React, { useRef } from 'react';
import { auth } from '../firebase';
import './SignUpScreen.css';

const SignUp = () => {
	// useRef() does not trigger a re-render like useState()
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const register = e => {
		e.preventDefault();

		// create user account
		auth
			.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
			.then(authUser => {
				console.log(authUser);
			})
			.catch(err => {
				alert(err.message);
			});
	};

	const signIn = e => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
			.then(authUser => {
				console.log(authUser);
			})
			.catch(err => {
				alert(err.message);
			});
	};

	return (
		<div className='signUpScreen'>
			<form>
				<h1>Sign in</h1>
				<input ref={emailRef} type='email' placeholder='email address' />
				<input ref={passwordRef} type='password' placeholder='password' />
				<button type='submit' onClick={signIn}>
					Sign in
				</button>
				<h4>
					<span className='signUpScreen__grey'>New to Netflix? </span>
					<span className='signUpScreen__link' onClick={register}>
						Sign Up now.
					</span>
				</h4>
			</form>
		</div>
	);
};

export default SignUp;
