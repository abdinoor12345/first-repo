<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Offer;
class DeleteExpiredRecords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-expired-records';
    protected $description = 'Delete expired records from the database';

    /**
     * The console command description.
     *
     * @var string
     */
 
    /**
     * Execute the console command.
     */
    public function handle()
    {
        Artisan::call('route:cache'); // Ensure routes are cached before running the controller action
        $this->call('get', 'products/delete-expired'); // Call the controller action
        $this->info('Expired products deleted successfully');

        //
    }
}
