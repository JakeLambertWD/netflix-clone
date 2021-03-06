import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
	const [show, setShow] = useState(false);
	const history = useHistory();

	const transitionNavBar = () => {
		// When user scrolls more than 100 on Y axis
		if (window.scrollY > 100) {
			setShow(true);
		} else {
			setShow(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', transitionNavBar);
		return () => window.removeEventListener('scroll', transitionNavBar);
	}, []);

	return (
		<div className={`nav ${show && 'nav_black'}`}>
			<div className='nav_contents'>
				<img
					className='nav_logo'
					src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
					alt='nav logo'
					onClick={() => history.push('/')}
				/>
				<img
					className='nav_avatar'
					src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
					alt='nav avatar'
					onClick={() => history.push('/profile')}
				/>
			</div>
		</div>
	);
};

export default Nav;
