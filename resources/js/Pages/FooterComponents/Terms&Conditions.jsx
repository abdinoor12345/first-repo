// TermsAndConditions.js

import React from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const TermsAndConditions = ({auth}) => {
  return (
    <AuthenticatedLayout2
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
        <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
    </h2>}
> 
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Terms and Conditions</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>By using our website, you agree to abide by our terms and conditions. These terms govern your use of our website and outline your rights and responsibilities as a user.</p>
      </div>
    </div></AuthenticatedLayout2>
  );
};

export default TermsAndConditions;
