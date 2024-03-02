 // Layout.js
import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex  h-screen">
            {/* Sidebar */}
            <aside className={`bg-gray-800 w-64 min-h-full ${isOpen ? 'block' : 'hidden'} md:block`}>
                <div className="flex justify-between items-center py-4 px-6">
                    <Link href="/" className="text-lg font-semibold text-white">Logo</Link>
                    <button onClick={toggleSidebar} className="text-white md:hidden">
                        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                    </button>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/" className="block py-2 px-6 text-gray-300 hover:bg-gray-700">Home</Link>
                        </li>
                        {/* Add more navigation links here */}
                    </ul>
                </nav>
            </aside>

            {/* Content */}
            <div className="flex-1">
                {/* Add your content here */}
                {children}
            </div>

            {/* Button for small devices */}
            <button onClick={toggleSidebar} className="bg-blue-500 text-white py-2 sm:flex flex-col md:hidden">
                {isOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            </button>
        </div>
    );
};

export default Layout;
