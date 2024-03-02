 
import { Link, Head } from '@inertiajs/react';
 import ApplicationLogo from '@/Components/ApplicationLogo';
 import Index from './Products/Index';
 //import { route,Routes } from 'vendor/tightenco/ziggy/src/js';
 import NavLink from '@/Components/NavLink';
 import ImageSlider from '@/Components/ImageSlider';
import Footer from './Footer';
 
export default function Welcome({ auth, laravelVersion, phpVersion,user,products }) {
    return (
        <>
            <Head title="FILAMENT" />
            <div className=" w-screen min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900">
                <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
                   
     <div className="flex items-center">
     <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                             </div>
<div className="flex items-center">
                        {auth.user ? (
                 <Link
                                href={route('dashboard')}
                                className="mx-2 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                 dashboard
                            </Link>
                        ) : (
                            <>
                                 <Link
                                    href={route('login')}
                                    className="mx-2 font-semibold text-red-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="mx-2 font-semibold text-green-600 hover:text-red-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex items-center">
                             
                <details className="dropdown">
  <summary className="m-1 btn bg-green-400 rounded-md">Categories</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <li className="mt-3"><a href='shoes' className='ml-2 text-white bg-red-500 rounded-md px-3 py-2 my-3'>SHOES</a></li>
    <li className="my-2"><a href='men_clothes' className='ml-2 text-white bg-green-500 rounded-md  py-2 my-2'>Men wears</a></li>
    <li className="my-2"><a href='women_clothes' className='ml-2 text-white bg-blue-500 rounded-md  py-2 my-2'>WoMen wears</a></li>

  </ul>
</details>
        
 <div className=" ">
<NavLink  className="ml-2 text-white bg-red-500 rounded-md px-3 py-2 my-2"href={route('userDashboard')} active={route().current('userDashboard')}>
  users Dashboard
</NavLink>
 </div>
<div className=" ">
 <NavLink  className="ml-2  text-white bg-red-500 rounded-md px-3 py-2 my-2"href={route('live_search')} active={route().current('adminDashboard')}>
 SEARCH PRODUCTS HERE
 </NavLink>
 </div>
</div>
<h1 className="text-green-500 mt-2 mb-2 text-2xl">--SIGN UP OR LOGIN TO SEE THE PRODUCTS,ADD CARTS, ORDER AND SEE THE HOT OFFERS WE HAVE</h1>

<ImageSlider/>
 </div>
<Footer/>                          

           </>
    );
}
