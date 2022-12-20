import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.init';
import axios from 'axios';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthContextComp = ({ children }) => {

  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [refetchUser, setRefetchUser] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [testLoading, setTestLoading] = useState(false);
  const [userProfileLoading, setUserProfileLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const userLogin = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const userRegister = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const userLogout = () => {
    return signOut(auth);
  }

  const userSocialLogin = (provider) => {
    setUserLoading(true);

    if (provider === 'google') {
      return signInWithPopup(auth, googleProvider);
    }

    return false;
  }


  const getUserJwt = async (email) => {
    const currentUser = { email }

    const jwt = await fetch('https://antique-watches.vercel.app/jwt', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(currentUser)
    })

    const jwtData = await jwt.json();

    return jwtData;
  }


  useEffect(() => {
    if (user?.uid) {
      setUserProfileLoading(true);

      axios.get(`https://antique-watches.vercel.app/users/uid/${user.uid}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('antique-token')}`
        }
      })
        .then(res => {
          setUserProfile(res.data);
          setUserProfileLoading(false);
        })
        .catch(err => {
          console.log(err);
          setUserProfileLoading(false);
        })
    }
  }, [user, refetchUser]);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUserProfile({})
      }
      setUser(currentUser);
      setUserLoading(false);
      setUserProfileLoading(false);
    })

    return () => {
      unsubscribe();
    }
  }, []);

  const authInfo = {
    user,
    userProfile,
    userLoading, setUserLoading,
    userProfileLoading, setUserProfileLoading,
    userLogin,
    userRegister,
    userLogout,
    userSocialLogin,
    getUserJwt,
    testLoading, setTestLoading,
    refetchUser, setRefetchUser
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComp;