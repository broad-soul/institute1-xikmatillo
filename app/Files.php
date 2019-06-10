<?php
/**
 * Created by PhpStorm.
 * User: sarvar
 * Date: 07.06.2019
 * Time: 9:31
 */

namespace App;


use Illuminate\Support\Facades\Storage;

class Files
{
    public static function add($files)
    {
        $temporaryUrl = storage_path() . '/app/public/temporary/';
        foreach ($files as $file) {
            $ext = $file->getClientOriginalExtension();
            $fileName = str_random(10) . '.' . $ext;
            $file->storeAs('public/temporary/', $fileName);
            $temporaryFilesUrl[] = $temporaryUrl . $fileName;
            $filesName[] = $fileName;
        }
        return [
            'temporaryFilesUrl' => $temporaryFilesUrl,
            'filesName' => $filesName
        ];
    }

    public static function removeFiles($files, $path = '')
    {
        if (!$files) return false;

        if(!is_array($files)) {
            $file_name = $files;
            return Storage::delete('public/' . $file_name);
        }

        foreach ($files as $name) {
            Storage::delete('public/' . $path . $name);
        }
        return true;
    }

}
