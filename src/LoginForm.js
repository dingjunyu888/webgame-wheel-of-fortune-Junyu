import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import React, {  useState, useEffect } from 'react';

// LoginSuccessful is a function sent in by parent component
function LoginForm({LoginEvent}) {
	const firebaseConfig = {
		apiKey: "AIzaSyDFC0IY9mvb_CBZ9rMtghMTjbj00aXEdk0",
		authDomain: "reactsample-17475.firebaseapp.com",
		projectId: "reactsample-17475",
		storageBucket: "reactsample-17475.appspot.com",
		messagingSenderId: "29630218098",
		appId: "1:29630218098:web:14aa85c93efbbc10a867eb"
	};

	initializeApp(firebaseConfig);
	
	const [loggedUser, setLoggedUser] = useState('');

    const [userId, setUserId] = useState('');

	// function to sign in with Google's page
	const signInWithGoogle = () => {
  	
  		const provider = new GoogleAuthProvider();
  		const auth = getAuth();
  		signInWithRedirect(auth, provider)
    	.then((result) => {
      		// User signed in
      		console.log(result.user);
      		setLoggedUser(result.user)
      	
    	}).catch((error) => {
      	// Handle Errors here.
      		console.error(error);
    	});
	};
	
	// function to sign out
	function logoutGoogle () {
		const auth=getAuth();
		auth.signOut();
		setLoggedUser(null)
	}

	// we put the onAuthStateChanged in useEffect so this is only called when 
	// this component mounts  
	useEffect(() => {
		const auth = getAuth();
		auth.onAuthStateChanged(user => {
			if (user) {
    			// User is signed in.
    			console.log("User is signed in:", user);
    			
    			
    			setLoggedUser(user);
    		
  			} else {
    		// No user is signed in.
    			console.log("No user is signed in.");
  			}
  			LoginEvent(user);
  		});
	}, []);
	// note the ? to show either login or logout button
	return (
    <div >
    { loggedUser?
      <><p>user: {loggedUser.email}</p> <button onClick={logoutGoogle}>Log out</button> </>
      :<button onClick={signInWithGoogle}>Sign in with Google</button>
    } 
     
    </div>
  );

}
export default LoginForm;