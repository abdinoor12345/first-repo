<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage; // Add this line to import the Storage facade
use Illuminate\Support\Facades\Auth;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia; // Make sure to import Inertia
 use App\Models\Cart;
 use App\Models\Order;
 use App\Models\Offer;
 use App\Models\Update;



class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();

        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
  /*  public function store(Request $request)
    {
        //
    }*/
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'categories' => 'required|string|in:shoes,men-clothes,women-clothes',
            'image' => 'required|image|max:2048', // Maximum file size of 2MB
            'quantity' => 'required|integer|min:0',
        ]);
    
        // Handle the file upload and get the image path
        $imagePath = $request->file('image')->store('public/LOGO');
    
        // Generate the full URL of the stored image
        $imageUrl = url(Storage::url($imagePath));
    
        // Create a new product with the validated data
        $product = Product::create([
            'name' => $validatedData['name'],
            'price' => $validatedData['price'],
            'description' => $validatedData['description'],
            'categories' => $validatedData['categories'],
            'image' => $imagePath,
            'image_url' => $imageUrl, // Store the URL of the image in the database
            'quantity' => $validatedData['quantity'],
        ]);
    
        // Return a JSON response with a success message and the created product
        return response()->json(['message' => 'Product created successfully', 'product' => $product]);
    }
    



    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {return Inertia::render('Admin/Show', [
        'product' => $product
    ]);
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product
        ]); //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {$product->update($request->all());

        return redirect()->route('products.show', $product)->with('success', 'Product updated successfully');
    }
        //
    


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
    
        return redirect()->back()->with('success', 'Product deleted successfully');
    }
    
    public function index1()
    {
        $products = Product::all();
        \Log::info($products);

        return Inertia::render('UserDashboard', [
            'products' => $products
        ]);
    }
 
public function cash_order()
{
    $user = Auth::user();
    $userid = $user->id;
    $data = cart::where('user_id', $userid)->get();

    foreach ($data as $cartItem) {
        $order = new order;
        $order->name = $cartItem->name;
        $order->email = $cartItem->email;
        $order->phone = $cartItem->phone;
       // $order->address = $cartItem->address;
        $order->user_id = $cartItem->user_id;
        $order->product_title = $cartItem->product_title;
        $order->price = $cartItem->price;
        $order->image = $cartItem->image;
        $order->quantity = $cartItem->quantity;
        $order->product_id = $cartItem->product_id;
        $order->payment_status = 'cash on delivery';
        $order->delivery_status = 'processing';
        $order->image_url =  $cartItem->image_url;

        $order->save();

        // Delete the cart item
        $cartItem->delete();
    }

    return Inertia::location(route('dashboard'))->with('message', 'We have received your order and will connect you soon.');
}
 
public function show_order()
{
    $user = Auth::user();

    if ($user) {
        $userid = $user->id;
        $orders = Order::where('user_id', $userid)->get();

        return Inertia::render('Products/Order', ['orders' => $orders]);
    } else {
        return Inertia::location(route('login'));
    }
}

public function cancel_order($id)
{
    $order = Order::find($id);

    if ($order) {
        $order->delivery_status = ' cancelled the order';
        $order->save();
        $order->delete();

    }

    return Inertia::location(route('show_order'));
}
public function approve_order($id)
{
    $order = Order::find($id);

    if ($order) {
        $order->delivery_status = ' approved the order';
        $order->save();
    }

    return Inertia::location(route('show_order'));}

public function shoes()
    {
        $shoes = Product::where('categories', 'shoes')->select('name', 'price', 'image_url', 'description')->get();
        return Inertia::render('Products/Shoes', [
            'shoes' => $shoes
        ]);
    }
    public function men_clothes()
    {
        $men = Product::where('categories', 'men-clothes')->select('name', 'price', 'image_url', 'description')->get();
        return Inertia::render('Products/Men_Clothes', [
            'men' => $men
        ]);
    }
    public function women_clothes()
    {
        $women = Product::where('categories', 'Women-clothes')->select('name', 'price', 'image_url', 'description')->get();
        return Inertia::render('Products/Women_Clothes', [
            'women' => $women
        ]);
    }
    public function deleteExpiredProducts()
    {
        Offer::where('expiry_time', '<', now())->delete();

        return response()->json(['message' => 'Expired products deleted successfully']);
    }
   
    
    public function searchindex()
    {$product=Product::all();
    return view('Search.search',compact('product'));
    }
    public function search(Request $request)
    {
        $output = "";
        $products = Product::where('name', 'like', '%' . $request->search . '%')
                           ->orWhere('description', 'like', '%' . $request->search . '%')
                           ->orWhere('price', 'like', '%' . $request->search . '%')
                           ->get();
        
        foreach ($products as $product) {
            $output .= '<div class="bg-white p-4 shadow-md rounded-md">
                            <div class="text-xl font-bold mb-2">' . $product->name . '</div>
                            <div class="mb-2">' . $product->description . '</div>
                            <div class="font-bold">Price: $' . $product->price . '</div>
                            <div><img src="' . $product->image_url . '" alt="Product Image" class="mt-4 mx-auto" style="max-width: 100px;"></div>
                        </div>';
        }
        
        return response($output);
    }
    

