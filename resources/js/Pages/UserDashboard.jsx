import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';
import { Head } from '@inertiajs/react';
import Index from './Products/Index'; // Import the Index component
import ImageSlider from '@/Components/ImageSlider';

export default function UserDashboard({ auth, products }) {
    return (
        <AuthenticatedLayout2
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
                <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
            </h2>}
        >
            <Head title="filaments" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Render the Index component here */}
                             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
                            <a href="/products">           Order Here</a>
                            </button>
                            <ImageSlider/>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout2>
    );
}
