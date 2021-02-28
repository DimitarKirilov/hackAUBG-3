<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	return view('welcome');
});

// returns a list of Chicago districts and their corresponging risk level
Route::get('/results', function () {
	$results = DB::table('results')->get();

	return response()->json(['data' => $results], 200);
});

// takes an address and returns to which Chicago distric it correponds to and it's risk level
Route::get('/criminal-level', function () {
	$response = Http::get('https://us-central1-hackaubg3.cloudfunctions.net/bq_read_data', [
		'address' => json_decode(request()->address),
	]);

	return response()->json(['data' => json_decode($response->body())], 200);
});
