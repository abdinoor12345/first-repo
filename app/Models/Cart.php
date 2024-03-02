<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'image_url',
        'product_title',
        'price',
        'product_id',
        'user_id',
        'quantity',
        'image',
        'categories',
    ];

    // Define the relationships
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
