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
Route::get('/test', function () {
	$users = DB::table('test')->get();

	return response()->json(['data' => $users], 200);
});
Route::get('/test1', function () {
	$response = Http::get('https://us-central1-hackaubg3.cloudfunctions.net/bq_read_data', [
		'address' => request()->address,
	]);

	return response()->json(['data' => json_decode($response->body())], 200);
});