public function offers(Request $request)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'discount' => 'required|numeric',
        'price' => 'required|numeric',
        'total_price' => 'required|numeric',
        'description' => 'required|string',
        'categories' => 'required|string|in:shoes,men-clothes,women-clothes',
        'expiration_date' => 'required|date',

        'image' => 'required|image|max:2048', // Maximum file size of 2MB
     ]);

    // Handle the file upload and get the image path
    $imagePath = $request->file('image')->store('public/LOGO');

    // Generate the full URL of the stored image
    $imageUrl = url(Storage::url($imagePath));

    // Create a new product with the validated data
    $offer= Offer::create([
        'name' => $validatedData['name'],
        'price' => $validatedData['price'],
        'discount' => $validatedData['discount'],
        'total_price' => $validatedData['total_price'],
        'expiration_date' => $validatedData['expiration_date'],

        'description' => $validatedData['description'],
        'categories' => $validatedData['categories'],
        'image' => $imagePath,
        'image_url' => $imageUrl, // Store the URL of the image in the database
     ]);

    // Return a JSON response with a success message and the created product
    return response()->json(['message' => 'Product created successfully', 'offer' => $offer]);
}
public function offers_data(){
    $offers= Offer::all();

    return Inertia::render('Products/OffersData', [
        'offers' => $offers
    ]);
   
}
public function offers_cart(Request $request, $id)
{if (Auth::check()) {
    try {
        // Retrieve the authenticated user
        $user = Auth::user();

        // Find the offer by its ID
        $offer = Offer::find($id);

        // Create a new instance of the Cart model
        $cart = new Cart;

        // Populate the Cart model with data
        $cart->user_id = $user->id;
        $cart->product_id = $offer->id;
        $cart->name = $user->name;
        $cart->phone = $user->phone;
        $cart->product_title = $offer->name;
        $cart->price = $offer->price;
        $cart->image_url = $offer->image_url;
        $cart->categories = $offer->categories;
        
        // Save the Cart model to the database
        $cart->save();

        // Return a success response
        return response()->json(['message' => 'Product added to cart successfully'], 200);
    } catch (\Exception $e) {
        // Return an error response if something goes wrong
        return response()->json(['message' => 'Failed to add product to cart'], 500);
    }
} else {
    // If the user is not authenticated, redirect to the login page
    return redirect()->route('login');
}
}
    // Check if the user is authenticated (logged in)
    public function services(){
        return inertia::render('FooterComponents/Services');

    }
    public function contacts(){
        return inertia::render('FooterComponents/Contacts');

    }
    public function faqs(){
        return inertia::render('FooterComponents/Faqs');

    } public function shipping_info(){
        return inertia::render('FooterComponents/Shipping');

    }public function return_policy(){
        return inertia::render('FooterComponents/ReturnPolicy');
    }
    public function privacy_policy(){
        return inertia::render('FooterComponents/PrivacyPolicy');
    }
    public function terms_conditions(){
        return inertia::render('FooterComponents/Terms&Conditions');
    }
    public function useReducer()
    {
        $posts = Product::all();
        return Inertia::render('Products/UseReducer', [
            'posts' => $posts
        ]);
    }
    
public function give_updates(Request $request)
{$validatedData = $request->validate([
    'name' => 'required|string|max:255',
    'message' => 'required|string',
    

    'image' => 'nullable|image|max:2048', // Maximum file size of 2MB
 ]);
 $imagePath = null;
$imageUrl = null;
if ($request->hasFile('image')) {
 $imagePath = $request->file('image')->store('public/LOGO');
 $imageUrl = url(Storage::url($imagePath));}

 $update= Update::create([
    'name' => $validatedData['name'],
    'message' => $validatedData['message'],
    'image' => $imagePath,
    'image_url' => $imageUrl, // Store the URL of the image in the database
 ]);

    // Return a JSON response with a success message and the created product
    return response()->json(['message' => 'update given successfully', 'offer' => $update]);
}
public function updates(){
    return inertia::render('Admin/Give_update');

}
}