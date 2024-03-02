// PrivacyPolicy.js

import React from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const PrivacyPolicy = ({auth}) => {
  return (
    <AuthenticatedLayout2
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
        <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
    </h2>}
>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>We are committed to protecting your privacy. Our privacy policy outlines how we collect, use, and protect your personal information when you use our website.</p>
      </div>
    </div></AuthenticatedLayout2>
  );
};

export default PrivacyPolicy;
