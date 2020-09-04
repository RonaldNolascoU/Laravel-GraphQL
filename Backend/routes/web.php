<?php

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
Route::get('/test', 'TestController@create');
Route::post('/test', 'TestController@store');
Route::get('/test/{post}', 'TestController@show');

Route::get('/upload', 'UploadController@create');
Route::post('/upload', 'UploadController@store');
Route::get('/upload/{post}', 'UploadController@show');
