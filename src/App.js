import React, { useState, useEffect } from 'react';

import axios from 'axios';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import styled from 'styled-components'

import Footer from './components/Footer/Footer';
import BirdList from './components/BirdList/BirdList';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "garden-bird-counter.firebaseapp.com",
  databaseURL: "https://garden-bird-counter-default-rtdb.firebaseio.com",
};

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false // Avoid redirects post sign-in
  },
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      axios.get('https://garden-bird-counter-default-rtdb.firebaseio.com/species.json')
        .then(resp => {
          setSpecies(resp.data);
        })
        .catch(err => {
          alert(err);
        })
    }
  }, [isSignedIn])

  if (!isSignedIn) {
    return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  }

  return (
    <>
      <StyledMain>
        <BirdList species={species} />
      </StyledMain>
      <Footer>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </Footer>
    </>
  );
}

const StyledMain = styled.main`
    max-width: 1024px;
    margin: 0 auto;
    padding: 1rem;
    flex: 1;
    display: flex;
    justify-content: center;
    overflow-y: auto;
`;

export default App;
