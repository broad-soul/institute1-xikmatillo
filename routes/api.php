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

Route::post('/new_resident', 'SpaController@new_resident');
Route::post('/new_non_resident', 'SpaController@new_non_resident');
Route::post('/remove_files', 'SpaController@destroy');
Route::post('/check_recaptcha', 'UserController@check_recaptcha');
Route::get('/main', 'SpaController@main');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/get_residents', 'SpaAdminController@get_residents');
    Route::get('/get_non_residents', 'SpaAdminController@get_non_residents');
    Route::post('/delete_resident', 'SpaAdminController@delete_resident');
    Route::post('/delete_non_resident', 'SpaAdminController@delete_non_resident');
    Route::post('/download_file', 'SpaAdminController@download_file');
    Route::get('/admin_show_resident/{id}', 'SpaAdminController@show_resident');
    Route::get('/admin_show_non_resident/{id}', 'SpaAdminController@show_non_resident');
    Route::post('/main_store', 'SpaAdminController@main_store');
    Route::post('/titles_store', 'SpaAdminController@titles_store');
    Route::post('/download_residents', 'SpaAdminController@download_residents');
    Route::post('/download_non_residents', 'SpaAdminController@download_non_residents');
    Route::post('/new_question', 'SpaAdminController@new_question');
    Route::post('/delete_question/{id}', 'SpaAdminController@delete_question');
});
Route::post('/main_get', 'SpaController@main_get');
Route::post('/get_titles', 'SpaController@get_titles');
Route::post('/get_logo', 'SpaController@get_logo');
Route::get('/get_questions', 'SpaController@get_questions');
