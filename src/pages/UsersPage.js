import React from 'react';
import { useLoaderData } from 'react-router-dom';

const UsersPage = () => {
  const users = useLoaderData();

  return (
    <div>
      <h3>Users found: {users?.length}</h3>
    </div>
  );
};

export default UsersPage;