<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Auth'], function () {
    Route::post('register', 'RegisterController');
    Route::post('login', 'LoginController');
    Route::post('logout', 'LogoutController')->middleware('auth:api');
});

Route::post('/new_resident', 'ProfileController@new_resident');
Route::post('/new_non_resident', 'ProfileController@new_non_resident');
Route::post('/remove_files', 'ProfileController@destroy');
Route::post('/check_recaptcha', 'UserController@check_recaptcha');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/get_residents', 'ProfileController@get_residents');
    Route::get('/get_non_residents', 'ProfileController@get_non_residents');
    Route::post('/delete_resident', 'ProfileController@delete_resident');
    Route::post('/delete_non_resident', 'ProfileController@delete_non_resident');
    Route::post('/download_file', 'ProfileController@download_file');
    Route::get('/admin_show_resident/{id}', 'ProfileController@show_resident');
    Route::get('/admin_show_non_resident/{id}', 'ProfileController@show_non_resident');
});
