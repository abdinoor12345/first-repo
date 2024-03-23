import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout1 from '@/Layouts/AuthenticatedLayout1';
import { Head } from '@inertiajs/react';

const UpdateComponent = ({ auth }) => {
    const [values, setValues] = useState({
        name: "",
        message: "",
        image: null
    });

    const handleChange = (e) => {
        const { id, value, type } = e.target;
        const val = type === 'file' ? e.target.files[0] : value;
        setValues(prevValues => ({
            ...prevValues,
            [id]: val
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('message', values.message);
        formData.append('image', values.image);

        Inertia.post('/give_updates', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                // Handle success, you can redirect or show a success message
            },
            onError: (errors) => {
                console.error('Error:', errors);
                // Handle errors
            },
        });
    }

    return (
        <AuthenticatedLayout1 user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
            <div className="max-w-lg mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4 p-2 m-3 rounded-md bg-red-200">WEEKLY UPDATE</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block">Heading:</label>
                        <input id="name" type="text" value={values.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                    </div>

                    <div>
                        <label htmlFor="message" className="block">Message:</label>
                        <textarea id="message" value={values.message} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2"></textarea>
                    </div>

                    <div>
                        <label htmlFor="image" className="block">Image:</label>
                        <input id="image" type="file" onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </AuthenticatedLayout1>
    );
}

export default UpdateComponent;
