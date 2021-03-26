## CREATE REACT APP REDUX TEMPLATE

The recommended way to start new apps with React and Redux is by using the official Redux+JS template for Create React App, which takes advantage of Redux Toolkit and React Redux's integration with React components.

npx create-react-app my-app --template redux

## API

https://www.themoviedb.org/

## AXIOS

Http client requests

## FIREBASE HOSTING

firebase login
firebase init > use an existing project > (your project) > public directory: build > github: no
npm run build
firebase deploy

once initialised its simply:
firebase login
npm run build
firebase deploy

## REDUX

Redux

## FIREBASE AUTHENTICATION

setup Email/password

## FIREBASE FIRESTORE DATABASE & STRIPE

STRIPE

setup account with Stripe > setup project in the top left corner of the screen > home > Get your api keys > reveal test key > copy the Secret key:
sk_test_51IYtUVIVDq9oyNyMP6X0wjPs213xR8DLAgkkoj1uV56EruwSvfioP6vlOCccVth5ZWpyNriJu2FNXOVEEssqhSoq00BCiPOQPp

FIRESTORE DATABASE

Create database > Start in test mode > enable

FIREBASE EXTENSIONS

Sidebar in Firebase:
Extensions  
Run Subscription Payments with Stripe
Install
Upgrade to paid membership
Description
Review APIs enabled and resources created
Review billing and usage
Review access granted to this extension
Configure extension:
Sync new users to Stripe customers and Cloud Firestore: Sync
Stripe API key with restricted access: SECRET KEY (from stripe)
Install Extension

Once installed click Get Started and follow the Documentation (Step by step below)

1. Set your Cloud Firestore security rules (paste new rules into Rules in firebase)

2. Configure Stripe webhooks (click + Add endpoint: insert URL and manually add the events1)

3. Create product and pricing information
   +Add product

4. Configure the Stripe customer portal
