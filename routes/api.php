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

Route::group(['middleware' => 'auth:api'], function () {
});
Route::post('/new_application', 'ProfileController@store');
Route::post('/remove_files', 'ProfileController@destroy');
