<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

 
//starts here
Route::group(['middleware' => 'auth'], function() {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');

    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"]);

    Route::group(['middleware' => 'checkRole:admin'], function() {
       // Route::inertia('/adminDashboard', 'AdminDashboard')->name('adminDashboard');
       Route::get('/adminDashboard', [AdminController::class, 'admin'])->name('adminDashboard');;

    });
    Route::group(['middleware' => 'checkRole:user'], function() {
        Route::inertia('/userDashboard', 'UserDashboard')->name('userDashboard');
        Route::get('/shoes', [ProductController::class, 'shoes'])->name('shoes');
        
        Route::get('/men_clothes', [ProductController::class, 'men_clothes']);
        Route::get('/women_clothes', [ProductController::class, 'women_clothes']);
        route::get('offers_data',[ProductController::class,'offers_data'])->name('offers_data');

    });
    Route::group(['middleware' => 'checkRole:guest'], function() {
        Route::inertia('/guestDashboard', 'GuestDashboard')->name('guestDashboard');
    });
});
Route::inertia('/all', 'All')->name('all');
Route::post('/contact_store', [UserController::class, 'storeContact'])->name('contact_store');
Route::post('/post', [ProductController::class, 'store']); 

 
Route::inertia('/create', 'Products/Create')->name('create');
Route::inertia('/index', 'Products/Index')->name('index');
Route::inertia('/form', 'FormComponent')->name('form');
Route::inertia('/customers_offers', 'Products/Offers')->name(' customers_offers');

 Route::get('/products', [ProductController::class, 'index'])->name('products');
 
 Route::get('/product', [ProductController::class, 'index1']);
 Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
 Route::get('/display', [AdminController::class, 'index'])->name('display');
 Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
 Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
 Route::post('/products/{product}', [ProductController::class, 'update'])->name('products.update');
  Route::post('/add_cart/{id}', [AdminController::class, 'add_cart'])->name('add_cart');
 Route::get('/remove_cart/{id}',[AdminController::class,'remove_cart']);
 Route::get('/show_cart', [AdminController::class, 'show_cart'])->name('show_cart');;
 Route::get('/cash_order', [ProductController::class, 'cash_order'])->name('cash_order');;
 Route::get('/show_order', [ProductController::class,'show_order'])->name('show_order');
  Route::post('/cancel_order/{id}', [ProductController::class,'cancel_order'])->name('cancel_order');
  Route::post('/approve_order{id}', [ProductController::class,'approve_order'])->name('approve_order');
 Route::get('/orders', [AdminController::class, 'getOrders'])->name('orders');
   Route::get('/admin', [AdminController::class, 'admin'])->name('admin');;
  Route::get('/products/delete-expired', [ProductController::class, 'deleteExpiredProducts'])->name('products.delete_expired');
Route::get('/live_search', [ProductController::class, 'searchindex'])->name('live_search');
Route::get('/search', [ProductController::class, 'search'])->name('search');
Route::post('/offers', [ProductController::class, 'offers']); 
Route::post('/offers_cart/{id}', [ProductController::class, 'offers_cart'])->name('offers_cart');

Route::group(['middleware' => 'auth'], function() {
    Route::get('/services', [ProductController::class, 'services'])->name('services');
Route::get('/contacts', [ProductController::class, 'contacts'])->name('contacts');
Route::get('/faqs', [ProductController::class, 'faqs'])->name('faqs');
Route::get('/shipping_info', [ProductController::class, 'shipping_info'])->name('shipping_info');
Route::get('/return_policy', [ProductController::class, 'return_policy'])->name('return_policy');
Route::get('/privacy_policy', [ProductController::class, 'privacy_policy'])->name('privacy_policy');
Route::get('/terms_conditions', [ProductController::class, 'terms_conditions'])->name('terms_conditions');
});

Route::get('/usereducer', [ProductController::class, 'useReducer']);
Route::get('/updates', [ProductController::class, 'updates']);
Route::post('/give_updates', [ProductController::class, 'give_updates'])->name('give_updates');

 
require __DIR__.'/auth.php';
