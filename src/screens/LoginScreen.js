import React, { useState } from 'react';
import SignUpScreen from './SignUpScreen';
import './LoginScreen.css';

const LoginScreen = () => {
	const [signIn, setSignin] = useState(false);

	return (
		<div className='loginScreen'>
			<div className='loginScreen__background'>
				<img className='loginScreen__logo' src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='' />
				<button className='loginScreen__button' onClick={() => setSignin(true)}>
					Sign in
				</button>

				<div className='loginScreen_gradient' />

				<div className='loginScreen__body'>
					{signIn ? (
						<SignUpScreen />
					) : (
						<>
							<h1>Unlimited films, tv programmes and more.</h1>
							<h2>Watch anywhere, cancel anytime </h2>
							<h3>Ready to watch? Enter your email to create or restart your membership</h3>
							<div className='loginScreen__input'>
								<form>
									<input type='email' placeholder='Email address' />
									<button className='loginScreen__getStarted' onClick={() => setSignin(true)}>
										GET STARTED
									</button>
								</form>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
