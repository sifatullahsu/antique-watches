import React from 'react';
import Heading from '../components/Heading';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <main id='content'>
      <div className="container">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div>
            <Heading
              title="Login"
              text="Welcom back! Please login from here."
            ></Heading>
            <Login></Login>
          </div>
          <div>
            <Heading
              title="Our Accounts!"
              text="You can also logged in via existing accounts."
            ></Heading>
            <h4 className='mb-6'>These Are The Accounts Info!</h4>
            <div className='mb-6'>
              <p><span className='font-bold'>Admin:</span> best.topic.22@gmail.com</p>
              <p><span className='font-bold'>Seller:</span> sifat@royalraft.com</p>
              <p><span className='font-bold'>Buyer:</span> zakir@royalraft.com</p>
              <p className='mt-3'><span className='font-bold'>Password:</span> 123456</p>
            </div>
            {/* <div className='mb-6'>
              <p className='font-bold'>Accout Type: Admin</p>
              <p>Username: best.topic.22@gmail.com</p>
              <p>Password: 123456</p>
            </div>
            <div className='mb-6'>
              <p className='font-bold'>Accout Type: Seller</p>
              <p>Username: best.topic.22@gmail.com</p>
              <p>Password: 123456</p>
            </div>
            <div className='mb-6'>
              <p className='font-bold'>Accout Type: Buyer</p>
              <p>Username: best.topic.22@gmail.com</p>
              <p>Password: 123456</p>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;