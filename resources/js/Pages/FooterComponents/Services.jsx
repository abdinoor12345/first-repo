// Services.js

import React from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const Services = ({auth}) => {
  return (
    <AuthenticatedLayout2
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
        <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
    </h2>}
>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-red-900">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 text-green-300">Fast Shipping</h2>
          <p>Get your products delivered quickly and securely.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 text-green-300">24/7 Customer Support</h2>
          <p>Our support team is available round the clock to assist you.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 text-green-300">Easy Returns</h2>
          <p>Not satisfied with your purchase? Return it hassle-free.</p>
        </div>
      </div>
    </div></AuthenticatedLayout2>
  );
};

export default Services;
