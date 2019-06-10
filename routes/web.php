<?php
Route::get('/api', function () {
    return abort(404);
});
Route::get('/api/{any}', function () {
    return abort(404);
})->where('any', '.*');

Route::get('/{any}', 'SpaController@index')->where('any', '.*');
