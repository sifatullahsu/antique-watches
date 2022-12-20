import React, { useContext } from 'react';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContextComp';

const DashPage = () => {
  const { user, userProfile } = useContext(AuthContext);
  return (
    <div>
      <Heading
        title={`Welcome ${user?.email},`}
        text='Here you will find all the options on sitebar.'
      ></Heading>
      <p>{userProfile.name}</p>
    </div>
  );
};

export default DashPage;