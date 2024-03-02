// FAQs.js

import React from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const FAQs = ({auth}) => {
  return (<AuthenticatedLayout2
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
        <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
    </h2>}
> 
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Q: How long does shipping take?</h2>
        <p>A: Shipping typically takes 3-5 business days within the KENYA.</p>
        <h2 className="text-xl font-semibold mb-2 mt-4">Q: Do you ship internationally?</h2>
        <p>A: Yes, we offer international shipping to select countries. Please check our shipping page for more information.</p>
       </div>
    </div></AuthenticatedLayout2>
  );
};

export default FAQs;
