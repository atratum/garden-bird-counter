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
  const [count, setCount] = useState([]);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      fetchSpecies();
      fetchCountToday();
    }
  }, [isSignedIn])

  if (!isSignedIn) {
    return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  }

  const incrementCount = (speciesID, incAmount) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    firebase.database()
      .ref('countByDate')
      .child(currentDate)
      .child(speciesID)
      .set(firebase.database.ServerValue.increment(incAmount));
  }

  const fetchSpecies = () => {
    axios.get('https://garden-bird-counter-default-rtdb.firebaseio.com/species.json')
      .then(resp => {
        setSpecies(resp.data);
      })
      .catch(err => {
        alert(err);
      })
  }

  const fetchCountToday = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    axios.get(`https://garden-bird-counter-default-rtdb.firebaseio.com/countByDate/${currentDate}.json`)
      .then(resp => {
        setCount(resp.data);
      })
      .catch(err => {
        alert(err);
      })
  }

  const handlerClick = e => {
    const newCount = [...count];
    newCount[e.currentTarget.value] += 1;
    setCount(newCount);
    incrementCount(e.currentTarget.value, 1);
  }

  return (
    <>
      <StyledMain>
        <BirdList
          species={species}
          count={count}
          handlerClick={handlerClick}
        />
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
