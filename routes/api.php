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
    Route::post('/update_question', 'SpaAdminController@update_question');
    Route::post('/delete_question/{id}', 'SpaAdminController@delete_question');
    Route::post('/new_image_gallery', 'SpaAdminController@new_image_gallery');
    Route::post('/delete_image_gallery', 'SpaAdminController@delete_image_gallery');
    Route::post('/about_us_store', 'SpaAdminController@about_us_store');
    Route::post('/event_store', 'SpaAdminController@event_store');
    Route::post('/delete_event/{id}', 'SpaAdminController@delete_event');
    Route::post('/update_event', 'SpaAdminController@update_event');
});

Route::post('/main_get', 'SpaController@main_get');
Route::post('/get_titles', 'SpaController@get_titles');
Route::post('/get_logo', 'SpaController@get_logo');
Route::get('/get_about_us', 'SpaController@get_about_us');
Route::get('/get_questions', 'SpaController@get_questions');
Route::get('/get_question/{id}', 'SpaController@get_question');
Route::get('/get_image_gallery', 'SpaController@get_image_gallery');
Route::get('/get_events', 'SpaController@get_events');
Route::get('/get_event/{id}', 'SpaController@get_event');
