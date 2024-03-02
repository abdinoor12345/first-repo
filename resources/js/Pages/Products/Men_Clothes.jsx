  // CategoryComponent.js

import { usePage } from '@inertiajs/inertia-react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';

const CategoryComponent = ({ men ,auth,product }) => {
    

    return (
        <AuthenticatedLayout2
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
            <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
        </h2>}
    >
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Shoes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {men.map((men, index) => (
                    <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                        <img src={men.image_url} alt={men.name} className="w-full mb-4" />
                        <div className="text-lg font-semibold mb-2">{men.name}</div>
                        <div className="text-gray-600 mb-2">${men.price}</div>
                        <div className="text-gray-500">{men.description}</div>
 
                    </div>
                ))}
            </div>
        </div>        </AuthenticatedLayout2>

    );
};

export default CategoryComponent;
