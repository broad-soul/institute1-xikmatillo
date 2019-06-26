<?php

namespace App\Http\Controllers;

use App\Model\Exports\ResidentsExport;
use App\Model\InstructionApp;
use App\Model\Residents;
use Illuminate\Http\Request;

class ResidentsController extends Controller
{

    public function create(Request $request)
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

    public function get_all()
    {
        return Residents::all();
    }

    public function get_one($id)
    {
        return Residents::find($id);
    }

    public function destroy($id)
    {
        $resident = Residents::find($request->id);
        Files::remove($resident->name_archive_with_data);
        $resident->delete();
    }

    public function download_exel(Request $request)
    {
        $lang = $request->lang;
        return (new ResidentsExport($lang))->download('residents_' . $lang . '.xlsx');
    }

    public function get_instruction()
    {
        return InstructionApp::where('is_resident', '1')->take(1)->get();
    }

    public function update_instruction(Request $request)
    {
        $app = InstructionApp::find($request->id);

        if($app) $app->edit($request->all());
        else {
            $data = $request->all();
            $data['is_resident'] = 1;
            InstructionApp::add($data);
        }
    }
}
