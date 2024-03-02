<?php

namespace App\Http\Controllers;
use Inertia\Inertia; // Make sure to import Inertia
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Order;
use App\Models\User;


class AdminController extends Controller
{
    public function dashboard()
    {
        // Logic for user dashboard
        return view('admin.dashboard');
    }//

    public function index()
    {
        $products = Product::all();

        return Inertia::render('Admin/Index', [
            'products' => $products
        ]);
    }
    public function add_cart(Request $request, $id)
{
    // Check if the user is authenticated (logged in)
    if (Auth::check()) {
        // Retrieve the authenticated user
        $user = Auth::user();
        
        // Find the medicine (assumed to be a model named Medicine) by its ID
        $product = Product::find($id);
        
        // Create a new instance of the Cart model
        $cart = new Cart;
        
        // Populate the Cart model with data from the user and the selected medicine
        $cart->email = $user->email;
        $cart->name = $user->name;

         $cart->phone = $user->phone;
        $cart->user_id = $user->id;
        $cart->product_title = $product->name;
        $cart->price = $product->price * $request->quantity;
        $cart->image = $product->image;
        $cart->image_url = $product->image_url;
        $cart->categories = $product->categories;

        $cart->product_id = $product->id;
        $cart->quantity = $request->quantity;
        
        // Save the Cart model to the database
        $cart->save();

 
    } else {
         return redirect()->route('login');
    }
}
public function show_cart()
{
    if (Auth::id()) {
        // Retrieve the authenticated user's ID
        $id = Auth::user()->id;
        // Retrieve cart items for the authenticated user from the 'carts' table
        $cart = Cart::where('user_id', $id)->get();
        
        // Return an Inertia response with the cart data
        return Inertia::render('Products/Showcart', ['cart' => $cart]);
    } else {
        // Redirect to login if user is not authenticated
        return redirect('login');
    }
}
public function remove_cart($id)
{
    $cart=cart::find($id);
    $cart->delete();
    return redirect()->back();
}
public function approved($id)
{
    $data = Order::find($id);
    $data->delivery_status = 'approved';
    $data->save();
    return redirect()->back();
}

public function canceled($id)
{
    $data = Order::find($id);
    $data->delivery_status = 'canceled';
    $data->save();
    return redirect()->back();
}
public function approve_order()
{
 
 
        $orders = Order::all();
 
        return Inertia::render('Products/ApprovalOrder', ['orders' => $orders]);
  
}
public function admin()
    {
      


  // Count number of users
  $userCount = User::count();

  // Calculate total revenue of products
  $totalRevenue = Product::sum('price');

  // Count types of orders based on delivery status
  $orders = Order::selectRaw('delivery_status, COUNT(*) as count')
      ->groupBy('delivery_status')
      ->get();

  return inertia('Admin/AdminDashboard', [
      'userCount' => $userCount,
      'totalRevenue' => $totalRevenue,
      'orders' => $orders,
  ]);
}
public function getOrders()
{
    $orders = Order::all();
    return Inertia::render('Products/ApprovalOrder', ['orders' => $orders]);
}

 
 
}