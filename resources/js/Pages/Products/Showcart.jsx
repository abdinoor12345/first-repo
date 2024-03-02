import React from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const ShowCart = ({ cart, auth }) => {
  let totalprice = 0;

  return (
    <AuthenticatedLayout2
      user={auth.user}
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg">
          <a href="/" className="rounded-lg ring-2 p-2 bg-sky-400 opacity-100 hover:bg-red-800">TRENDINGS</a>
        </h2>
      )}
    >
      <div className="container mx-auto p-6 bg-yellow-500">
        <div className="bg-green-500 m-0 mx-auto p-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cart.map(item => {
              totalprice += item.price;
              return (
                <div key={item.id} className="border border-border-red p-4">
                  <div className="mb-2 font-serif">{item.product_title}</div>
                  <div className="mb-2">Price: {item.price}</div>
                  <div className="mb-2">Quantity: {item.quantity}</div>
                  <div><img src={item.image_url} alt={item.product_title} className="w-full" /></div>
                  <div className="mt-2">
                    <button onClick={() => confirm('Are you sure to remove this drug order?')} className="bg-red-500 text-white py-2 px-4 rounded-full">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <h1 className="text-red-500 p-2 font-mono">Total Price: {totalprice}</h1>
        </div>

        <h1 className="text-red-500 m-3 p-2 text-3xl leading-loose text-center">Proceed To Order</h1>

        <div className="flex flex-col md:flex-row md:space-x-3">
          <div className="md:w-1/2 bg-gray-500 p-4 m-3"><a href="/cash_order">Cash on Delivery</a></div>
          <div className="md:w-1/2 bg-blue-500 p-4 m-3"><button disabled><a href={`/stripe/${totalprice}`}>Card Payments</a></button></div>
        </div>
      </div>
    </AuthenticatedLayout2>
  );
};

export default ShowCart;
