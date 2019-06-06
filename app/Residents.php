<?php

namespace App;

use ZanySoft\Zip\Zip;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Residents extends Model
{
    protected $fillable = [
        'place_of_education',
        'direction_code',
        'name',
        'surname',
        'father_name',
        'date_of_birth',
        'citizenship',
        'client_requisite',
        'residential_address',
        'school_region',
        'school_district',
        'school_number_or_name',
        'graduation_year',
        'education_language',
        'certificate_number',
        'act_number',
        'phone',
        'documents_graduate_9_grade'
    ];

    public static function add($fields)
    {
        $profiles = new static;
        $profiles->fill($fields);
        $profiles->save();
        return $profiles;
    }

    public function uploadFiles($files)
    {
        if(!$files) return;

        $temporaryUrl = storage_path() . '/app/public/temporary/';
        foreach ($files as $file) {
            $ext = $file->getClientOriginalExtension();
            $fileName = str_random(10) . '.' . $ext;
            $file->storeAs('public/temporary/', $fileName);
            $temporaryFiles[] = $temporaryUrl . $fileName;
            $filesName[] = $fileName;
        }

        $zipname = $this->createZip($temporaryFiles);

        $this->name_archive_with_data = $zipname;
        $this->save();

        return response()->json([
            "message" => "Success",
            "files" => $filesName
        ], 200);
    }

    public static function removeFiles($files)
    {
        foreach ($files as $name) {
            Storage::delete('public/temporary/'.$name);
        }
        return response()->json(["message" => "Success"], 200);
    }

    public function createZip($files)
    {
        $publicUrl = storage_path() . '/app/public/';

        $zipname = str_random(10) . '.zip';
        $zip = Zip::create($publicUrl . $zipname);
        $zip->add($files, true);
        return $zipname;
    }
}
