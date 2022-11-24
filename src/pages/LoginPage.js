import React from 'react';
import Heading from '../components/Heading';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <main id='content'>
      <div className="container">
        <Heading
          title="Login"
          text="Welcom back! Please login from here."
        ></Heading>
        <Login></Login>
      </div>
    </main>
  );
};

export default LoginPage;