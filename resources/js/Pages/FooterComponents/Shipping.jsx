// ShippingInformation.js

import React from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const ShippingInformation = ({auth}) => {
  return ( <AuthenticatedLayout2
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
        <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
    </h2>}
> 
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Shipping Information</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>We offer standard and expedited shipping options. Standard shipping takes
          </p><p> 3-5 business days within the Kenya, while expedited shipping takes 1-2 business days. Shipping costs vary based on location and order size.</p>
      </div>
    </div></AuthenticatedLayout2>
  );
};

export default ShippingInformation;
