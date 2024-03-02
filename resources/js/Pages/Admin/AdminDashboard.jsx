import AuthenticatedLayout1 from '@/Layouts/AuthenticatedLayout1';

import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

const AdminDashboard = ({ userCount, totalRevenue, orders ,auth}) => {
  //const { userCount, totalRevenue, orders } = usePage().props;

  // Function to generate random background colors
  const getRandomColor = () => {
    const colors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <AuthenticatedLayout1
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
        <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
    </h2>}
>
    <div className="p-8">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>
      
      <div className="flex flex-wrap mb-8">
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
          <div className="border border-gray-300 p-4">
            <h2 className="text-xl mb-2">Total customers: {userCount}</h2>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
          <div className="border border-gray-300 p-4">
            <h2 className="text-xl mb-2">Total Revenue: ${totalRevenue}</h2>
          </div>
        </div>

        {orders.map((order, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
            <div className={`border border-gray-300 p-4 ${getRandomColor()}`}>
              <h2 className="text-lg mb-2">Orders: {order.delivery_status}</h2>
              <p>{order.count} orders</p>
            </div>
          </div>
        ))}
      </div>
    </div>        </AuthenticatedLayout1>

  );
};

export default AdminDashboard;
