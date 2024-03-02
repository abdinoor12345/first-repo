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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name');

            $table->text('description');
            $table->string('image')->nullable(); // Assuming image path
            $table->decimal('price', 10, 2); // Assuming price is decimal
            $table->decimal('discount', 10, 2)->nullable();
            $table->decimal('total_price', 10, 2); // Assuming total price is calculated
            $table->dateTime('expiration_date');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
