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

Route::post('/new_resident', 'ResidentsController@create');
Route::post('/new_non_resident', 'NonResidentsController@create');
Route::post('/remove_files', 'SpaController@destroy');
Route::post('/check_recaptcha', 'UserController@check_recaptcha');
Route::get('/main', 'SpaController@main');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/get_residents', 'ResidentsController@get_all');
    Route::post('/delete_resident', 'ResidentsController@destroy');
    Route::get('/admin_show_resident/{id}', 'ResidentsController@get_one');
    Route::post('/download_residents', 'ResidentsController@download_exel');
    Route::get('/get_non_residents', 'NonResidentsController@get_all');
    Route::post('/delete_non_resident', 'NonResidentsController@destroy');
    Route::get('/admin_show_non_resident/{id}', 'NonResidentsController@get_one');
    Route::post('/download_non_residents', 'NonResidentsController@download_exel');
    Route::post('/download_file', 'SpaAdminController@download_file');
    Route::post('/main_store', 'SpaAdminController@main_store');
    Route::post('/titles_store', 'SpaAdminController@titles_store');
    Route::post('/new_question', 'QuestionController@create');
    Route::get('/get_question/{id}', 'QuestionController@edit');
    Route::post('/update_question', 'QuestionController@update');
    Route::post('/delete_question/{id}', 'QuestionController@destroy');
    Route::post('/new_image_gallery', 'GalleryController@create');
    Route::post('/delete_image_gallery', 'GalleryController@destroy');
    Route::post('/about_us_create', 'AboutUsController@create');
    Route::post('/create_event', 'EventsController@create');
    Route::post('/update_event', 'EventsController@update');
    Route::post('/delete_event/{id}', 'EventsController@destroy');
    Route::post('/create_teacher', 'TeachersController@create');
    Route::post('/change_teacher', 'TeachersController@update');
    Route::post('/delete_teacher/{id}', 'TeachersController@destroy');
    Route::get('/get_teacher/{id}', 'TeachersController@edit');
    Route::post('/update_resident_instruction', 'ResidentsController@update_instruction');
    Route::post('/update_non_resident_instruction', 'NonResidentsController@update_instruction');
    Route::post('/create_partner', 'PartnersController@create');
    Route::post('/update_partner', 'PartnersController@update');
    Route::post('/delete_partner/{id}', 'PartnersController@destroy');
});

Route::post('/get_main_page_admin', 'SpaAdminController@get_main');
Route::post('/main_get', 'SpaController@main_get');
Route::post('/get_titles', 'SpaController@get_titles');
Route::post('/get_logo', 'SpaController@get_logo');
Route::get('/get_about_us', 'AboutUsController@get');
Route::get('/get_questions', 'QuestionController@get_all');
Route::get('/get_image_gallery', 'GalleryController@get_all');
Route::get('/get_events', 'EventsController@get_all');
Route::get('/get_event/{id}', 'EventsController@get_one');
Route::get('/get_teachers', 'TeachersController@all');
Route::get('/get_event/{id}', 'EventsController@edit');
Route::get('/get_resident_instruction', 'ResidentsController@get_instruction');
Route::get('/get_non_resident_instruction', 'NonResidentsController@get_instruction');
Route::get('/partners/all', 'PartnersController@get_all');
Route::get('/partners/show/{id}', 'PartnersController@get_one');
