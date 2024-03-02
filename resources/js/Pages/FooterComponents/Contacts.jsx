// Contacts.js

import React from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const Contacts = ({auth}) => {
  return (
    <AuthenticatedLayout2
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
        <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
    </h2>}
>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-4"><strong>Email:</strong> info@noor.com</p>
        <p className="mb-4 text-red-900"><strong>Phone:</strong> +254-790957169</p>
        <p  className="mb-4 text-green-900"><strong>Address:</strong> 123 Main St, Mombasa, KENYA</p>
      </div>
    </div></AuthenticatedLayout2>
  );
};

export default Contacts;
