<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Live search in Laravel using AJAX</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
    <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white font-bold text-lg">Logo</div>
            <div class="hidden md:block">
                <a href="/" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Home</a>
                <a href="/products" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md">ADD cart</a>
                <a href="#" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Contact</a>
            </div>
            <div class="md:hidden">
                <!-- Mobile menu button -->
                <button id="mobile-menu-button" class="text-white focus:outline-none">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="md:hidden bg-gray-800">
        <a href="/" class="block text-white hover:bg-gray-700 px-4 py-2">Home</a>
        <a href="/products" class="block text-white hover:bg-gray-700 px-4 py-2">ADD cart</a>
        <a href="#" class="block text-white hover:bg-gray-700 px-4 py-2">Contact</a>
    </div>

    <div class="container mx-auto p-4 mb-4">
        <div class="search mb-4 bg-red-100">
            <input type="search" name="search" id="search" placeholder="Search products here....." class="form-control bg-blue-800 rounded-lg my-3">
        </div>
<h1 class="text-green-500 mt-2 mb-2 text-3xl">To Add product to the Cart go to ADD CART Section</h1>
        <div id="searchResults" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            @foreach ($product as $product)
                <div class="bg-white p-4 shadow-md rounded-md">
                    <div class="text-xl font-bold mb-2">{{ $product->name }}</div>
                    <div class="mb-2">{{ $product->description }}</div>
                    <div class="font-bold">Price: ${{ $product->price }}</div>
                    <div><img src="{{ $product->image_url }}" alt="Product Image" class="mt-4 mx-auto" style="max-width: 100px;"></div>
                </div>
            @endforeach
        </div>

    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        // Toggle mobile menu
        $('#mobile-menu-button').click(function() {
            $('#mobile-menu').slideToggle();
        });

        // AJAX search
        $('#search').on('keyup', function() {
            var value = $(this).val().toLowerCase();
            $.ajax({
                type: 'get',
                url: '{{ route('search') }}',
                data: {'search': value},
                success: function(data) {
                    $('#searchResults').html(data);
                }
            });
        });
    </script>
</body>
</html>
