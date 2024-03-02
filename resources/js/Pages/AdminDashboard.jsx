import AuthenticatedLayout1 from '@/Layouts/AuthenticatedLayout1';
import { Head } from '@inertiajs/react';
import ImageSlider from '@/Components/ImageSlider';

export default function AdminDashboard({ auth }) {
    return (
        <AuthenticatedLayout1
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="filaments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900"><ImageSlider/></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout1>
    );
}
