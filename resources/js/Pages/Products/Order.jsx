import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const Order = ({ orders,auth }) => {
  //const { orders } = usePage().props;

  const cancelOrder = (orderId) => {
    Inertia.post(route('cancel_order', { id: orderId }));
  };

  return (
    <AuthenticatedLayout2
      user={auth.user}
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg">
          <a href="/" className="rounded-lg ring-2 p-2 bg-sky-400 opacity-100 hover:bg-red-800">TRENDINGS</a>
        </h2>
      )}
    >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {orders.map(order => (
        <div key={order.id} className="bg-white border border-gray-200 p-4 rounded-lg">
          <div className="mb-4">
            <img src={order.image_url} className="mx-auto" height="100px" width="150px" alt="Product Image" />
          </div>
          <div className="text-center mb-2">
            <h2 className="text-xl font-semibold">{order.product_title}</h2>
            <p className="text-gray-500">Price: {order.price}</p>
            <p className="text-gray-500">Quantity: {order.quantity}</p>
            <p className="text-gray-500">Payment Status: {order.payment_status}</p>
            <p className="text-gray-500">Delivery Status: {order.delivery_status}</p>
          </div>
          <div className="text-center">
            {order.delivery_status === 'processing' ? (
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
            ) : (
              <p className="bg-green-500 text-white px-4 py-2 rounded-lg">Not Allowed</p>
            )}
          </div>
        </div>
      ))}
    </div>    </AuthenticatedLayout2>

  );
};

export default Order;
