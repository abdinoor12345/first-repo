<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('product_title');
            $table->decimal('price', 10, 2); // Assuming price is a decimal value with 10 digits in total and 2 decimal places
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('user_id');
            $table->integer('quantity')->nullable();
            $table->string('image')->nullable(); 
            $table->string('image_url')->nullable(); 

            $table->timestamps();
             // Define foreign key constraints
             $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
             $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
