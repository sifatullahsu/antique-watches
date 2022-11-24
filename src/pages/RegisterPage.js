import React from 'react';
import Heading from '../components/Heading';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <main id='content'>
      <div className="container">
        <Heading
          title="Register"
          text="Create your account from here."
        ></Heading>
        <Register></Register>
      </div>
    </main>
  );
};

export default RegisterPage;