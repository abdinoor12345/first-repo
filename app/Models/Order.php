<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'phone',
        'name',
        'email',
        'user_id',
        'product_title',
        'quantity',
        'price',
        'image',
        'product_id',
        'payment_status',
        'delivery_status',
        'image_url',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }



}
