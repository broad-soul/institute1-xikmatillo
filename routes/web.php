<?php
Route::get('/api', function () {
    return abort(404);
});
Route::get('/api/{any}', function () {
    return abort(404);
})->where('any', '.*');

Route::get('storage/{filename}', function ($filename)
{
    $path = storage_path('app/public/' . $filename);

    if (!File::exists($path)) return abort(404);

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});

Route::get('/{any}', 'SpaController@index')->where('any', '.*');
