<?php

namespace App\Http\Controllers;


use App\Model\Files;
use App\Model\NonResidents;
use App\Model\Residents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function new_resident(Request $request)
    {
        $this->validate($request, [
            'place_of_education' => 'required',
            'direction_code' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'father_name' => 'required',
            'date_of_birth' => 'required',
            'citizenship' => 'required',
            'client_requisite' => 'required',
            'residential_address' => 'required',
            'school_region' => 'required',
            'school_district' => 'required',
            'school_number_or_name' => 'required',
            'graduation_year' => 'required',
            'education_language' => 'required',
            'certificate_number' => 'required',
            'act_number' => 'required',
            'documents_graduate_9_grade' => 'required',
            'phone' => 'required',
            'files' => 'required',
        ]);

        $files_residents = Residents::add($request->all());
        $filesName = $files_residents->upload($request->file('files'));

        return response()->json([
            "message" => "Success",
            "files" => $filesName
        ], 200);
    }

    public function new_non_resident(Request $request)
    {
        $this->validate($request, [
            'direction_code' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'father_name' => 'required',
            'date_of_birth' => 'required',
            'citizenship' => 'required',
            'client_requisite' => 'required',
            'residential_address' => 'required',
            'education_language' => 'required',
            'phone' => 'required',
            'files' => 'required',
        ]);

        $files_residents = NonResidents::add($request->all());
        $filesName = $files_residents->upload($request->file('files'));

        return response()->json([
            "message" => "Success",
            "files" => $filesName
        ], 200);
    }

    public function destroy(Request $request)
    {
        Files::removeFiles($request->all(), 'temporary/');
        return response()->json(["message" => "Success"], 200);
    }

    public function get_residents()
    {
        $residents = Residents::all();

        foreach ($residents as $i => $v) {
            $code = $v['direction_code'];
            $changeColumn = $residents[$i];
            if ($code == 3940001) {$changeColumn->direction_code  = 'Зарубежная филология'; }
            else if ($code == 3910001) { $changeColumn->direction_code = 'Точные науки'; }
        }

        if(!$residents)
            return response()->json(["message" => "Not Found"], 404);

        return response()->json([
            "message" => "Success",
            "residents" => $residents
        ], 200);
    }

    public function get_non_residents()
    {
        $non_residents = NonResidents::all();

        foreach ($non_residents as $i => $v) {
            $code = $v['direction_code'];
            $changeColumn = $non_residents[$i];
            if ($code == 3940001) { $changeColumn->direction_code  = 'Зарубежная филология'; }
            else if ($code == 3910001) { $changeColumn->direction_code = 'Точные науки'; }
        }

        if(!$non_residents)
            return response()->json(["message" => "Not Found"], 404);

        return response()->json([
            "message" => "Success",
            "non_residents" => $non_residents
        ], 200);
    }

    public function delete_resident(Request $request)
    {
        $resident = Residents::find($request->id);
        Files::removeFiles($resident->name_archive_with_data);
        $resident->delete();
        $residents = Residents::all();
        return response()->json([
            "message" => "Success",
            "residents" => $residents
        ], 200);
    }

    public function delete_non_resident(Request $request)
    {
        $resident = NonResidents::find($request->id);
        Files::removeFiles($resident->name_archive_with_data);
        $resident->delete();
        $residents = NonResidents::all();
        return response()->json([
            "message" => "Success",
            "residents" => $residents
        ], 200);
    }

    public function download_file(Request $request)
    {
        return Storage::download('public/' . $request->file_name);
    }

    public function show_resident($id)
    {
        return Residents::find($id);
    }

    public function show_non_resident($id)
    {
        return NonResidents::find($id);
    }

}
