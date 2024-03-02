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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('phone')->nullable();
            $table->string('name');
            $table->string('email');
             $table->unsignedBigInteger('user_id'); // Assuming this is a foreign key
            $table->string('product_title');
            $table->integer('quantity');
            $table->decimal('price', 8, 2);
            $table->string('image')->nullable();
            $table->unsignedBigInteger('product_id'); // Assuming this is a foreign key
            $table->string('payment_status');
            $table->string('delivery_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
