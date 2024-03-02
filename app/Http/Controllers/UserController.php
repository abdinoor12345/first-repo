<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Add this line to import the Auth class
use Inertia\Inertia;
use App\Models\Contact;
class UserController extends Controller
{
    public function dashboard()
    {
        // Logic for user dashboard
        return view('users.dashboard');
    }//
    public function index()
    {
        if (Auth::check()) {
            if (Auth::user()->isAdmin()) {
                return redirect()->route('admin.dashboard');
            } else {
                return redirect()->route('users.dashboard');
            }
        } else {
            return Inertia::render('Welcome', [
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
                'laravelVersion' => Application::VERSION,
                'phpVersion' => PHP_VERSION,
            ]);
        }
    }
    public function storeContact(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
        ]);

        // Store data in the database
       $contact= Contact::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'phone' => $validatedData['phone'],
       ]);

        return response()->json(['message' => 'Product created successfully', 'contact' => $contact]);
    }
 
public function form(){
    return inertia::render('FormComponent');
}
 

}