<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'description', 'price', 'discount', 'total_price', 'categories', 'expiration_date', 'image_url'
    ];

}
