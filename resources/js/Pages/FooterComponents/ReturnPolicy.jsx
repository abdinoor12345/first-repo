 // ReturnPolicy.js

import React from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const ReturnPolicy = ({auth}) => {
  return (<AuthenticatedLayout2
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
        <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
    </h2>}
> 
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Return Policy</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>We accept returns within 30 days of purchase. Items must be unused and in their original packaging to be eligible for a refund. Please contact our customer service team to initiate a return.</p>
      </div>
    </div></AuthenticatedLayout2>
  );
};

export default ReturnPolicy;
