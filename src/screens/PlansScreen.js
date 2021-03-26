import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlansScreen.css';
import { loadStripe } from '@stripe/stripe-js';

const PlansScreen = () => {
	const [products, setProducts] = useState([]);
	const user = useSelector(selectUser);
	const [subscription, setSubscription] = useState(null);

	useEffect(() => {
		db.collection('customers')
			.doc(user.uid)
			.collection('subscriptions')
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(async subscription => {
					setSubscription({
						role: subscription.data().role,
						current_period_end: subscription.data().current_period_end.seconds,
						current_period_start: subscription.data().current_period_start.seconds
					});
				});
			});
	}, [user.uid]);

	useEffect(() => {
		// get the products from our firebase
		db.collection('products')
			// that are active
			.where('active', '==', true)
			.get()
			.then(querySnapshot => {
				const products = {};
				querySnapshot.forEach(async productDoc => {
					products[productDoc.id] = productDoc.data();
					const priceSnap = await productDoc.ref.collection('prices').get();
					priceSnap.docs.forEach(price => {
						products[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data()
						};
					});
				});
				setProducts(products);
			});
	}, []);
	// [] means this effect will run once upon mount

	const loadCheckout = async priceId => {
		const docRef = await db.collection('customers').doc(user.uid).collection('checkout_sessions').add({
			price: priceId,
			// redirect back to original screen (home)
			success_url: window.location.origin,
			cancel_url: window.location.origin
		});

		docRef.onSnapshot(async snap => {
			const { error, sessionId } = snap.data();

			// show error to customer
			if (error) {
				alert(`Wowsers an error has occured: ${error.message}`);
			}

			if (sessionId) {
				// we have a session, lets redirect to checkout
				// Init Stripe

				const stripe = await loadStripe(
					'pk_test_51IYtUVIVDq9oyNyMqFmFv5mFI7zHpEz3vezrnr7LLLg4Zd5oE7y61jG9uMspnFlAAdKfMaB0pERoqD2iYgTV9W7d00lAuI7knv'
				);

				stripe.redirectToCheckout({ sessionId });
			}
		});
	};

	return (
		<div className='plansScreen'>
			<br />
			{subscription && <p>Renewel date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
			{Object.entries(products).map(([productId, productData]) => {
				// TODO: add login to check the users subscription is active
				const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

				return (
					<div key={productId} className={`${isCurrentPackage && 'plansScreen__plan--disabled'} plansScreen__plan`}>
						<div className='plansScreen__info'>
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>
						<button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
							{isCurrentPackage ? 'Current package' : 'Subscribe'}
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default PlansScreen;
